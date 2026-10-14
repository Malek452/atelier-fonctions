import { describe, it } from 'node:test';
import { expect } from './assert';
import reference from './reference/answers.json';
import type { Answer } from './reference/types';
const activities = reference as { id: string; answer: Answer }[];
import { parseSet } from './reference/engine';
import { numeric, parse } from './reference/parser';
const inside = (x: number, intervals: ReturnType<typeof parseSet>) =>
  intervals.some((i) => (x > i.lo || (x === i.lo && i.lc)) && (x < i.hi || (x === i.hi && i.hc)));
const E = Math.exp,
  L = Math.log;
const cubic = (x: number) => 10 * x * x * x + 12 * x * x - 14 * x;
const quadratic = (x: number) => 2 * x * x + 3 * x - 5;
const rational = (x: number) => 1 + 1 / x - 6 / (x * x);
const expPoly = (x: number) => 10 * E(2 * x) + 12 * E(x) - 14;
const expCube = (x: number) => E(3 * x) - 5 * E(2 * x) + E(x);
// Independent translations of the PDF formulas; sampled sign checks supplement,
// and do not replace, the analytic justifications stored with each activity.
const domainConditions: Record<string, (x: number) => boolean> = {
  '2d1': (x) => x * x + 3 * x + 10 !== 0,
  '2d2': (x) => cubic(x) !== 0,
  '2d3': (x) => quadratic(x) !== 0,
  '2d4': (x) => x !== 0 && 7 * x + 4 / x - 1 !== 0,
  '2d5': (x) => x !== 0 && Math.abs(rational(x)) > 1e-12,
  '2d6': (x) => x !== 1 && x !== 3 && 1 / (x - 1) - (x + 5) / (x - 3) !== 0,
  '3d1': (x) => cubic(x) > 0,
  '3d2': (x) => x !== 0 && 7 * x + 4 / x - 1 >= 0,
  '3d3': (x) => x !== 0 && 6 / (x * x) - 1 - 1 / x > 0,
  '3d4': (x) => x - 3 - (x + 5) * (x - 1) >= 0,
  '5d1': (x) => E(2 * x) - E(x) !== 0,
  '5d2': (x) => E(2 * x) + 2 * E(x) > 0,
  '5d3': (x) => expPoly(x) > 0,
  '5d4': (x) => expCube(x) !== 0,
  '6d1': (x) => E(4) - E(x) >= 0,
  '6d2': (x) => (4 - 2 * x) * (E(1) - E(x)) >= 0,
  '6d3': (x) => E(-x) - E(x + 6) > 0,
  '6d4': (x) => (E(x) - 1) / (E(x) + 2) > 0,
  '8d1': (x) => x > 0,
  '8d2': (x) => x > -2 && L(x + 2) - L(7) !== 0,
  '8d3': (x) => x > 0 && 6 * L(x) ** 2 - 2 * L(x) !== 0,
  '8d4': (x) => x > 0 && 1 - 2 * L(x) !== 0,
  '9d1': (x) => x > -0.4 && L(2 + 5 * x) - L(x + 6) >= 0,
  '9d2': (x) => x > 3,
  '9d3': (x) => x > 0 && (2 * (1 + L(x))) / x > 0,
  '10d1': () => true,
};
const inequalities: Record<string, (x: number) => boolean> = {
  '3q1': (x) => quadratic(x) > 0,
  '3q2': (x) => x !== 0 && 7 * x + 4 / x - 1 >= 0,
  '3q3': (x) => x !== 0 && rational(x) < 0,
  '3q4': (x) => x - 3 >= (x + 5) * (x - 1),
  '6q1': (x) => E(4) - E(x) >= 0,
  '6q2': (x) => (4 - 2 * x) * (E(1) - E(x)) >= 0,
  '6q3': (x) => E(x + 6) < 1 / E(x),
  '6q4': (x) => (2 - E(-2 * x)) / E(-2 * x) < 1,
  '6q5': (x) => (E(x) - 1) / (E(x) + 2) > 0,
  '9q1': (x) => x > -0.4 && L(2 + 5 * x) <= L(x + 6),
  '9q2': (x) => x > 3 && L(x + 1) + L(x - 3) < L(3),
  '9q3': (x) => x > 0 && (2 * (1 + L(x))) / x >= 0,
};
for (const [id, predicate] of Object.entries({ ...domainConditions, ...inequalities })) {
  it(`${id}: interval answer agrees with the original function on the real line`, () => {
    const a = activities.find((a) => a.id === id)!.answer;
    if (a.kind !== 'set') throw Error('not a set');
    const intervals = parseSet(a.expected);
    const points = Array.from({ length: 221 }, (_, i) => (i - 110) / 11).concat([
      -3, -2.5, -2, -1, 0, 1, 2, 3, 4, 5,
    ]);
    for (const x of points) {
      expect(inside(x, intervals), `x=${x}`).toBe(predicate(x));
    }
  });
}
const originals: Record<string, string> = {
  '1q1': '10^2*10^3',
  '1q2': '7^3*7^0.5/7^2',
  '1q3': '(5^7+5^2)/5^2',
  '1q4': '2^4*(4^0.5)^4/2^2',
  '1q5': '(x^(-2))^3*(x^3)^2',
  '1q6': 'x^2*x^3',
  '1q7': '(x^3)^0.5/sqrt(x)',
  '1q8': 'x^3.5*x^0.5/x^2',
  '4q1': 'e^2*e^3',
  '4q2': 'e^3*e^0.5/e^2',
  '4q3': '(e^7+e^2)/e^2',
  '4q4': '(e^3.5)^2*(e^0.5)^4/e^2',
  '4q5': '(e^(-2))^3*(e^3)^2',
  '4q6': '(e^(2*x))^2*e^(3*x)',
  '4q7': 'e^(3*x)*e^0.5/e^(x-1)',
  '4q8': '(e^(7*x)+e^x)/e^x',
  '4q9': '2^(x+1)*2^(x+1)/4^x',
  '4q10': '(e^(-2*x))^3*(e^(3*x))^2',
  '7q1': 'ln(2*sqrt(3))+2*ln(sqrt(3))',
  '7q2': 'ln(e^2-1)-ln(1+e)',
  '7q3': 'ln(3*e^2/sqrt(e))',
  '7q4': 'ln(81/32)',
  '7q5': '2*ln(3*sqrt(2))-2*ln(2*sqrt(3))',
  '7q6': 'ln(3^4)-2*ln(3*sqrt(e))',
};
for (const [id, input] of Object.entries(originals)) {
  it(`${id}: simplification matches independent evaluation`, () => {
    const a = activities.find((a) => a.id === id)!.answer;
    if (a.kind !== 'expression') throw Error('not expression');
    for (const x of id.startsWith('1') ? [0.1, 0.75, 1, 2, 3.7] : [-2, -0.1, 0, 0.75, 1, 2]) {
      const actual = numeric(parse(input), x),
        result = numeric(parse(a.expected), x);
      expect(Math.abs(actual - result) / Math.max(1, Math.abs(actual))).toBeLessThan(1e-10);
    }
  });
}
const residuals: Record<string, (x: number) => number> = {
  '2q2': quadratic,
  '2q3': cubic,
  '2q5': rational,
  '2q6': (x) => 1 / (x - 1) - (x + 5) / (x - 3),
  '5q1': (x) => E(2 * x + 1) - 5,
  '5q2': (x) => 3 * E(-x) - 4,
  '5q3': (x) => E(2 * x) - E(x),
  '5q5': expPoly,
  '5q6': expCube,
  '5q7': (x) => E(-x) - E(2 * x - 3),
  '8q1': (x) => L(x) - 5 * L(2),
  '8q2': (x) => L(x + 2) - L(7),
  '8q3': (x) => 6 * L(x) ** 2 - 2 * L(x),
  '8q4': (x) => (1 - 2 * L(x)) / (2 + L(x)),
};
for (const [id, fn] of Object.entries(residuals)) {
  it(`${id}: each exact root satisfies the equation`, () => {
    const a = activities.find((a) => a.id === id)!.answer;
    if (a.kind !== 'set') throw Error('not set');
    for (const point of parseSet(a.expected)) {
      expect(Math.abs(fn(point.lo))).toBeLessThan(1e-10);
    }
  });
}
it('models A4 and the lunar day consistently', () => {
  const ratio = Math.sqrt(2);
  expect(ratio).toBeCloseTo(2 / ratio, 14);
  const T = 1 / (1 / 24 - 1 / 672);
  expect(T).toBeCloseTo(224 / 9, 13);
  expect((T - 24) * 3600).toBeCloseTo(3200, 9);
  expect(T / 2).toBeCloseTo(12 + 26 / 60 + 40 / 3600, 13);
});

