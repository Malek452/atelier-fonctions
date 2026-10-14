import { it } from 'node:test';
import assert from 'node:assert/strict';
import compiled from '../motion/generated/equations.json';
import type { EquationData } from '../motion/equation-data';
import { activities } from '../src/content';
import { activityLayouts, arcPoint, bounds, matchGlyphs, sourcePoses } from '../motion/geometry';
import { SETTLED_SECONDS, STEP_SECONDS } from '../motion/timing';
import { mathjax } from 'mathjax-full/js/mathjax.js';
import { TeX } from 'mathjax-full/js/input/tex.js';
import { AllPackages } from 'mathjax-full/js/input/tex/AllPackages.js';
import { SVG } from 'mathjax-full/js/output/svg.js';
import { liteAdaptor } from 'mathjax-full/js/adaptors/liteAdaptor.js';
import { RegisterHTMLHandler } from 'mathjax-full/js/handlers/html.js';
const data = compiled as unknown as EquationData;

it('changing a highlight never changes glyph outlines, spacing or fraction-bar widths', () => {
  const layouts = new Map<string, unknown>();
  for (const eq of Object.values(data.equations)) {
    const geometry = eq.glyphs.map(({ tags, ...glyph }) => glyph);
    if (layouts.has(eq.tex)) assert.deepEqual(geometry, layouts.get(eq.tex), eq.tex);
    else layouts.set(eq.tex, geometry);
  }
});

it('preserves the visible glyph sequence of every unmarked MathJax expression', () => {
  const adaptor = liteAdaptor();
  RegisterHTMLHandler(adaptor);
  const doc = mathjax.document('', {
    InputJax: new TeX({ packages: AllPackages }),
    OutputJax: new SVG({ fontCache: 'none' }),
  });
  const cache = new Map<string, string[]>();
  for (const eq of Object.values(data.equations)) {
    if (!cache.has(eq.tex)) {
      const svg = adaptor.outerHTML(
        doc.convert(eq.tex.replaceAll('é', "\\'{e}"), { display: true }),
      );
      assert.ok(!svg.includes('data-mjx-error'));
      cache.set(
        eq.tex,
        [...svg.matchAll(/<(path|rect|line)\b[^>]*>/g)].flatMap((m) =>
          m[1] === 'rect'
            ? ['rule']
            : m[1] === 'line'
              ? ['table-line']
              : /\bd="[^"]+"/.test(m[0])
                ? [/\bdata-c="([^"]+)"/.exec(m[0])![1]]
                : [],
        ),
      );
    }
    assert.deepEqual(
      eq.glyphs.map((g) => g.symbol),
      cache.get(eq.tex),
      eq.tex,
    );
  }
});

it('lays out every step within the stage with finite complete glyph geometry', () => {
  let count = 0;
  for (const a of activities) {
    const steps = data.activities[a.id];
    assert.equal(steps.length, a.steps.length);
    const layouts = activityLayouts(data, steps);
    for (const [i, step] of steps.entries()) {
      assert.equal(data.equations[step.target].tex, a.steps[i].tex);
      const poses = layouts[i],
        box = bounds(poses);
      assert.ok(poses.length > 0);
      assert.ok(
        poses.some((g) => g.tags.includes('focus')),
        `${a.id}/${i}: focus is visible`,
      );
      assert.ok(
        box[0] >= -450 && box[2] <= 450 && box[1] >= -140 && box[3] <= 140,
        `${a.id}/${i}: ${box}`,
      );
      for (const p of poses) {
        assert.ok([p.x, p.y, p.sx, p.sy, ...p.bounds].every(Number.isFinite));
        assert.ok(p.sx > 0 && p.sy < 0);
        assert.ok(data.paths[p.path]);
      }
      if (i) {
        const source = sourcePoses(layouts[i - 1], data.equations[step.source]);
        assert.deepEqual(
          source.map((g) => [g.x, g.y, g.sx, g.sy]),
          layouts[i - 1].map((g) => [g.x, g.y, g.sx, g.sy]),
        );
      }
      count++;
    }
  }
  assert.equal(count, 1080);
});
it('anchors all products and collections to their source terms and destination', () => {
  let products = 0,
    collections = 0;
  for (const a of activities)
    for (const [i, s] of a.steps.entries())
      if (s.product || s.collect) {
        const p = data.activities[a.id][i],
          from = data.equations[p.source],
          to = data.equations[p.target];
        assert.ok(p.work);
        for (const tag of ['left', 'right'])
          assert.ok(
            from.glyphs.some((g) => g.tags.includes(tag)),
            `${a.id}/${i}/${tag}`,
          );
        assert.ok(!from.glyphs.some((g) => g.tags.includes('left') && g.tags.includes('right')));
        assert.ok(to.glyphs.some((g) => g.tags.includes('result')));
        assert.equal(data.equations[p.work!.result].tex, (s.product || s.collect)!.result);
        if (s.collect) {
          assert.equal(data.equations[p.work!.via!].tex, s.collect.via);
          collections++;
        } else products++;
      }
  assert.equal(products, 26);
  assert.equal(collections, 14);
});
it('retains the base 7 while its exponents are assembled and simplified', () => {
  const layouts = activityLayouts(data, data.activities['1q2']);
  const bases = layouts.map((ps) => ps.find((p) => p.symbol === '37')!);
  assert.ok(bases.every(Boolean));
  for (const p of bases.slice(1)) {
    assert.ok(Math.abs(p.x - bases[0].x) < 0.001);
    assert.ok(Math.abs(p.y - bases[0].y) < 0.001);
  }
  const from = layouts[2],
    to = layouts[3],
    matches = matchGlyphs(from, to);
  assert.ok(
    matches.some(
      ([i, j]) =>
        from[i].symbol === '32' && to[j].symbol === '32' && Math.abs(from[i].y - to[j].y) > 20,
    ),
  );
});
it('preserves occurrence order and moves along a continuous path with exact endpoints', () => {
  const from = data.equations[data.activities['1q2'][3].source].glyphs;
  const to = data.equations[data.activities['1q2'][3].target].glyphs;
  const pairs = matchGlyphs(from, to);
  for (let n = 1; n < pairs.length; n++) {
    assert.ok(pairs[n][0] > pairs[n - 1][0] && pairs[n][1] > pairs[n - 1][1]);
  }
  assert.deepEqual(arcPoint([10, 20], [110, 20], 0), [10, 20]);
  const end = arcPoint([10, 20], [110, 20], 1);
  assert.ok(Math.abs(end[0] - 110) < 1e-10 && Math.abs(end[1] - 20) < 1e-10);
  assert.ok(arcPoint([10, 20], [110, 20], 0.5)[1] < 20);
  assert.ok(SETTLED_SECONDS > 6.1 && STEP_SECONDS > SETTLED_SECONDS);
});
