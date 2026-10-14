/** Small allowlisted grammar. No eval, assignments, arbitrary identifiers or CAS commands. */
export type Node =
  | { kind: 'num'; value: number; raw: string }
  | { kind: 'symbol'; value: 'x' | 'e' | 'pi' }
  | { kind: 'unary'; op: '+' | '-'; arg: Node }
  | { kind: 'binary'; op: string; left: Node; right: Node }
  | { kind: 'call'; name: string; arg: Node };
export function parse(input: string): Node {
  const s = input
    .trim()
    .replaceAll('−', '-')
    .replaceAll('×', '*')
    .replaceAll('·', '*')
    .replaceAll('÷', '/')
    .replaceAll('π', 'pi')
    .replaceAll('²', '^2')
    .replaceAll('³', '^3')
    .replaceAll(',', '.')
    .replace(/\bln\b/g, 'log');
  if (!s || s.length > 220) throw Error('Saisir une expression de 1 à 220 caractères.');
  const tokens = s.match(/(?:\d+(?:\.\d*)?|\.\d+)|[a-zA-Z]+|[()+\-*/^]/g) || [];
  if (tokens.join('') !== s.replace(/\s/g, ''))
    throw Error('Utiliser les notations x, e, pi, sqrt(...), ln(...), +, −, *, / et ^.');
  if (tokens.length > 85) throw Error('Expression trop longue : décomposer le calcul.');
  let pos = 0,
    count = 0;
  function atom(): Node {
    if (++count > 50) throw Error('Expression trop complexe pour cette vérification.');
    const t = tokens[pos++];
    if (!t) throw Error('Expression incomplète.');
    if (t === '+' || t === '-') return { kind: 'unary', op: t, arg: expr(25) };
    if (t === '(') {
      const n = expr(0);
      if (tokens[pos++] !== ')') throw Error('Fermer chaque parenthèse.');
      return n;
    }
    if (/^(\d|\.)/.test(t)) {
      const v = Number(t);
      if (!Number.isFinite(v) || Math.abs(v) > 1e9) throw Error('Nombre trop grand.');
      return { kind: 'num', value: v, raw: t };
    }
    if (['x', 'e', 'pi'].includes(t)) return { kind: 'symbol', value: t as 'x' | 'e' | 'pi' };
    if (['sqrt', 'log', 'exp', 'sin', 'cos'].includes(t)) {
      if (tokens[pos++] !== '(') throw Error('Écrire ' + t + '(...) avec des parenthèses.');
      const arg = expr(0);
      if (tokens[pos++] !== ')') throw Error('Parenthèse manquante.');
      return { kind: 'call', name: t, arg };
    }
    throw Error('Symbole non pris en charge : ' + t);
  }
  function expr(min: number): Node {
    let left = atom();
    for (;;) {
      const next = tokens[pos];
      if (!next || next === ')') break;
      const implicit = /^(\d|\.|[a-zA-Z]|\()/.test(next);
      const op = implicit ? '*' : next;
      const bp =
        op === '^' ? 30 : op === '*' || op === '/' ? 20 : op === '+' || op === '-' ? 10 : -1;
      if (bp < min) break;
      if (!implicit) pos++;
      const right = expr(op === '^' ? bp : bp + 1);
      left = { kind: 'binary', op, left, right };
    }
    return left;
  }
  const root = expr(0);
  if (pos !== tokens.length) throw Error('Syntaxe non reconnue.');
  function guard(n: Node, depth = 0): void {
    if (depth > 18) throw Error('Trop de niveaux de calcul.');
    if (n.kind === 'binary') {
      if (n.op === '^' && hasPower(n.right))
        throw Error('Les puissances imbriquées dans un exposant ne sont pas prises en charge.');
      if (n.op === '^' && !hasX(n.right)) {
        const v = numeric(n.right);
        if (!Number.isFinite(v) || Math.abs(v) > 1000 || (hasX(n.left) && Math.abs(v) > 16))
          throw Error('Exposant hors de la plage de vérification.');
      }
      guard(n.left, depth + 1);
      guard(n.right, depth + 1);
    } else if (n.kind === 'unary' || n.kind === 'call') guard(n.arg, depth + 1);
  }
  guard(root);
  return root;
}
function hasPower(n: Node): boolean {
  return (
    (n.kind === 'binary' && (n.op === '^' || hasPower(n.left) || hasPower(n.right))) ||
    ((n.kind === 'call' || n.kind === 'unary') && hasPower(n.arg))
  );
}
export function hasX(n: Node): boolean {
  return n.kind === 'symbol'
    ? n.value === 'x'
    : n.kind === 'binary'
      ? hasX(n.left) || hasX(n.right)
      : n.kind === 'call' || n.kind === 'unary'
        ? hasX(n.arg)
        : false;
}
export function numeric(n: Node, x?: number): number {
  if (n.kind === 'num') return n.value;
  if (n.kind === 'symbol')
    return n.value === 'e' ? Math.E : n.value === 'pi' ? Math.PI : (x ?? NaN);
  if (n.kind === 'unary') return (n.op === '-' ? -1 : 1) * numeric(n.arg, x);
  if (n.kind === 'call') {
    const v = numeric(n.arg, x);
    return (
      { sqrt: Math.sqrt, log: Math.log, exp: Math.exp, sin: Math.sin, cos: Math.cos }[n.name] ??
      (() => NaN)
    )(v);
  }
  const a = numeric(n.left, x),
    b = numeric(n.right, x);
  return n.op === '+'
    ? a + b
    : n.op === '-'
      ? a - b
      : n.op === '*'
        ? a * b
        : n.op === '/'
          ? a / b
          : Math.pow(a, b);
}
export function serialize(n: Node): string {
  if (n.kind === 'num') return n.raw;
  if (n.kind === 'symbol') return n.value;
  if (n.kind === 'unary') return `(${n.op}${serialize(n.arg)})`;
  if (n.kind === 'call') return `${n.name}(${serialize(n.arg)})`;
  return `(${serialize(n.left)}${n.op}${serialize(n.right)})`;
}
export function toTex(n: Node): string {
  if (n.kind === 'num') return n.raw;
  if (n.kind === 'symbol') return n.value === 'pi' ? '\\pi' : n.value;
  if (n.kind === 'unary') return n.op + toTex(n.arg);
  if (n.kind === 'call')
    return n.name === 'sqrt'
      ? `\\sqrt{${toTex(n.arg)}}`
      : `\\${n.name === 'log' ? 'ln' : n.name}\\left(${toTex(n.arg)}\\right)`;
  if (n.op === '/') return `\\frac{${toTex(n.left)}}{${toTex(n.right)}}`;
  if (n.op === '^') return `{${toTex(n.left)}}^{${toTex(n.right)}}`;
  const wrap = (v: Node) =>
    v.kind === 'binary' && ['+', '-'].includes(v.op) ? `\\left(${toTex(v)}\\right)` : toTex(v);
  return n.op === '*'
    ? wrap(n.left) + '\\cdot ' + wrap(n.right)
    : toTex(n.left) + n.op + wrap(n.right);
}
export function complexity(n: Node): number {
  return n.kind === 'num' || n.kind === 'symbol'
    ? 0
    : n.kind === 'binary'
      ? 1 + complexity(n.left) + complexity(n.right)
      : 1 + complexity(n.arg);
}
/** Conservative sufficient domain check for formulas entered as identities on all R (or x>0).
 * Unsupported domains are refused, never guessed from point sampling. */
export function domainSafe(n: Node, positiveX: boolean): boolean {
  const positive = (v: Node): boolean => {
    if (!hasX(v)) return numeric(v) > 0;
    if (v.kind === 'symbol') return v.value === 'x' ? positiveX : true;
    if (v.kind === 'call') return v.name === 'exp' || (v.name === 'sqrt' && positive(v.arg));
    if (v.kind === 'binary')
      return (
        (v.op === '^' && positive(v.left)) ||
        (['*', '/', '+'].includes(v.op) && positive(v.left) && positive(v.right))
      );
    return false;
  };
  if (!hasX(n)) return Number.isFinite(numeric(n));
  if (n.kind === 'unary') return domainSafe(n.arg, positiveX);
  if (n.kind === 'call')
    return (
      domainSafe(n.arg, positiveX) && (['sin', 'cos', 'exp'].includes(n.name) || positive(n.arg))
    );
  if (n.kind === 'binary') {
    if (!domainSafe(n.left, positiveX) || !domainSafe(n.right, positiveX)) return false;
    if (n.op === '/') return positive(n.right) || (!hasX(n.right) && numeric(n.right) !== 0);
    if (n.op === '^') {
      const power = numeric(n.right);
      return positive(n.left) || (Number.isInteger(power) && power >= 0);
    }
  }
  return true;
}
