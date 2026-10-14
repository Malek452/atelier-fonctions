import nerdamer from 'nerdamer/all.min.js';
import type { Answer, Feedback } from './types';
import { parse, numeric, serialize, complexity, hasX, domainSafe } from './parser';
const ok = (message = 'La réponse est correcte.'): Feedback => ({
  status: 'correct',
  title: 'Bien joué, c’est juste.',
  message,
});
const bad = (message: string): Feedback => ({
  status: 'incorrect',
  title: 'À reprendre.',
  message,
});
const partial = (message: string): Feedback => ({
  status: 'partial',
  title: 'Une partie du chemin est juste.',
  message,
});
export function equivalent(a: string, b: string): boolean {
  const x = parse(a),
    y = parse(b);
  if (!hasX(x) && !hasX(y)) {
    const av = numeric(x),
      bv = numeric(y);
    return (
      Number.isFinite(av) &&
      Number.isFinite(bv) &&
      Math.abs(av - bv) <= 1e-10 * Math.max(1, Math.abs(bv))
    );
  }
  const diff = nerdamer(`(${serialize(x)})-(${serialize(y)})`).expand();
  return diff.toString() === '0' || nerdamer(`simplify(${diff.toString()})`).toString() === '0';
}
type Interval = { lo: number; hi: number; lc: boolean; hc: boolean };
const near = (a: number, b: number) =>
  a === b ||
  (Number.isFinite(a) &&
    Number.isFinite(b) &&
    Math.abs(a - b) <= 1e-10 * Math.max(1, Math.abs(a), Math.abs(b)));
