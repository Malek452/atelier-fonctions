import { expandBinomial } from './binomial';
import type { Step } from '../types';
import { quadraticSteps, discriminantSteps } from './quadratic';
const t = String.raw;
const s = (title: string, tex: string, why: string, focus?: string, fromFocus?: string): Step => ({
  title,
  tex,
  why,
  ...(focus ? { focus } : {}),
  ...(fromFocus ? { fromFocus } : {}),
});

export const domain4Steps: Step[] = [
  s(
    'Lire les deux niveaux de dénominateur',
    t`f_4(x)=\frac{2}{\left(7x+\frac4x-1\right)^2}`,
    'La fraction 4/x doit d’abord exister. Ensuite, le carré au dénominateur de la grande fraction doit être non nul.',
  ),
  s(
    'Définir la fraction intérieure',
    t`x\ne0`,
    '4/x impose x ≠ 0. Cette restriction restera valable jusqu’à la conclusion.',
  ),
  {
    ...s(
      'Interdire le dénominateur extérieur nul',
      t`\left(7x+\frac4x-1\right)^2\ne0`,
      'La grande fraction a pour numérateur 2. On doit pouvoir diviser par le carré situé au dénominateur.',
    ),
    statement: true,
  },
  s(
    'Enlever le carré dans la condition',
    t`7x+\frac4x-1\ne0`,
    'Le carré d’un réel est nul si et seulement si ce réel est nul. On cherche donc si la base du carré peut s’annuler.',
  ),
  {
    ...s(
      'Réécrire 7x avec le dénominateur x',
      t`7x+\frac4x-1=\frac{7x^2}{x}+\frac4x-1`,
      'Pour x ≠ 0, multiplier 7x par x/x ne change pas sa valeur.',
      t`\frac{7x^2}{x}`,
    ),
    statement: true,
  },
  s(
    'Réécrire le terme −1',
    t`7x+\frac4x-1=\frac{7x^2}{x}+\frac4x-\frac{x}{x}`,
    'Comme x/x = 1, on remplace −1 par −x/x. Les trois termes ont le même dénominateur.',
    t`-\frac{x}{x}`,
  ),
  s(
    'Réunir les numérateurs',
    t`7x+\frac4x-1=\frac{7x^2+4-x}{x}`,
    'On additionne les numérateurs avec leurs signes et on garde le dénominateur x.',
    t`7x^2+4-x`,
  ),
  s(
    'Ordonner le numérateur',
    t`7x+\frac4x-1=\frac{7x^2-x+4}{x}`,
    'On place −x avant la constante 4, sans modifier aucun signe.',
    t`7x^2-x+4`,
  ),
  {
    ...s(
      'Traduire la condition de non-annulation',
      t`x\ne0\quad\text{et}\quad 7x^2-x+4\ne0`,
      'Pour x ≠ 0, la fraction est nulle exactement quand son numérateur est nul. Il reste à chercher les éventuels zéros de ce trinôme.',
    ),
    statement: true,
  },
  ...discriminantSteps({ a: 7, b: -1, c: 4 }),
  {
    ...s(
      'Écarter toute autre exclusion',
      t`7x^2-x+4\ne0\quad\text{pour tout }x\in\mathbb R`,
      'Pour chaque x non nul, la base du carré est donc définie et non nulle. Son carré est lui aussi non nul.',
    ),
    statement: true,
  },
  {
    ...s(
      'Retenir le domaine',
      t`D=\mathbb R\setminus\{0\}`,
      'La seule valeur interdite est 0, à cause de 4/x. Le carré extérieur n’impose aucune exclusion supplémentaire.',
    ),
    statement: true,
  },
];

