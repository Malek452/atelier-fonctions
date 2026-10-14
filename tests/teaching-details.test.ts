import { it } from 'node:test';
import assert from 'node:assert/strict';
import { activities, getActivity } from '../src/content';
import { parse, numeric } from './reference/parser';
import { semanticRanges } from '../motion/semantic-ranges';
import { activityLayouts, sourcePoses } from '../motion/geometry';
import compiled from '../motion/generated/equations.json';
import type { EquationData } from '../motion/equation-data';
import { focusParts } from '../src/components/focus';
const data = compiled as unknown as EquationData;

/** Independent, deliberately small TeX reader for the arithmetic used here. */
function input(tex: string): string {
  let pos = 0;
  function atom(): string {
    if (tex[pos] === '{') {
      pos++;
      let body = '';
      while (pos < tex.length && tex[pos] !== '}') body += atom();
      assert.equal(tex[pos++], '}', tex);
      return '(' + body + ')';
    }
    if (tex[pos] === '\\') {
      const command = /^\\([a-zA-Z]+)/.exec(tex.slice(pos))![1];
      pos += command.length + 1;
      if (command === 'frac' || command === 'tfrac') {
        const n = atom(),
          d = atom();
        return '((' + n + ')/(' + d + '))';
      }
      if (command === 'sqrt') return 'sqrt(' + atom() + ')';
      if (command === 'times' || command === 'cdot') return '*';
      if (command === 'left' || command === 'right') return '';
      if (command === 'Delta') return 'D';
      throw new Error('Unsupported command in arithmetic test: ' + command);
    }
    return tex[pos++];
  }
  let out = '';
  while (pos < tex.length) out += atom();
  return out;
}
const value = (tex: string, x = 1, variables: Record<string, number> = {}) => {
  const expression = input(tex).replace(/[abcD]/g, (name) => {
    assert.ok(name in variables, 'Missing coefficient ' + name);
    return '(' + variables[name] + ')';
  });
  return numeric(parse(expression), x);
};
const close = (actual: number, expected: number, label: string) =>
  assert.ok(
    Number.isFinite(actual) && Math.abs(actual - expected) < 1e-9 * Math.max(1, Math.abs(expected)),
    `${label}: ${actual} ≠ ${expected}`,
  );

it('1.4 uses the product 0.5 × 4 and every intermediate expression remains equal to 64', () => {
  const a = getActivity('1q4')!;
  assert.equal(a.steps[1].power?.kind, 'power');
  assert.ok(a.steps[1].tex.includes(String.raw`4^{0.5\times4}`));
  assert.ok(a.steps.every((s) => !s.tex.includes('sqrt')));
  for (const s of a.steps)
    for (const expression of s.tex.split('=')) close(value(expression), 64, s.tex);
});

it('all 36 authored power laws preserve their selected expression and use the correct exponent operation', () => {
  let count = 0;
  for (const a of activities)
    for (const [i, s] of a.steps.entries())
      if (s.power) {
        const p = s.power;
        for (const x of [0.5, 1.25, 2.1])
          close(value(s.fromFocus!, x), value(p.to, x), a.id + ': ' + s.tex);
        const { source, target } = semanticRanges(a.steps[i - 1].tex, s);
        const sources = data.equations[data.activities[a.id][i].source].glyphs;
        const targets = data.equations[data.activities[a.id][i].target].glyphs;
        const take = (glyphs: typeof sources, role: string) =>
          glyphs.filter((g) => g.tags.includes(role));
        for (const role of ['baseLeft', 'exponentLeft', 'exponentRight']) {
          assert.ok(take(sources, role).length, `${a.id}/${i}: ${role}`);
          assert.ok(take(targets, role).length, `${a.id}/${i}: target ${role}`);
        }
        assert.equal(take(sources, 'baseRight').length > 0, p.kind !== 'power');
        assert.equal(take(targets, 'baseRight').length, 0);
        const operator = target.find((r) => r.tag === 'operator')!;
        assert.equal(
          s.tex.slice(operator.start, operator.end),
          p.kind === 'product' ? '+' : p.kind === 'quotient' ? '-' : '\\times',
        );
        for (const tag of ['exponentLeft', 'exponentRight']) {
          const range = source.find((r) => r.tag === tag)!;
          assert.equal(
            a.steps[i - 1].tex.slice(range.start, range.end),
            tag === 'exponentLeft' ? p.left : p.right,
          );
          assert.ok(!take(sources, tag).some((g) => g.tags.some((t) => t.startsWith('base'))));
        }
        count++;
      }
  assert.equal(count, 36);
});