// New teaching frames are checked against the original polynomial, independently
// of their displayed explanation. Negative and positive values exercise signs.
import { activities as teachingActivities } from '../src/content';
import assert from 'node:assert/strict';
const toInput = (tex: string) =>
  tex
    .replaceAll(String.raw`\frac4x`, '(4/x)')
    .replaceAll(String.raw`\tfrac12`, '(1/2)')
    .replaceAll(String.raw`\tfrac32`, '(3/2)')
    .replaceAll(String.raw`\ln3`, 'log(3)')
    .replaceAll(String.raw`\cdot`, '*')
    .replaceAll(String.raw`\times`, '*')
    .replaceAll('{', '(')
    .replaceAll('}', ')');
for (const a of teachingActivities)
  for (const [i, s] of a.steps.entries())
    if (s.product) {
      it(`${a.id} step ${i}: the animated multiplication is correct`, () => {
        for (const x of [-3, -0.5, 0.5, 2, 5]) {
          const p = s.product!;
          const l = numeric(parse(toInput(p.left)), x),
            r = numeric(parse(toInput(p.right)), x),
            v = numeric(parse(toInput(p.result)), x);
          assert.ok(Math.abs(l * r - v) < 1e-10, `${p.left} × ${p.right}`);
        }
      });
    }