export const domain5Steps: Step[] = [
  s(
    'Lire les dénominateurs emboîtés',
    t`f_5(x)=\frac{3}{1+\frac1x-\frac6{x^2}}`,
    'On vérifie d’abord les fractions intérieures, puis le dénominateur de la grande fraction.',
  ),
  s(
    'Définir les fractions intérieures',
    t`x\ne0`,
    'Les deux dénominateurs x et x² sont non nuls exactement lorsque x ≠ 0.',
  ),
  {
    ...s(
      'Interdire le dénominateur extérieur nul',
      t`1+\frac1x-\frac6{x^2}\ne0`,
      'Même quand les petites fractions existent, leur somme ne doit pas être nulle : elle sert de dénominateur à la fonction.',
    ),
    statement: true,
  },
  s(
    'Écrire 1 sur le dénominateur x²',
    t`\frac{x^2}{x^2}+\frac1x-\frac6{x^2}\ne0`,
    'Pour x ≠ 0, x²/x² vaut 1.',
    t`\frac{x^2}{x^2}`,
  ),
  s(
    'Mettre 1/x au même dénominateur',
    t`\frac{x^2}{x^2}+\frac{x}{x^2}-\frac6{x^2}\ne0`,
    'On multiplie le numérateur et le dénominateur de 1/x par x.',
    t`\frac{x}{x^2}`,
  ),
  s(
    'Réunir les trois numérateurs',
    t`\frac{x^2+x-6}{x^2}\ne0`,
    'Les dénominateurs sont identiques. Le numérateur devient x² + x − 6.',
    t`x^2+x-6`,
  ),
  s(
    'Exiger un numérateur non nul',
    t`x^2+x-6\ne0`,
    'Le dénominateur x² est déjà non nul. La fraction est non nulle si et seulement si son numérateur est non nul.',
  ),
  s(
    'Décomposer le terme x',
    t`x^2+3x-2x-6\ne0`,
    'On écrit x = 3x − 2x. Les nombres 3 et −2 ont pour somme 1 et pour produit −6.',
    '3x-2x',
  ),
  s(
    'Factoriser les deux premiers termes',
    t`x(x+3)-2x-6\ne0`,
    'x² + 3x = x(x + 3). Les deux derniers termes restent inchangés.',
    'x(x+3)',
  ),
  s(
    'Factoriser les deux derniers termes',
    t`x(x+3)-2(x+3)\ne0`,
    '−2x − 6 = −2(x + 3). On fait apparaître la même parenthèse.',
    '-2(x+3)',
    '-2x-6',
  ),
  s(
    'Mettre la parenthèse commune en facteur',
    t`(x+3)(x-2)\ne0`,
    'Le facteur commun est x + 3. Les facteurs restants sont x et −2.',
  ),
  s(
    'Imposer les deux conditions',
    t`x+3\ne0\quad\text{et}\quad x-2\ne0`,
    'Un produit est non nul si et seulement si ses deux facteurs sont non nuls. Les conditions sont reliées par « et ».',
  ),
  s(
    'Exclure le premier zéro',
    t`x\ne-3\quad\text{et}\quad x-2\ne0`,
    'On soustrait 3 aux deux membres de x + 3 ≠ 0.',
    t`x\ne-3`,
    t`x+3\ne0`,
  ),
  s(
    'Exclure le second zéro',
    t`x\ne-3\quad\text{et}\quad x\ne2`,
    'On ajoute 2 aux deux membres de x − 2 ≠ 0.',
    t`x\ne2`,
    t`x-2\ne0`,
  ),
  s(
    'Réunir toutes les exclusions',
    t`x\ne-3,\qquad x\ne0,\qquad x\ne2`,
    '−3 et 2 annulent le dénominateur extérieur. On conserve aussi l’exclusion initiale x ≠ 0.',
  ),
  s(
    'Retenir le domaine',
    t`D=\mathbb R\setminus\{-3,0,2\}`,
    'Toutes les autres valeurs réelles permettent de calculer les deux petites fractions puis la grande fraction.',
  ),
];