it('same-base animation assigns both bases to the retained base and keeps every exponent in its own slot', () => {
  for (const a of activities) {
    const prepared = data.activities[a.id],
      layouts = activityLayouts(data, prepared);
    for (const [i, s] of a.steps.entries())
      if (s.power) {
        const source = sourcePoses(layouts[i - 1], data.equations[prepared[i].source]),
          target = layouts[i];
        const paths = (ps: typeof source, tag: string) =>
          ps.filter((p) => p.tags.includes(tag)).map((p) => p.path);
        assert.deepEqual(paths(source, 'baseLeft'), paths(target, 'baseLeft'));
        if (s.power.kind !== 'power')
          assert.deepEqual(paths(source, 'baseRight'), paths(target, 'baseLeft'));
        const left = target.filter((g) => g.tags.includes('exponentLeft')),
          sign = target.filter((g) => g.tags.includes('operator')),
          right = target.filter((g) => g.tags.includes('exponentRight'));
        assert.ok(
          Math.max(...left.map((g) => g.bounds[2])) < Math.min(...sign.map((g) => g.bounds[0])),
        );
        assert.ok(
          Math.max(...sign.map((g) => g.bounds[2])) < Math.min(...right.map((g) => g.bounds[0])),
        );
      }
  }
});

it('2.4 distributes before calculating any products and preserves both members at every step', () => {
  const a = getActivity('2q4')!,
    distributions = a.steps.filter((s) => s.distribute);
  assert.equal(distributions.length, 2);
  const firstProduct = a.steps.findIndex((s) => s.product);
  assert.ok(distributions.every((s) => a.steps.indexOf(s) < firstProduct));
  for (const s of a.steps.slice(
    2,
    a.steps.findIndex((s) => s.title === 'Identifier les coefficients'),
  )) {
    const [left, right] = s.tex.split('=');
    for (const x of [-4, -1, 0.5, 2, 5]) {
      close(value(left, x), 7 * x * x + 4 - x, s.tex);
      close(value(right, x), 0, s.tex);
    }
  }
  for (const s of distributions) {
    const i = a.steps.indexOf(s),
      p = data.activities[a.id][i];
    const from = data.equations[p.source],
      to = data.equations[p.target];
    for (const tag of ['factor', 'term']) assert.ok(from.glyphs.some((g) => g.tags.includes(tag)));
    for (const tag of ['factor', 'factorCopy', 'term'])
      assert.ok(to.glyphs.some((g) => g.tags.includes(tag)));
  }
});

const quadratics: Record<string, [number, number, number]> = {
  '2d6': [1, 3, -2],
  '2q2': [2, 3, -5],
  '2q3': [5, 6, -7],
  '2q5': [1, 1, -6],
  '2q6': [1, 3, -2],
  '3q1': [2, 3, -5],
  '3q4': [1, 3, -2],
  '3d4': [1, 3, -2],
  '5q5': [5, 6, -7],
  '5q6': [1, -5, 1],
  '9q2': [1, -2, -6],
};

it('every common-denominator and development step of f6 preserves its actual signed argument', () => {
  const a = getActivity('2d6')!;
  const expressions = a.steps.filter((s) => s.tex.startsWith('u(x)='));
  assert.ok(expressions.length >= 15);
  for (const s of expressions)
    for (const x of [-4, -2, 0, 0.5, 2, 4]) {
      close(value(s.tex.slice('u(x)='.length), x), 1 / (x - 1) - (x + 5) / (x - 3), s.tex);
    }
  assert.ok(a.steps.some((s) => s.tex.includes('\\sqrt[3]{u(x)}\\ne0')));
  assert.ok(a.steps.some((s) => s.tex === 'x\\ne1'));
  assert.ok(a.steps.some((s) => s.tex === 'x\\ne3'));
});
it('f4 keeps the inner exclusion and all common-denominator identities are correct', () => {
  const a = getActivity('2d4')!;
  for (const s of a.steps.filter((s) => s.tex.startsWith('7x+\\frac4x-1='))) {
    for (const x of [-5, -1, -0.1, 0.1, 1, 5])
      close(value(s.tex.split('=')[1], x), 7 * x + 4 / x - 1, s.tex);
  }
  assert.equal(a.result, '\\mathbb R\\setminus\\{0\\}');
  // Completing the square independently verifies that its numerator has no zeros.
  for (const x of [-10, -1, 0, 1 / 14, 2, 10])
    close(7 * x * x - x + 4, 7 * (x - 1 / 14) ** 2 + 111 / 28, 'positive numerator');
});
it('f5 factorization introduces only -3 and 2, while retaining the inner exclusion 0', () => {
  const a = getActivity('2d5')!;
  const first = a.steps.findIndex((s) => s.title === 'Exiger un numérateur non nul'),
    last = a.steps.findIndex((s) => s.title === 'Mettre la parenthèse commune en facteur');
  for (const s of a.steps.slice(first, last + 1))
    for (const x of [-4, -3, -1, 0, 1, 2, 3])
      close(value(s.tex.split('\\ne')[0], x), x * x + x - 6, s.tex);
  assert.equal(a.result, '\\mathbb R\\setminus\\{-3,0,2\\}');
});

