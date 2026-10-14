import type { Step } from '../types';
/** Only split at top-level equality signs, never inside a LaTeX group or environment. */
export function focusParts(step: Step): { before: string; focus: string; after: string } {
  const tex = step.tex;
  if (step.focus && tex.includes(step.focus)) {
    const i = tex.indexOf(step.focus);
    return { before: tex.slice(0, i), focus: step.focus, after: tex.slice(i + step.focus.length) };
  }
  let depth = 0,
    last = -1;
  if (!/\\(?:begin|left|right)/.test(tex))
    for (let i = 0; i < tex.length; i++) {
      if (tex[i] === '{' && tex[i - 1] !== '\\') depth++;
      if (tex[i] === '}' && tex[i - 1] !== '\\') depth--;
      if (tex[i] === '=' && depth === 0 && !['<', '>', '!'].includes(tex[i - 1])) last = i;
    }
  if (last > 0 && tex.slice(last + 1).trim() === '0')
    return { before: '', focus: tex.slice(0, last), after: tex.slice(last) };
  return { before: tex.slice(0, last + 1), focus: tex.slice(last + 1), after: '' };
}
export function highlightedTex(step: Step, color = '#e4bb78') {
  const p = focusParts(step);
  return `${p.before}{\\color{${color.replace('\\#', '#')}}\\underline{${p.focus}}}${p.after}`;
}