const denominator = t`(x-1)(x-3)`;
const u = (numerator: string) => t`u(x)=\frac{${numerator}}{${denominator}}`;
const develop = (inside: string) => u(t`x-3-\left(${inside}\right)`);
export const domain6Steps: Step[] = [
  s(
    'Lire les trois niveaux du calcul',
    t`f_6(x)=\frac1{\sqrt[3]{\frac1{x-1}-\frac{x+5}{x-3}}}`,
    'On calcule les deux fractions intérieures, puis leur différence, puis sa racine cubique, et enfin l’inverse.',
  ),
  s('Définir la première fraction', t`x-1\ne0`, 'La division par x − 1 doit être possible.'),
  s('Exclure 1', t`x\ne1`, 'On ajoute 1 aux deux membres.'),
  {
    ...s(
      'Définir la seconde fraction',
      t`x-3\ne0`,
      'La division par x − 3 doit aussi être possible. On conserve x ≠ 1.',
    ),
    statement: true,
  },
  s(
    'Exclure 3',
    t`x\ne3`,
    'On ajoute 3 aux deux membres. Les valeurs 1 et 3 sont désormais exclues.',
  ),
  {
    ...s(
      'Nommer la différence intérieure',
      t`u(x)=\frac1{x-1}-\frac{x+5}{x-3}`,
      'On appelle u(x) la quantité sous la racine cubique. On travaille uniquement pour x ≠ 1 et x ≠ 3.',
    ),
    statement: true,
  },
  {
    ...s(
      'Comprendre la racine cubique',
      t`\sqrt[3]{u}\quad\text{existe pour tout }u\in\mathbb R`,
      'Une racine cubique accepte les nombres négatifs, nuls et positifs. Il n’y a aucune condition u ≥ 0.',
    ),
    statement: true,
  },
  {
    ...s(
      'Interdire le dénominateur extérieur nul',
      t`\sqrt[3]{u(x)}\ne0\quad\Longleftrightarrow\quad u(x)\ne0`,
      'Une racine cubique vaut zéro exactement lorsque son argument vaut zéro. Comme on prend son inverse, u(x) doit être non nul.',
    ),
    statement: true,
  },
  {
    ...s(
      'Mettre la première fraction au même dénominateur',
      t`u(x)=\frac{x-3}{(x-1)(x-3)}-\frac{x+5}{x-3}`,
      'On multiplie le numérateur et le dénominateur de la première fraction par x − 3, qui est non nul.',
      t`\frac{x-3}{(x-1)(x-3)}`,
    ),
    statement: true,
  },
  s(
    'Mettre la seconde fraction au même dénominateur',
    t`u(x)=\frac{x-3}{(x-1)(x-3)}-\frac{(x+5)(x-1)}{(x-1)(x-3)}`,
    'On multiplie le numérateur et le dénominateur de la seconde fraction par x − 1, qui est non nul.',
    t`\frac{(x+5)(x-1)}{(x-1)(x-3)}`,
  ),
  s(
    'Soustraire les numérateurs',
    u('x-3-(x+5)(x-1)'),
    'Le signe moins porte sur tout le second numérateur (x + 5)(x − 1). Les parenthèses doivent rester présentes.',
    'x-3-(x+5)(x-1)',
  ),
  ...expandBinomial(
    develop,
    5,
    -1,
    'Distribuer les deux termes du premier facteur',
    'Regrouper dans la parenthèse',
  ),
  s(
    'Appliquer le signe moins au premier terme',
    u(t`x-3-x^2-\left(4x-5\right)`),
    '−(x² + 4x − 5) = −x² − (4x − 5). On traite d’abord le terme x².',
    '-x^2',
    t`-\left(x^2+4x-5\right)`,
  ),
  s(
    'Appliquer le signe moins au terme 4x',
    u('x-3-x^2-4x-(-5)'),
    'On prend l’opposé de 4x : cela donne −4x. Le dernier terme reste écrit −(−5), pour garder les deux signes visibles.',
    '-4x-(-5)',
    t`-\left(4x-5\right)`,
  ),
  s(
    'Prendre l’opposé de −5',
    u('x-3-x^2-4x+5'),
    'L’opposé de −5 est +5 : −(−5) = +5. Tous les termes de la parenthèse ont maintenant été traités.',
    '+5',
    '-(-5)',
  ),
  {
    ...s(
      'Regrouper les termes en x',
      u('-x^2-3x-3+5'),
      'x − 4x = (1 − 4)x = −3x. Les constantes −3 et +5 restent écrites.',
      '-3x',
      'x-3-x^2-4x+5',
    ),
    collect: { left: 'x', right: '-4x', via: '(1-4)x', result: '-3x' },
  },
  {
    ...s('Additionner les constantes', u('-x^2-3x+2'), '−3 + 5 = 2.', '+2', '-3+5'),
    collect: { left: '-3', right: '5', via: '-3+5', result: '2' },
  },
  s(
    'Mettre −1 en facteur',
    t`u(x)=-\frac{x^2+3x-2}{(x-1)(x-3)}`,
    '−x² − 3x + 2 = −(x² + 3x − 2). Le signe moins ne joue aucun rôle dans la recherche des zéros.',
    'x^2+3x-2',
    '-x^2-3x+2',
  ),
  {
    ...s(
      'Chercher les valeurs à exclure',
      t`x^2+3x-2=0`,
      'Les dénominateurs sont déjà non nuls. L’argument u(x) s’annule exactement quand ce trinôme s’annule : on calcule ces valeurs pour les exclure.',
    ),
    statement: true,
  },
  ...quadraticSteps({
    a: 1,
    b: 3,
    c: -2,
    roots: [t`\frac{-3-\sqrt{17}}2`, t`\frac{-3+\sqrt{17}}2`],
  }),
  {
    ...s(
      'Vérifier que 1 n’est pas une nouvelle racine',
      t`1^2+3\times1-2=2\ne0`,
      'La valeur 1 était déjà interdite par une fraction intérieure. Elle est distincte des deux racines du trinôme.',
    ),
    statement: true,
  },
  {
    ...s(
      'Vérifier aussi la valeur 3',
      t`3^2+3\times3-2=16\ne0`,
      'La valeur 3 est elle aussi distincte des deux racines. On a donc quatre valeurs interdites différentes.',
    ),
    statement: true,
  },
  {
    ...s(
      'Réunir les quatre exclusions',
      t`x\notin\left\{\frac{-3-\sqrt{17}}2,\frac{-3+\sqrt{17}}2,1,3\right\}`,
      'On exclut 1 et 3 pour définir les fractions intérieures, puis les deux racines pour que la racine cubique au dénominateur ne soit pas nulle.',
    ),
    statement: true,
  },
  s(
    'Retenir le domaine',
    t`D=\mathbb R\setminus\{\frac{-3-\sqrt{17}}2,\frac{-3+\sqrt{17}}2,1,3\}`,
    'Aucune condition de positivité n’est nécessaire pour une racine cubique. Tous les réels autres que ces quatre valeurs sont autorisés.',
  ),
];