import { signs31, signs32, signs33, signs34, signs3d1 } from '../src/content/sign-tables';
const p1 = (-3 - Math.sqrt(17)) / 2,
  p2 = (-3 + Math.sqrt(17)) / 2,
  alpha = (-3 - 2 * Math.sqrt(11)) / 5,
  beta = (-3 + 2 * Math.sqrt(11)) / 5;
const signFunctions: Record<string, ((x: number) => number)[]> = {
  [signs31.id]: [(x) => 2 * x + 5, (x) => x - 1, (x) => 2 * x * x + 3 * x - 5],
  [signs32.id]: [(x) => 7 * x * x - x + 4, (x) => x, (x) => 7 * x + 4 / x - 1],
  [signs33.id]: [(x) => x + 3, (x) => x - 2, (x) => x * x, (x) => 1 + 1 / x - 6 / (x * x)],
  [signs34.id]: [(x) => x - p1, (x) => x - p2, (x) => x * x + 3 * x - 2],
  [signs3d1.id]: [
    (x) => x,
    (x) => x - alpha,
    (x) => x - beta,
    (x) => 10 * x * x * x + 12 * x * x - 14 * x,
  ],
};
for (const model of [signs31, signs32, signs33, signs34, signs3d1])
  it(`${model.id}: French table has correctly ordered boundaries, signs, zeros and forbidden points`, () => {
    const xs = model.points.map((p) => p.value);
    assert.ok(xs.every((x, i) => i === 0 || x > xs[i - 1]));
    const samples = [xs[0] - 2, ...xs.slice(1).map((x, i) => (x + xs[i]) / 2), xs.at(-1)! + 2];
    model.rows.forEach((row, r) => {
      const fn = signFunctions[model.id][r];
      assert.equal(row.intervals.length, xs.length + 1);
      assert.equal(row.points.length, xs.length);
      samples.forEach((x, i) => assert.equal(row.intervals[i], fn(x) > 0 ? '+' : '-', row.label));
      row.points.forEach((point, i) => {
        if (point === '0') close(fn(xs[i]), 0, row.label);
        if (point === 'bar') assert.ok(!Number.isFinite(fn(xs[i])), row.label);
      });
    });
  });
it('every exercise 3 activity builds a complete table and selects only valid intervals and endpoints', () => {
  const ids = ['3q1', '3q2', '3q3', '3q4', '3d1', '3d2', '3d3', '3d4'];
  const selected: Record<string, number[]> = {
    '3q1': [0, 2],
    '3q2': [1],
    '3q3': [1, 2],
    '3q4': [1],
    '3d1': [1, 3],
    '3d2': [1],
    '3d3': [1, 2],
    '3d4': [1],
  };
  for (const id of ids) {
    const tables = getActivity(id)!.steps.flatMap((s) => (s.table ? [s.table] : [])),
      last = tables.at(-1)!;
    assert.ok(last, id);
    assert.equal(tables[0].visibleRows, 0);
    for (let i = 0; i < last.model.rows.length; i++)
      assert.ok(tables.some((t) => t.visibleRows === i + 1 && t.activeRow === i));
    assert.deepEqual(last.selectedIntervals, selected[id]);
    assert.deepEqual(last.selectedPoints, id === '3q4' || id === '3d4' ? [0, 1] : []);
    assert.ok(last.selectedPoints!.every((i) => last.model.rows.at(-1)!.points[i] === '0'));
  }
});
for (const [id, [a, b, c]] of Object.entries(quadratics))
  it(`${id}: symbolic formulas, substitutions and every root calculation are consistent`, () => {
    const steps = getActivity(id)!.steps,
      D = b * b - 4 * a * c,
      variables = { a, b, c, D };
    let roots = 0,
      discriminants = 0;
    for (const s of steps) {
      if (s.tex.startsWith('\\Delta=')) {
        close(value(s.tex.split('=')[1], 1, variables), D, s.tex);
        discriminants++;
      }
      if (s.tex.startsWith('\\sqrt{\\Delta}='))
        close(value(s.tex.split('=')[1], 1, variables), Math.sqrt(D), s.tex);
      for (const expression of s.tex.split(/,\\quad\s*/)) {
        const match = /^[xX]_([12])=/.exec(expression);
        if (match) {
          close(
            value(expression.split('=')[1], 1, variables),
            (-b + (match[1] === '1' ? -1 : 1) * Math.sqrt(D)) / (2 * a),
            s.tex,
          );
          roots++;
        }
      }
    }
    assert.ok(discriminants >= 6 && roots >= 12);
    for (const sign of ['-', '+'])
      assert.ok(
        steps.some((s) => s.statement && s.tex.includes(`\\frac{-b${sign}\\sqrt{\\Delta}}{2a}`)),
      );
    for (const s of steps.filter((s) => s.title === 'Calculer le dénominateur')) {
      assert.equal(s.fromFocus, `2\\times(${a})`);
      assert.equal(focusParts(s).focus, `{${2 * a}}`);
      assert.ok(s.why.includes(`2 × (${a}) = ${2 * a}`));
    }
  });
