import { mathjax } from 'mathjax-full/js/mathjax.js';
import { TeX } from 'mathjax-full/js/input/tex.js';
import { AllPackages } from 'mathjax-full/js/input/tex/AllPackages.js';
import { SVG } from 'mathjax-full/js/output/svg.js';
import { liteAdaptor } from 'mathjax-full/js/adaptors/liteAdaptor.js';
import { RegisterHTMLHandler } from 'mathjax-full/js/handlers/html.js';
import { it } from 'node:test';
import assert from 'node:assert/strict';
import katex from 'katex';
import { activities, exercises } from '../src/content';
import reference from './reference/answers.json';
import { focusParts, highlightedTex } from '../src/components/focus';
import { motionTex } from '../motion/tex';
const adaptor = liteAdaptor();
RegisterHTMLHandler(adaptor);
const mathDocument = mathjax.document('', {
  InputJax: new TeX({ packages: AllPackages }),
  OutputJax: new SVG({ fontCache: 'local' }),
});
// Motion Canvas 3.17.2's Latex.tex parser splits these animation markers before
// calling MathJax. Rendering only the original TeX misses this failure mode.
// This is a parser-contract test, not a browser/Canvas rendering test.
function throughMotionParser(tex: string): string {
  return tex
    .split(/{{(.*?)}}/)
    .filter((part) => part.trim().length > 0)
    .join('');
}
function svgFor(tex: string): string {
  return adaptor.outerHTML(mathDocument.convert(tex));
}
function stableSvg(svg: string): string {
  // MathJax allocates new local font-cache IDs for each conversion.
  return svg.replace(/MJX-\d+-/g, 'MJX-');
}
function assertMotionRendering(tex: string, label: string, expected = svgFor(tex)): void {
  const prepared = motionTex(tex);
  const parsed = throughMotionParser(prepared);
  assert.equal(parsed, prepared, label + ': Motion Canvas must preserve every TeX group');
  const actual = svgFor(parsed);
  assert.ok(!actual.includes('data-mml-node="merror"'), label + ': invalid animated formula');
  assert.equal(
    stableSvg(actual),
    stableSvg(expected),
    label + ': glyphs, color and layout changed',
  );
}
it('prevents the white error rectangle on exercise 1, question 2, step 5', () => {
  const step = activities.find((a) => a.id === '1q2')!.steps[4];
  assert.equal(step.tex, '7^{1+1/2}');
  const tex = highlightedTex(step);
  const broken = svgFor(throughMotionParser(tex));
  assert.ok(broken.includes('Missing open brace for superscript'));
  assert.ok(broken.includes('data-background="true"'));
  assert.ok(!broken.includes('<path '));
  const fixed = svgFor(throughMotionParser(motionTex(tex)));
  assert.ok(fixed.includes('<path '));
  assert.ok(fixed.includes('fill="#e4bb78"'));
  assert.ok(!fixed.includes('data-background="true"'));
  assertMotionRendering(tex, 'Reported screenshot');
});
it('preserves every original question and mathematical result', () => {
  assert.equal(exercises.length, 12);
  assert.equal(activities.length, 92);
  assert.deepEqual(
    activities.map(({ id, tex, result }) => ({ id, tex, result })),
    reference.map(({ id, tex, result }) => ({ id, tex, result })),
  );
});
for (const a of activities)
  it(`${a.id}: presentation content and highlighted formulas render`, () => {
    assert.ok(a.steps.length > 0);
    assert.ok(!('answer' in a));
    assert.ok(!('guided' in a));
    assert.ok(!('hints' in a));
    for (const s of a.steps) {
      assert.ok(s.why);
      assert.ok(!/[\x00-\x08\x0B\x0C\x0E-\x1F]/.test(s.tex), a.id + ' invalid TeX escape');
      if (s.focus) assert.ok(s.tex.includes(s.focus), a.id + ': focus ' + JSON.stringify(s.focus));
      if (s.fromFocus) {
        const previous = a.steps[a.steps.indexOf(s) - 1];
        assert.ok(previous.tex.includes(s.fromFocus));
        const tex = highlightedTex({ ...previous, focus: s.fromFocus });
        katex.renderToString(tex, { throwOnError: true });
        const svg = svgFor(tex);
        assert.ok(!svg.includes('data-mml-node="merror"'));
        assertMotionRendering(tex, a.id + ': previous focus', svg);
      }
      if (s.product || s.collect)
        for (const value of Object.values(s.product || s.collect!)) {
          katex.renderToString(value, { throwOnError: true });
          const svg = svgFor(value);
          assert.ok(!svg.includes('data-mml-node="merror"'));
          assertMotionRendering(value, a.id + ': animated product', svg);
        }
      const p = focusParts(s);
      assert.equal(p.before + p.focus + p.after, s.tex);
      assert.ok(p.focus);
      katex.renderToString(highlightedTex(s), { throwOnError: true, strict: 'ignore' });
      const svg = svgFor(highlightedTex(s));
      assert.ok(!svg.includes('data-mml-node="merror"'), a.id + ': ' + s.title);
      assertMotionRendering(highlightedTex(s), a.id + ': ' + s.title, svg);
      if (s.circle) assertMotionRendering(s.tex, a.id + ': circle annotation');
    }
  });
it('highlights a complete right-hand member without splitting a fraction or array', () => {
  assert.equal(focusParts({ title: '', why: '', tex: 'x^{a=b}=x^2' }).focus, 'x^2');
  const tex = String.raw`\begin{array}{c}x=2\\y=3\end{array}`;
  assert.equal(focusParts({ title: '', why: '', tex }).focus, tex);
});
