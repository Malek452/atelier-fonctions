import type { Equation, EquationData, Glyph, PreparedStep } from './equation-data';

export interface Pose extends Glyph {
  color: string;
}
export const INK = '#f1f2e9',
  GOLD = '#edc57e',
  BLUE = '#a9cfe8',
  SAGE = '#b8d6ba';
export const colorFor = (g: Glyph) =>
  g.tags.some((t) => ['right', 'exponentRight', 'term'].includes(t))
    ? BLUE
    : g.tags.some((t) => ['baseLeft', 'baseRight'].includes(t))
      ? SAGE
      : g.tags.some((t) =>
            ['focus', 'left', 'result', 'exponentLeft', 'factor', 'factorCopy'].includes(t),
          )
        ? GOLD
        : INK;
export function bounds(poses: Glyph[]): [number, number, number, number] {
  if (!poses.length) return [0, 0, 0, 0];
  return [
    Math.min(...poses.map((g) => g.bounds[0])),
    Math.min(...poses.map((g) => g.bounds[1])),
    Math.max(...poses.map((g) => g.bounds[2])),
    Math.max(...poses.map((g) => g.bounds[3])),
  ];
}
export function center(poses: Glyph[]): [number, number] {
  const b = bounds(poses);
  return [(b[0] + b[2]) / 2, (b[1] + b[3]) / 2];
}
export function shift(poses: Pose[], dx: number, dy = 0): Pose[] {
  return poses.map((g) => ({
    ...g,
    x: g.x + dx,
    y: g.y + dy,
    bounds: [g.bounds[0] + dx, g.bounds[1] + dy, g.bounds[2] + dx, g.bounds[3] + dy],
  }));
}
export function place(
  eq: Equation,
  x = 0,
  y = 0,
  maxWidth = 880,
  maxHeight = 240,
  color?: string,
): Pose[] {
  const scale = Math.min(1, maxWidth / eq.width, maxHeight / eq.height);
  return eq.glyphs.map((g) => ({
    ...g,
    x: g.x * scale + x,
    y: g.y * scale + y,
    sx: g.sx * scale,
    sy: g.sy * scale,
    color: color || colorFor(g),
    bounds: [
      g.bounds[0] * scale + x,
      g.bounds[1] * scale + y,
      g.bounds[2] * scale + x,
      g.bounds[3] * scale + y,
    ],
  }));
}
/** Ordered glyph matching: repeated numbers cannot steal an earlier occurrence. */
export function matchGlyphs(from: Glyph[], to: Glyph[]): [number, number][] {
  const table = Array.from({ length: from.length + 1 }, () => new Uint16Array(to.length + 1));
  for (let i = from.length - 1; i >= 0; i--)
    for (let j = to.length - 1; j >= 0; j--)
      table[i][j] =
        from[i].path === to[j].path
          ? table[i + 1][j + 1] + 1
          : Math.max(table[i + 1][j], table[i][j + 1]);
  const pairs: [number, number][] = [];
  let i = 0,
    j = 0;
  while (i < from.length && j < to.length) {
    if (from[i].path === to[j].path) {
      pairs.push([i++, j++]);
    } else if (table[i + 1][j] >= table[i][j + 1]) i++;
    else j++;
  }
  return pairs;
}
/** Align on a retained glyph when space allows, so a base or left member stays put. */
export function align(from: Pose[], to: Pose[]): Pose[] {
  const matches = matchGlyphs(from, to);
  const anchor =
    matches.find(([i, j]) => !from[i].tags.includes('focus') && !to[j].tags.includes('focus')) ||
    matches.find(
      ([i]) =>
        /^[0-9A-F]+$/.test(from[i].symbol) &&
        !['2B', '2212', '3D', '28', '29'].includes(from[i].symbol),
    );
  if (!anchor) return to;
  const [i, j] = anchor,
    b = bounds(to);
  const dx = Math.max(-440 - b[0], Math.min(440 - b[2], from[i].x - to[j].x));
  const dy = Math.max(-115 - b[1], Math.min(115 - b[3], from[i].y - to[j].y));
  return shift(to, dx, dy);
}
export function activityLayouts(data: EquationData, steps: PreparedStep[]): Pose[][] {
  const result: Pose[][] = [];
  for (const step of steps) {
    const poses = place(data.equations[step.target]);
    result.push(result.length && !step.statement ? align(result[result.length - 1], poses) : poses);
  }
  return result;
}
/** Selection tags can change while the preceding expression stays exactly still. */
export function sourcePoses(previous: Pose[], source: Equation): Pose[] {
  if (
    previous.length !== source.glyphs.length ||
    previous.some((g, i) => g.path !== source.glyphs[i].path)
  )
    throw new Error('A highlight changed the mathematical glyph sequence: ' + source.tex);
  return previous.map((g, i) => ({
    ...g,
    tags: source.glyphs[i].tags,
    color: colorFor(source.glyphs[i]),
  }));
}
export function arcPoint(
  from: [number, number],
  to: [number, number],
  t: number,
  lift = 24,
): [number, number] {
  return [
    from[0] + (to[0] - from[0]) * t,
    from[1] + (to[1] - from[1]) * t - Math.sin(Math.PI * t) * lift,
  ];
}
export function workingPoses(data: EquationData, work: NonNullable<PreparedStep['work']>) {
  const expression = place(data.equations[work.expression], 0, 105, 650, 80);
  return {
    expression,
    left: expression.filter((g) => g.tags.includes('left')),
    right: expression.filter((g) => g.tags.includes('right')),
    result: place(data.equations[work.result], 0, 105, 650, 80, GOLD),
    via: work.via ? place(data.equations[work.via], 0, 105, 650, 80, GOLD) : undefined,
  };
}
