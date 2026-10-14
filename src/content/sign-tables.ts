import type { SignTableFrame, SignTableModel, Step } from '../types';
export function signTableTex(frame: SignTableFrame): string {
  const { model, visibleRows } = frame;
  const header = ['x', '-\\infty'];
  for (const p of model.points) header.push('', p.tex);
  header.push('', '+\\infty');
  const rows = model.rows.map((r, index) => {
    const cells = [r.label, ''];
    for (let i = 0; i <= model.points.length; i++) {
      cells.push(index < visibleRows ? r.intervals[i] : '');
      if (i < model.points.length)
        cells.push(index < visibleRows ? (r.points[i] === 'bar' ? '\\Vert' : r.points[i]) : '');
    }
    cells.push('');
    return (index === model.rows.length - 1 ? '\\hline ' : '') + cells.join('&');
  });
  return `\\begin{array}{c|${'c'.repeat(2 * model.points.length + 3)}}\\hline ${header.join('&')}\\\\\\hline ${rows.join('\\\\')}\\\\\\hline\\end{array}`;
}
export function signTableSteps(
  model: SignTableModel,
  explanations: string[],
  selectedIntervals: number[],
  selectedPoints: number[],
  reading: string,
): Step[] {
  if (explanations.length !== model.rows.length)
    throw new Error('Each sign row needs its justification.');
  const frame = (visibleRows: number, activeRow: number, selected = false): SignTableFrame => ({
    model,
    visibleRows,
    activeRow,
    ...(selected ? { selectedIntervals, selectedPoints } : {}),
  });
  const initial = frame(0, -1);
  const out: Step[] = [
    {
      title: 'Placer les valeurs dans le tableau',
      tex: signTableTex(initial),
      why: 'La ligne x va de −∞ à +∞. Les valeurs remarquables sont rangées dans l’ordre croissant ; les signes seront placés entre elles, sur chaque intervalle.',
      statement: true,
      table: initial,
    },
  ];
  model.rows.forEach((r, i) => {
    const table = frame(i + 1, i);
    out.push({
      title:
        i === model.rows.length - 1
          ? 'Compléter la ligne du résultat'
          : `Compléter la ligne ${i + 1}`,
      tex: signTableTex(table),
      why: explanations[i],
      statement: true,
      table,
    });
  });
  const selected = frame(model.rows.length, model.rows.length - 1, true);
  out.push({
    title: 'Lire les intervalles à conserver',
    tex: signTableTex(selected),
    why: reading,
    statement: true,
    table: selected,
  });
  return out;
}

