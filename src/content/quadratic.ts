import type { Step } from '../types';

export interface Quadratic {
  a: number;
  b: number;
  c: number;
  variable?: 'x' | 'X';
  /** Reviewed exact simplified roots, in the minus/plus order. */
  roots: [string, string];
}
const fraction = (n: string, d: string | number) => `\\frac{${n}}{${d}}`;
const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : Math.abs(a));
const step = (
  title: string,
  tex: string,
  why: string,
  focus?: string,
  fromFocus?: string,
): Step => ({
  title,
  tex,
  why,
  ...(focus ? { focus } : {}),
  ...(fromFocus ? { fromFocus } : {}),
});

/** A deliberately slow, reusable derivation for the positive-discriminant case.
 * One substitution or arithmetic operation per frame; no numerical approximation. */
export function quadraticSteps({ a, b, c, variable = 'x', roots }: Quadratic): Step[] {
  const delta = b * b - 4 * a * c;
  if (!Number.isInteger(delta) || delta <= 0 || a === 0)
    throw new Error('quadraticSteps requires a nonzero a and a positive integer discriminant.');
  let squareFactor = 1;
  for (let n = 2; n * n <= delta; n++) if (delta % (n * n) === 0) squareFactor = n;
  const remainder = delta / (squareFactor * squareFactor);
  const radical =
    remainder === 1
      ? `${squareFactor}`
      : `${squareFactor === 1 ? '' : squareFactor}\\sqrt{${remainder}}`;
  const out: Step[] = [
    {
      ...step(
        'Identifier les coefficients',
        `a=${a},\\quad b=${b},\\quad c=${c}`,
        `Dans a${variable}² + b${variable} + c = 0, a = ${a}, b = ${b} et c = ${c}. On conserve le signe de chaque coefficient.`,
      ),
      statement: true,
    },
    {
      ...step(
        'Écrire la formule du discriminant',
        '\\Delta=b^2-4ac',
        'Le discriminant est b² − 4ac. Son signe détermine le nombre de racines réelles.',
      ),
      statement: true,
    },
    step(
      'Remplacer les coefficients',
      `\\Delta=(${b})^2-4\\times(${a})\\times(${c})`,
      `On remplace b par ${b}, a par ${a} et c par ${c}, en gardant les parenthèses autour des nombres signés.`,
      undefined,
      'b^2-4ac',
    ),
    step(
      'Calculer le carré de b',
      `\\Delta=${b * b}-4\\times(${a})\\times(${c})`,
      `(${b}) × (${b}) = ${b * b}. Les autres opérations attendent.`,
      `${b * b}`,
      `(${b})^2`,
    ),
    step(
      'Calculer 4 × a',
      `\\Delta=${b * b}-(${4 * a})\\times(${c})`,
      `4 × ${a} = ${4 * a}. Il reste à multiplier ce nombre par c.`,
      `(${4 * a})`,
      `4\\times(${a})`,
    ),
    step(
      'Calculer 4ac',
      `\\Delta=${b * b}-(${4 * a * c})`,
      `${4 * a} × (${c}) = ${4 * a * c}. Le signe moins de la formule reste devant ce produit.`,
      `(${4 * a * c})`,
      `(${4 * a})\\times(${c})`,
    ),
  ];
  if (4 * a * c < 0)
    out.push(
      step(
        'Soustraire un nombre négatif',
        `\\Delta=${b * b}+${-4 * a * c}`,
        `Soustraire ${4 * a * c} revient à ajouter ${-4 * a * c}.`,
        `+${-4 * a * c}`,
        `-(${4 * a * c})`,
      ),
    );
  out.push(
    step(
      'Obtenir le discriminant',
      `\\Delta=${delta}`,
      `Le calcul donne Δ = ${delta} > 0. L’équation du second degré a donc deux racines réelles distinctes.`,
      undefined,
      4 * a * c < 0 ? `${b * b}+${-4 * a * c}` : `${b * b}-(${4 * a * c})`,
    ),
  );
  out.push({
    ...step(
      'Remplacer Δ sous la racine',
      `\\sqrt{\\Delta}=\\sqrt{${delta}}`,
      `Δ vaut ${delta}. On cherche maintenant sa racine carrée positive.`,
    ),
    statement: true,
  });
  if (remainder > 1 && squareFactor > 1)
    out.push(
      step(
        'Extraire un carré parfait',
        `\\sqrt{\\Delta}=\\sqrt{${squareFactor * squareFactor}\\times${remainder}}`,
        `${delta} = ${squareFactor * squareFactor} × ${remainder}. Le facteur ${squareFactor * squareFactor} est le carré de ${squareFactor}.`,
      ),
    );
  if (squareFactor > 1)
    out.push(
      step(
        'Calculer la racine de Δ',
        `\\sqrt{\\Delta}=${radical}`,
        remainder === 1
          ? `${squareFactor} est positif et ${squareFactor}² = ${delta}, donc √Δ = ${squareFactor}.`
          : `Pour des facteurs positifs, la racine d’un produit est le produit des racines : √${squareFactor * squareFactor} = ${squareFactor}.`,
      ),
    );

  for (const [index, sign] of ['-', '+'].entries()) {
    const prefix = `${variable}_${index + 1}=`;
    const sqrtDelta = '\\sqrt{\\Delta}';
    out.push({
      ...step(
        index === 0
          ? 'Écrire la formule de la première racine'
          : 'Écrire la formule de la seconde racine',
        prefix + fraction(`-b${sign}${sqrtDelta}`, '2a'),
        `Comme a ≠ 0 et Δ > 0, on utilise le signe ${sign === '-' ? 'moins' : 'plus'} devant √Δ. La barre de fraction divise tout le numérateur par 2a.`,
        `${sign}${sqrtDelta}`,
      ),
      statement: true,
    });
    out.push(
      step(
        'Remplacer b avec son signe',
        prefix + fraction(`-(${b})${sign}${sqrtDelta}`, '2a'),
        `b = ${b}, donc −b s’écrit −(${b}). On garde le signe ${sign === '-' ? 'moins' : 'plus'} devant la racine.`,
        `-(${b})`,
        '-b',
      ),
    );
    out.push(
      step(
        'Remplacer a au dénominateur',
        prefix + fraction(`-(${b})${sign}${sqrtDelta}`, `2\\times(${a})`),
        `a = ${a}, donc le dénominateur 2a devient 2 × (${a}).`,
        `2\\times(${a})`,
        '2a',
      ),
    );
    out.push(
      step(
        'Remplacer Δ dans la formule',
        prefix + fraction(`-(${b})${sign}\\sqrt{${delta}}`, `2\\times(${a})`),
        `On remplace Δ par ${delta} sous la racine carrée.`,
        `\\sqrt{${delta}}`,
        sqrtDelta,
      ),
    );
    if (squareFactor > 1)
      out.push(
        step(
          'Utiliser la racine carrée calculée',
          prefix + fraction(`-(${b})${sign}${radical}`, `2\\times(${a})`),
          `On utilise la valeur exacte de √Δ obtenue précédemment. Le signe ${sign === '-' ? 'moins' : 'plus'} devant cette valeur est conservé.`,
          `${sign}${radical}`,
          `\\sqrt{${delta}}`,
        ),
      );
    out.push(
      step(
        'Calculer le dénominateur',
        prefix + fraction(`-(${b})${sign}${radical}`, 2 * a),
        `2 × (${a}) = ${2 * a}. Tout le numérateur reste au-dessus de la barre.`,
        `{${2 * a}}`,
        `2\\times(${a})`,
      ),
    );
    const numerator =
      remainder === 1
        ? `${-b + (sign === '-' ? -squareFactor : squareFactor)}`
        : `${-b}${sign}${radical}`;
    out.push(
      step(
        remainder === 1 ? 'Calculer le numérateur' : 'Simplifier le signe de −b',
        prefix + fraction(numerator, 2 * a),
        remainder === 1
          ? `Au numérateur, −(${b}) ${sign === '-' ? '−' : '+'} ${squareFactor} = ${numerator}.`
          : `L’opposé de ${b} est ${-b}. La racine reste sous forme exacte.`,
        numerator,
        remainder === 1 ? `-(${b})${sign}${radical}` : `-(${b})`,
      ),
    );
    const divisor =
      remainder === 1 ? gcd(Number(numerator), 2 * a) : gcd(gcd(b, 2 * a), squareFactor);
    if (divisor > 1)
      out.push(
        step(
          'Simplifier la fraction',
          prefix + roots[index],
          remainder === 1
            ? `On réduit la fraction ${numerator}/${2 * a} pour obtenir cette valeur exacte.`
            : `On divise tous les termes du numérateur et le dénominateur par leur facteur commun ${divisor}.`,
          undefined,
          fraction(numerator, 2 * a),
        ),
      );
  }
  return out;
}