for (const a of teachingActivities)
  for (const [i, s] of a.steps.entries())
    if (s.collect)
      it(`${a.id} step ${i}: the animated coefficient calculation preserves the sum`, () => {
        const c = s.collect!;
        for (const x of [-3, -1, 0, 0.5, 2, 5]) {
          const sum = numeric(parse(toInput(c.left)), x) + numeric(parse(toInput(c.right)), x);
          assert.ok(Math.abs(sum - numeric(parse(toInput(c.via)), x)) < 1e-10);
          assert.ok(Math.abs(sum - numeric(parse(toInput(c.result)), x)) < 1e-10);
        }
      });
for (const id of ['2q6', '3q4', '3d4', '9q2'])
  it(`${id}: each partial development preserves the original product`, () => {
    const a = teachingActivities.find((a) => a.id === id)!;
    const first = a.steps.findIndex(
      (s) =>
        s.title === 'Distribuer le premier facteur' || s.title === 'Distribuer les deux termes',
    );
    const last = a.steps.findIndex((s, i) => i > first && s.title.startsWith('Regrouper'));
    assert.ok(first >= 0 && last > first);
    for (const s of a.steps.slice(first, last + 1)) {
      let expression = s.tex;
      if (id === '2q6') expression = expression.split('=')[1];
      else if (id === '9q2') expression = expression.split('<')[0];
      else expression = expression.split(String.raw`\ge`)[1];
      for (const x of [-4, -1, 0, 1, 2, 5]) {
        const expected = id === '9q2' ? (x + 1) * (x - 3) : (x + 5) * (x - 1);
        assert.ok(
          Math.abs(numeric(parse(toInput(expression)), x) - expected) < 1e-10,
          `${id}: ${s.tex}`,
        );
      }
    }
  });
it('circle frames use the actual remarkable angles and the correct projection', () => {
  const targets: Record<string, number> = {
    '10q1': 0,
    '10q2': 0,
    '10q4': 0.5,
    '10q5': -Math.SQRT1_2,
    '10q6': Math.SQRT1_2,
    '10q7': 1,
    '10q8': -1,
  };
  let count = 0;
  for (const a of teachingActivities)
    for (const s of a.steps)
      if (s.circle) {
        const actual =
          s.circle.axis === 'sin' ? Math.sin(s.circle.angle) : Math.cos(s.circle.angle);
        assert.ok(Math.abs(actual - targets[a.id]) < 1e-12, a.id);
        count++;
      }
  assert.equal(count, 12);
});
