import { expandBinomial } from './binomial';
import type { Exercise } from '../types';
import { quadraticSteps } from './quadratic';
export default {
  id: 9,
  title: 'Comparer avec ln',
  short: 'Inéquations logarithmiques',
  theme: 'Logarithme',
  level: 'Approfondissement',
  minutes: 25,
  description:
    'Combiner domaines, croissance et intersections. Une formule simplifiée ne doit jamais élargir le domaine initial.',
  objectives: ['Résoudre sous contraintes', 'Ne pas confondre les conditions des fonctions'],
  prerequisites: ['Exercices 3 et 8'],
  activities: [
    {
      id: '9q1',
      label: 'Question 1',
      prompt: 'Résoudre dans ℝ.',
      tex: '\\ln(2+5x)\\le\\ln(x+6)',
      result: ']-\\tfrac25,1]',
      steps: [
        {
          title: 'Lire l’énoncé',
          tex: '\\ln(2+5x)\\le\\ln(x+6)',
          why: 'On exige d’abord 2 + 5x > 0 et x + 6 > 0 pour définir les deux logarithmes. On résoudra ensuite l’inéquation sur l’ensemble ainsi obtenu.',
        },
        {
          title: 'Définir le premier logarithme',
          tex: '2+5x>0\\quad\\Longrightarrow\\quad x>-\\frac25',
          why: 'On soustrait 2 aux deux membres, puis on divise par 5 > 0. Ces opérations conservent le sens de l’inégalité.',
        },
        {
          title: 'Définir le second logarithme',
          tex: 'x+6>0\\quad\\Longrightarrow\\quad x>-6',
          why: 'On soustrait 6.',
        },
        {
          title: 'Garder la condition la plus forte',
          tex: 'x>-\\frac25',
          why: 'Tout nombre supérieur à −2/5 est aussi supérieur à −6. Il doit satisfaire les deux conditions.',
        },
        {
          title: 'Comparer les arguments',
          tex: '2+5x\\le x+6',
          why: 'La fonction ln est strictement croissante sur ]0, +∞[. Pour deux arguments strictement positifs, ln(a) ≤ ln(b) si et seulement si a ≤ b.',
        },
        {
          title: 'Soustraire x des deux membres',
          tex: '2+4x\\le6',
          why: '5x − x = 4x.',
        },
        {
          title: 'Soustraire 2',
          tex: '4x\\le4',
          why: '6 − 2 = 4.',
        },
        {
          title: 'Diviser par 4',
          tex: 'x\\le1',
          why: 'On divise les deux membres par 4 > 0 : le sens de l’inégalité est conservé.',
        },
        {
          title: 'Prendre l’intersection avec l’ensemble de définition',
          tex: '-\\frac25<x\\le1',
          why: 'On doit respecter à la fois la définition des logarithmes et l’inégalité obtenue.',
        },
        {
          title: 'Retenir le résultat',
          tex: 'S=]-\\tfrac25,1]',
          why: 'On prend l’intersection de x > −2/5, condition d’existence, et de x ≤ 1, condition obtenue par équivalence. La borne −2/5 est exclue et la borne 1 est incluse.',
        },
      ],
      visual: 'logs',
    },
    {
      id: '9q2',
      label: 'Question 2',
      prompt: 'Résoudre dans ℝ.',
      tex: '\\ln(x+1)+\\ln(x-3)<\\ln3',
      result: ']3,1+\\sqrt7[',
      steps: [
        {
          title: 'Lire l’énoncé',
          tex: '\\ln(x+1)+\\ln(x-3)<\\ln3',
          why: 'On exige x + 1 > 0 et x − 3 > 0, soit x > 3. C’est sur cet ensemble que l’on peut réunir les deux logarithmes et résoudre l’inéquation.',
        },
        {
          title: 'Définir le premier logarithme',
          tex: 'x+1>0\\quad\\Longrightarrow\\quad x>-1',
          why: 'Le logarithme népérien est défini uniquement pour un argument strictement positif. Ici x + 1 > 0 équivaut à x > −1.',
        },
        {
          title: 'Définir le second logarithme',
          tex: 'x-3>0\\quad\\Longrightarrow\\quad x>3',
          why: 'Cette condition est plus forte que x > −1. On garde x > 3 pour toute la résolution.',
        },
        {
          title: 'Réunir les logarithmes',
          tex: '\\ln((x+1)(x-3))<\\ln3',
          why: 'Sur x > 3, on a x + 1 > 0 et x − 3 > 0. On peut donc appliquer ln(a) + ln(b) = ln(ab) aux deux arguments.',
        },
        {
          title: 'Comparer les arguments',
          tex: '(x+1)(x-3)<3',
          why: 'La fonction ln est strictement croissante sur ]0, +∞[. Les deux arguments étant strictement positifs, comparer leurs logarithmes revient, par équivalence, à les comparer.',
        },
        ...expandBinomial((expression) => expression + '<3', 1, -3, 'Distribuer les deux termes'),
        {
          title: 'Soustraire 3 des deux membres',
          tex: 'x^2-2x-6<0',
          why: '−3 − 3 = −6.',
        },
        ...quadraticSteps({ a: 1, b: -2, c: -6, roots: ['1-\\sqrt7', '1+\\sqrt7'] }),
        {
          title: 'Lire où le trinôme est négatif',
          tex: '1-\\sqrt7<x<1+\\sqrt7',
          why: 'Le coefficient de x² vaut 1 > 0. Le trinôme est strictement négatif exactement entre ses deux racines distinctes ; les racines sont exclues par l’inégalité stricte.',
        },
        {
          title: 'Respecter aussi x > 3',
          tex: '3<x<1+\\sqrt7',
          why: 'On a 1 − √7 < 1 < 3 et, puisque 7 > 4, 1 + √7 > 3. L’intersection avec x > 3 est donc ]3, 1 + √7[.',
        },
        {
          title: 'Retenir le résultat',
          tex: 'S=]3,1+\\sqrt7[',
          why: 'On prend l’intersection de ]3, +∞[, ensemble de définition, avec ]1 − √7, 1 + √7[, obtenu par l’étude du trinôme. Les deux extrémités du résultat sont exclues.',
        },
      ],
      visual: 'logs',
    },
    {
      id: '9q3',
      label: 'Question 3',
      prompt: 'Résoudre dans ℝ.',
      tex: '2\\frac{1+\\ln x}{x}\\ge0',
      result: '[e^{-1},+\\infty[',
      steps: [
        {
          title: 'Lire l’énoncé',
          tex: '2\\frac{1+\\ln x}{x}\\ge0',
          why: 'La condition x > 0 définit ln(x) et garantit que le dénominateur est non nul. On utilisera ensuite le signe strictement positif de 2/x.',
        },
        {
          title: 'Définir ln x',
          tex: 'x>0',
          why: 'La condition x > 0 définit ln(x) et garantit que le dénominateur x est strictement positif, donc non nul.',
        },
        {
          title: 'Diviser par le coefficient strictement positif 2',
          tex: '\\frac{1+\\ln x}{x}\\ge0',
          why: 'Diviser par 2 ne change pas le sens de l’inégalité.',
        },
        {
          title: 'Multiplier par x strictement positif',
          tex: '1+\\ln x\\ge0',
          why: 'Comme x > 0, le sens de l’inégalité reste le même.',
        },
        {
          title: 'Soustraire 1',
          tex: '\\ln x\\ge-1',
          why: 'On soustrait 1 aux deux membres.',
        },
        {
          title: 'Appliquer la croissance de exp',
          tex: 'x\\ge e^{-1}',
          why: 'La fonction exp est strictement croissante sur ℝ et, pour x > 0, exp(ln(x)) = x. Ainsi ln(x) ≥ −1 équivaut à x ≥ e^(−1). La borne est strictement positive et satisfait l’inégalité.',
        },
        {
          title: 'Retenir le résultat',
          tex: 'S=[e^{-1},+\\infty[',
          why: 'Sur x > 0, les transformations sont équivalentes et donnent x ≥ e^(−1). Cette borne est strictement positive et annule le numérateur : elle est incluse.',
        },
      ],
      visual: 'logs',
      note: 'Le 2 est un facteur multiplicatif : il ne s’agit pas d’une exponentielle.',
    },
    {
      id: '9d1',
      label: 'Domaine de f1',
      prompt: 'Déterminer l’ensemble de définition.',
      tex: 'f_1(x)=\\sqrt{\\ln(2+5x)-\\ln(x+6)}',
      result: '[1,+\\infty[',
      steps: [
        {
          title: 'Lire l’énoncé',
          tex: 'f_1(x)=\\sqrt{\\ln(2+5x)-\\ln(x+6)}',
          why: 'On cherche l’ensemble de définition : tous les réels x pour lesquels l’expression de la fonction est définie dans ℝ. Les conditions portant sur chaque opération doivent être satisfaites simultanément.',
        },
        {
          title: 'Définir les deux logarithmes',
          tex: '2+5x>0,\\qquad x+6>0',
          why: 'Les deux arguments doivent être strictement positifs.',
        },
        {
          title: 'Prendre l’intersection des deux conditions',
          tex: 'x>-\\frac25',
          why: 'Les conditions x > −2/5 et x > −6 se réduisent à la plus forte.',
        },
        {
          title: 'Définir la racine carrée',
          tex: '\\ln(2+5x)-\\ln(x+6)\\ge0',
          why: 'La différence des logarithmes peut être nulle, puisqu’elle est seulement sous une racine.',
        },
        {
          title: 'Isoler les logarithmes',
          tex: '\\ln(2+5x)\\ge\\ln(x+6)',
          why: 'On ajoute ln(x + 6) aux deux membres.',
        },
        {
          title: 'Comparer les arguments strictement positifs',
          tex: '2+5x\\ge x+6',
          why: 'Sous la condition x > −2/5, les deux logarithmes sont définis. La stricte croissance de ln permet de comparer leurs arguments par équivalence, en conservant le sens de l’inégalité.',
        },
        {
          title: 'Soustraire x des deux côtés',
          tex: '2+4x\\ge6',
          why: '5x − x = 4x. Le sens de l’inégalité ne change pas.',
        },
        {
          title: 'Soustraire 2 des deux côtés',
          tex: '4x\\ge4',
          why: '6 − 2 = 4.',
        },
        {
          title: 'Diviser par 4',
          tex: 'x\\ge1',
          why: 'On divise les deux membres par 4 > 0 sans changer le sens de l’inégalité. Les valeurs x ≥ 1 respectent toutes la condition x > −2/5.',
        },
        {
          title: 'Retenir le résultat',
          tex: 'D=[1,+\\infty[',
          why: 'La condition de la racine donne x ≥ 1. Tous ces réels vérifient aussi x > −2/5, nécessaire aux logarithmes. La borne 1 donne une racine nulle, donc elle est incluse.',
        },
      ],
      visual: 'logs',
      note: 'Le sens est l’inverse de celui de la question 9.1. On ne recopie pas son ensemble de solutions.',
    },
    {
      id: '9d2',
      label: 'Domaine de f2',
      prompt: 'Déterminer l’ensemble de définition.',
      tex: 'f_2(x)=\\exp(\\ln(x+1)+\\ln(x-3)-\\ln3)',
      result: ']3,+\\infty[',
      steps: [
        {
          title: 'Lire l’énoncé',
          tex: 'f_2(x)=\\exp(\\ln(x+1)+\\ln(x-3)-\\ln3)',
          why: 'On cherche l’ensemble de définition : tous les réels x pour lesquels l’expression de la fonction est définie dans ℝ. Les conditions portant sur chaque opération doivent être satisfaites simultanément.',
        },
        {
          title: 'Définir le premier logarithme',
          tex: 'x+1>0\\quad\\Longrightarrow\\quad x>-1',
          why: 'On doit pouvoir calculer le premier terme de l’exposant.',
        },
        {
          title: 'Définir le second logarithme',
          tex: 'x-3>0\\quad\\Longrightarrow\\quad x>3',
          why: 'On doit aussi pouvoir calculer le second terme.',
        },
        {
          title: 'Contrôler le logarithme constant',
          tex: '3>0',
          why: 'ln(3) est défini sans condition sur x.',
        },
        {
          title: 'Imposer les deux conditions simultanément',
          tex: 'x>3',
          why: 'x > 3 implique déjà x > −1.',
        },
        {
          title: 'Contrôler l’exponentielle extérieure',
          tex: 'e^u\\text{ existe pour tout }u\\in\\mathbb R',
          why: 'L’exposant peut être négatif, nul ou positif. Il n’y a aucune condition de signe supplémentaire.',
        },
        {
          title: 'Retenir le résultat',
          tex: 'D=]3,+\\infty[',
          why: 'Les deux logarithmes variables sont définis simultanément si et seulement si x > 3. L’exponentielle extérieure n’ajoute aucune restriction.',
        },
      ],
      visual: 'logs',
    },
    {
      id: '9d3',
      label: 'Domaine de f3',
      prompt: 'Déterminer l’ensemble de définition.',
      tex: 'f_3(x)=\\ln\\!\\left(2\\frac{1+\\ln x}{x}\\right)',
      result: ']e^{-1},+\\infty[',
      steps: [
        {
          title: 'Lire l’énoncé',
          tex: 'f_3(x)=\\ln\\!\\left(2\\frac{1+\\ln x}{x}\\right)',
          why: 'On cherche l’ensemble de définition : tous les réels x pour lesquels l’expression de la fonction est définie dans ℝ. Les conditions portant sur chaque opération doivent être satisfaites simultanément.',
        },
        {
          title: 'Définir le logarithme intérieur',
          tex: 'x>0',
          why: 'Il faut x > 0 pour définir ln(x). Le dénominateur x est alors strictement positif et non nul.',
        },
        {
          title: 'Définir le logarithme extérieur',
          tex: '2\\frac{1+\\ln x}{x}>0',
          why: 'L’argument entier du logarithme extérieur doit être strictement positif.',
        },
        {
          title: 'Diviser par le facteur strictement positif 2/x',
          tex: '1+\\ln x>0',
          why: '2/x est strictement positif sur le domaine. Il ne change donc pas le signe.',
        },
        {
          title: 'Soustraire 1',
          tex: '\\ln x>-1',
          why: 'On soustrait 1 des deux côtés.',
        },
        {
          title: 'Appliquer exp',
          tex: 'x>e^{-1}',
          why: 'La stricte croissance de exp et l’identité exp(ln(x)) = x pour x > 0 donnent ln(x) > −1 si et seulement si x > e^(−1). L’égalité annulerait l’argument du logarithme extérieur et reste exclue.',
        },
        {
          title: 'Retenir le résultat',
          tex: 'D=]e^{-1},+\\infty[',
          why: 'Le logarithme intérieur impose x > 0. Sur cet ensemble, l’argument du logarithme extérieur est strictement positif si et seulement si x > e^(−1). La borne est exclue car elle annule cet argument.',
        },
      ],
      visual: 'logs',
    },
  ],
  color: 'blue',
} satisfies Exercise;