export const signs31: SignTableModel = {
  id: 'quadratic-2-3-5',
  points: [
    { tex: '-\\frac52', value: -2.5 },
    { tex: '1', value: 1 },
  ],
  rows: [
    { label: '2x+5', intervals: ['-', '+', '+'], points: ['0', ''] },
    { label: 'x-1', intervals: ['-', '-', '+'], points: ['', '0'] },
    { label: '(2x+5)(x-1)', intervals: ['+', '-', '+'], points: ['0', '0'] },
  ],
};
export const signs32: SignTableModel = {
  id: 'positive-over-x',
  points: [{ tex: '0', value: 0 }],
  rows: [
    { label: '7x^2-x+4', intervals: ['+', '+'], points: [''] },
    { label: 'x', intervals: ['-', '+'], points: ['0'] },
    { label: '\\frac{7x^2-x+4}{x}', intervals: ['-', '+'], points: ['bar'] },
  ],
};
export const signs33: SignTableModel = {
  id: 'rational-square',
  points: [
    { tex: '-3', value: -3 },
    { tex: '0', value: 0 },
    { tex: '2', value: 2 },
  ],
  rows: [
    { label: 'x+3', intervals: ['-', '+', '+', '+'], points: ['0', '', ''] },
    { label: 'x-2', intervals: ['-', '-', '-', '+'], points: ['', '', '0'] },
    { label: 'x^2', intervals: ['+', '+', '+', '+'], points: ['', '0', ''] },
    {
      label: '\\frac{(x+3)(x-2)}{x^2}',
      intervals: ['+', '-', '-', '+'],
      points: ['0', 'bar', '0'],
    },
  ],
};
export const signs34: SignTableModel = {
  id: 'quadratic-1-3-2',
  points: [
    { tex: 'x_1', value: (-3 - Math.sqrt(17)) / 2 },
    { tex: 'x_2', value: (-3 + Math.sqrt(17)) / 2 },
  ],
  rows: [
    { label: 'x-x_1', intervals: ['-', '+', '+'], points: ['0', ''] },
    { label: 'x-x_2', intervals: ['-', '-', '+'], points: ['', '0'] },
    { label: 'x^2+3x-2', intervals: ['+', '-', '+'], points: ['0', '0'] },
  ],
};
export const signs3d1: SignTableModel = {
  id: 'cubic-radicand',
  points: [
    { tex: '\\alpha', value: (-3 - 2 * Math.sqrt(11)) / 5 },
    { tex: '0', value: 0 },
    { tex: '\\beta', value: (-3 + 2 * Math.sqrt(11)) / 5 },
  ],
  rows: [
    { label: 'x', intervals: ['-', '-', '+', '+'], points: ['', '0', ''] },
    { label: 'x-\\alpha', intervals: ['-', '+', '+', '+'], points: ['0', '', ''] },
    { label: 'x-\\beta', intervals: ['-', '-', '-', '+'], points: ['', '', '0'] },
    { label: '10x(x-\\alpha)(x-\\beta)', intervals: ['-', '+', '-', '+'], points: ['0', '0', '0'] },
  ],
};
export const explanations31 = [
  '2x + 5 s’annule en −5/2. Son coefficient de x est positif : signe − à gauche de ce zéro, signe + à droite.',
  'x − 1 s’annule en 1 : signe − à gauche et signe + à droite. Les blancs aux autres valeurs ne sont pas des zéros.',
  'On multiplie les signes dans chaque intervalle : (−) × (−) = +, (+) × (−) = −, (+) × (+) = +. Le produit vaut 0 aux deux racines.',
];
export const explanations32 = [
  'Le numérateur a un discriminant négatif et un coefficient de x² positif. Il est strictement positif sur toute la droite réelle.',
  'x est négatif avant 0, nul en 0 et positif après 0.',
  'Le quotient a le signe de x. La double barre en 0 signifie « non défini » : un zéro au dénominateur ne donne jamais un zéro du quotient.',
];
export const explanations33 = [
  'x + 3 s’annule en −3 et change de − à + à cette valeur.',
  'x − 2 s’annule en 2 et change de − à + à cette valeur.',
  'Le carré x² est positif des deux côtés de 0 et nul en 0. Son signe ne change pas en traversant 0.',
  'On multiplie les deux signes du numérateur puis on divise par le signe + du dénominateur. Le quotient est nul en −3 et 2 ; la double barre en 0 marque la valeur interdite.',
];
export const explanations34 = [
  'x − x₁ s’annule en x₁ : signe − avant x₁ et signe + après.',
  'x − x₂ s’annule en x₂ : signe − avant x₂ et signe + après.',
  'Le trinôme est (x − x₁)(x − x₂). Son coefficient dominant est 1. Le produit est positif à l’extérieur des racines, négatif entre elles et nul aux racines.',
];
export const explanations3d1 = [
  'x est négatif avant 0, puis positif après 0 ; il s’annule en 0.',
  'x − α est négatif avant α, puis positif après α ; il s’annule en α.',
  'x − β est négatif avant β, puis positif après β ; il s’annule en β.',
  'Le facteur 10 est positif. On multiplie les trois signes : −, puis +, puis −, puis +. Les trois zéros sont α, 0 et β.',
];