function endpoint(s: string): number {
  if (/^[+]?inf$/.test(s)) return Infinity;
  if (s === '-inf') return -Infinity;
  const n = parse(s);
  if (hasX(n)) throw Error('Les bornes doivent être des constantes, sans x.');
  const v = numeric(n);
  if (!Number.isFinite(v)) throw Error('Borne non réelle ou non définie.');
  return v;
}
export function parseSet(input: string): Interval[] {
  let s = input
    .replace(/\s/g, '')
    .replaceAll('ℝ', 'R')
    .replaceAll('∅', '{}')
    .replaceAll('∞', 'inf')
    .replaceAll('−', '-')
    .replaceAll('∪', 'U')
    .replaceAll('\\\\', '\\')
    .replace(/\\setminus/g, '\\')
    .replace(/\bvide\b/gi, '{}');
  if (!s || s.length > 450)
    throw Error(
      'Ensemble vide ou trop long. Utiliser R, {}, {a;b} ou des intervalles séparés par U.',
    );
  const excluded = s.indexOf('\\');
  if (excluded >= 0) {
    const base = parseSet(s.slice(0, excluded));
    const holes = parseSet(s.slice(excluded + 1));
    if (holes.some((i) => !near(i.lo, i.hi)))
      throw Error('Après \\, indiquer un ensemble fini entre accolades.');
    let result = base;
    for (const h of holes) {
      result = result.flatMap((i) =>
        h.lo < i.lo || h.lo > i.hi
          ? [i]
          : [
              { ...i, hi: h.lo, hc: false },
              { ...i, lo: h.lo, lc: false },
            ],
      );
    }
    return normalize(result);
  }
  if (s === 'R') return [{ lo: -Infinity, hi: Infinity, lc: false, hc: false }];
  if (s === '{}') return [];
  const result: Interval[] = [];
  for (const part of s.split('U')) {
    if (part.startsWith('{') && part.endsWith('}')) {
      for (const t of part.slice(1, -1).split(';')) {
        const v = endpoint(t);
        if (!Number.isFinite(v)) throw Error('L’infini n’est pas une valeur isolée.');
        result.push({ lo: v, hi: v, lc: true, hc: true });
      }
      continue;
    }
    const match = part.match(/^([\[\]()])(.+);(.+)([\[\]()])$/);
    if (!match)
      throw Error('Exemple : ]-inf;1] U ]2;inf[. Séparer les bornes avec un point-virgule.');
    const lo = endpoint(match[2]),
      hi = endpoint(match[3]),
      lc = match[1] === '[',
      hc = match[4] === ']';
    if (lo > hi && !near(lo, hi))
      throw Error('Une borne gauche doit être inférieure à la borne droite.');
    if ((!Number.isFinite(lo) && lc) || (!Number.isFinite(hi) && hc))
      throw Error('Une borne infinie est toujours ouverte.');
    result.push({ lo, hi, lc, hc });
  }
  return normalize(result);
}
function normalize(parts: Interval[]): Interval[] {
  const sorted = parts
    .filter((i) => i.lo < i.hi || (near(i.lo, i.hi) && i.lc && i.hc))
    .sort((a, b) => a.lo - b.lo || Number(b.lc) - Number(a.lc));
  const out: Interval[] = [];
  for (const p of sorted) {
    const last = out.at(-1);
    if (last && (p.lo < last.hi || (near(p.lo, last.hi) && (p.lc || last.hc)))) {
      if (p.hi > last.hi) {
        last.hi = p.hi;
        last.hc = p.hc;
      } else if (near(p.hi, last.hi)) last.hc ||= p.hc;
    } else out.push({ ...p });
  }
  return out;
}
function sameIntervals(a: Interval[], b: Interval[], closures = true) {
  return (
    a.length === b.length &&
    a.every(
      (v, i) =>
        near(v.lo, b[i].lo) &&
        near(v.hi, b[i].hi) &&
        (!closures || (v.lc === b[i].lc && v.hc === b[i].hc)),
    )
  );
}
export function validateAnswer(input: string, answer: Answer, intermediate = false): Feedback {
  if (!input.trim())
    return {
      status: 'empty',
      title: 'À vous de jouer.',
      message: 'Saisir une réponse avant de demander sa vérification.',
    };
  try {
    if (answer.kind === 'choice')
      return input === String(answer.correct)
        ? ok('La proposition est correcte. Consultez les étapes pour sa justification.')
        : bad(
            'Cette proposition ne couvre pas exactement toutes les valeurs attendues. Vérifier les contraintes et la périodicité.',
          );
    if (answer.kind === 'set') {
      const a = parseSet(input),
        b = parseSet(answer.expected);
      if (sameIntervals(a, b))
        return ok(
          'Ensemble correct : bornes, exclusions et unions ont été vérifiées. Les expressions constantes des bornes sont comparées numériquement à 10⁻¹⁰ près.',
        );
      if (sameIntervals(a, b, false))
        return partial(
          'Les bornes sont bonnes. Vérifier les crochets : ≥ autorise l’égalité, > l’exclut ; une valeur interdite reste exclue.',
        );
      const onlyPoints = a.every((i) => near(i.lo, i.hi)) && b.every((i) => near(i.lo, i.hi));
      if (onlyPoints && a.length && a.every((i) => b.some((j) => near(i.lo, j.lo))))
        return partial(
          'Les valeurs données sont des solutions, mais il en manque. Reprendre tous les cas du produit nul.',
        );
      return bad(
        'L’ensemble ne convient pas. Reprendre le domaine initial, les signes et l’inclusion des bornes. Un indice peut vous aider.',
      );
    }
    if (answer.kind === 'number') {
      const n = parse(input);
      if (hasX(n)) throw Error('Saisir un nombre ou un calcul numérique.');
      const v = numeric(n);
      if (!Number.isFinite(v)) throw Error('Le calcul doit donner un nombre réel fini.');
      return Math.abs(v - answer.expected) <= answer.tolerance
        ? ok(
            'Valeur correcte, en ' +
              answer.unit +
              '. La correction détaille la conversion et les hypothèses.',
          )
        : Math.abs(v - answer.expected) < 0.01
          ? partial(
              'La valeur est proche. Donner le calcul exact (par exemple une fraction), sans arrondir trop tôt.',
            )
          : bad(
              'Reprendre la vitesse relative et vérifier l’unité demandée : ' + answer.unit + '.',
            );
    }
    const n = parse(input),
      expected = parse(answer.expected);
    if (!domainSafe(n, !!answer.positiveX))
      return {
        status: 'unsupported',
        title: 'Domaine à justifier.',
        message:
          'Cette forme peut ajouter une restriction. La vérification ne sait pas garantir son domaine ; utiliser une expression définie sur le domaine de départ.',
      };
    if (equivalent(input, answer.expected)) {
      if (!intermediate && answer.form === 'simplified' && complexity(n) > complexity(expected) + 1)
        return partial(
          'Expression équivalente, mais encore peu simplifiée. Regrouper les facteurs ou réduire les calculs restants.',
        );
      return ok(
        intermediate
          ? 'Cette expression conserve la valeur sur le domaine annoncé. Cela ne valide pas à lui seul la justification écrite.'
          : hasX(n)
            ? 'Équivalence établie par réduction symbolique, dans la grammaire et sur le domaine pris en charge.'
            : 'Valeur correcte, vérifiée numériquement à une précision relative de 10⁻¹⁰.',
      );
    }
    if (!hasX(n) && !hasX(expected) && Math.abs(numeric(n) - numeric(expected)) < 1e-3)
      return partial(
        'Valeur approchée proche. Privilégier une forme exacte avec sqrt, ln, e ou une fraction.',
      );
    return bad(
      'Cette expression ne correspond pas au résultat attendu. Vérifier les exposants, les signes et les parenthèses.',
    );
  } catch (error) {
    return {
      status: 'unsupported',
      title: 'Je ne peux pas vérifier cette écriture.',
      message:
        error instanceof Error ? error.message : 'Utiliser la syntaxe indiquée sous la réponse.',
    };
  }
}
