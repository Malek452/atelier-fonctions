import type { Exercise } from '../types';
export default {
  id: 8,
  title: 'Résoudre avec ln',
  short: 'Équations logarithmiques',
  theme: 'Logarithme',
  level: 'Intermédiaire',
  minutes: 25,
  description:
    'Le domaine vient avant le calcul. Résoudre en ln(x), puis revenir à x par l’exponentielle.',
  objectives: ['Déterminer le domaine préalable', 'Utiliser l’injectivité de ln'],
  prerequisites: ['Exercices 2 et 7'],
  activities: [
    {
      id: '8q1',
      label: 'Question 1',
      prompt: 'Résoudre dans ℝ.',
      tex: '\\ln x=5\\ln2',
      result: '\\{32\\}',
      steps: [
        {
          title: 'Lire l’énoncé',
          tex: '\\ln x=5\\ln2',
          why: 'On détermine d’abord la condition d’existence x > 0, nécessaire pour définir ln(x). Toutes les transformations seront faites sur cet ensemble.',
        },
        {
          title: 'Poser la condition de définition',
          tex: 'x>0',
          why: 'ln(x) existe uniquement si x est strictement positif.',
        },
        {
          title: 'Appliquer 5 ln(2) = ln(2⁵)',
          tex: '\\ln x=\\ln(2^5)',
          why: 'Pour a > 0 et p réel, p ln(a) = ln(aᵖ). Comme 2 > 0, on a 5 ln(2) = ln(2⁵).',
        },
        {
          title: 'Calculer la puissance',
          tex: '\\ln x=\\ln32',
          why: '2⁵ = 32.',
          focus: '32',
        },
        {
          title: 'Comparer les arguments',
          tex: 'x=32',
          why: 'La fonction ln est strictement croissante sur ]0, +∞[, donc injective. Pour a > 0 et b > 0, ln(a) = ln(b) si et seulement si a = b.',
        },
        {
          title: 'Vérifier la condition',
          tex: '32>0',
          why: 'La solution obtenue est bien dans le domaine du logarithme.',
        },
        {
          title: 'Retenir le résultat',
          tex: 'S=\\{32\\}',
          why: 'Sur x > 0, l’injectivité de ln donne x = 32. Cette valeur respecte la condition d’existence et constitue l’unique solution.',
        },
      ],
      visual: 'logs',
    },
    {
      id: '8q2',
      label: 'Question 2',
      prompt: 'Résoudre dans ℝ.',
      tex: '\\ln(x+2)=\\ln7',
      result: '\\{5\\}',
      steps: [
        {
          title: 'Lire l’énoncé',
          tex: '\\ln(x+2)=\\ln7',
          why: 'Les arguments des logarithmes doivent être strictement positifs. Ici, on doit avoir x + 2 > 0 ; le logarithme de 7 est déjà défini.',
        },
        {
          title: 'Exiger un argument strictement positif',
          tex: 'x+2>0',
          why: 'Pour définir ln(x + 2), il faut et il suffit que son argument x + 2 soit strictement positif.',
        },
        {
          title: 'Isoler x dans la condition',
          tex: 'x>-2',
          why: 'On soustrait 2 aux deux membres de x + 2 > 0, ce qui donne x > −2. Comme 7 > 0, le logarithme de droite n’impose aucune autre condition.',
        },
        {
          title: 'Comparer les arguments',
          tex: 'x+2=7',
          why: 'Sur x > −2, les deux arguments x + 2 et 7 sont strictement positifs. L’injectivité de ln donne ln(x + 2) = ln(7) si et seulement si x + 2 = 7.',
        },
        {
          title: 'Soustraire 2 des deux côtés',
          tex: 'x=5',
          why: '7 − 2 = 5.',
        },
        {
          title: 'Vérifier la solution',
          tex: '5+2=7>0',
          why: 'La valeur trouvée rend bien le logarithme défini.',
        },
        {
          title: 'Retenir le résultat',
          tex: 'S=\\{5\\}',
          why: 'Sur x > −2, l’équation équivaut à x + 2 = 7. La valeur 5 respecte cette condition et constitue l’unique solution.',
        },
      ],
      visual: 'logs',
    },
    {
      id: '8q3',
      label: 'Question 3',
      prompt: 'Résoudre dans ℝ.',
      tex: '6(\\ln x)^2-2\\ln x=0',
      result: '\\{1,e^{1/3}\\}',
      steps: [
        {
          title: 'Lire l’énoncé',
          tex: '6(\\ln x)^2-2\\ln x=0',
          why: 'La condition d’existence est x > 0. On factorisera ensuite l’expression sans diviser par ln(x), car ln(x) peut être nul.',
        },
        {
          title: 'Déterminer les conditions d’existence',
          tex: 'x>0',
          why: 'On doit pouvoir calculer ln(x).',
        },
        {
          title: 'Faire apparaître le facteur commun',
          tex: '2\\ln x\\cdot3\\ln x-2\\ln x\\cdot1=0',
          why: 'Le premier terme contient deux facteurs ln(x), tandis que le second en contient un.',
        },
        {
          title: 'Mettre 2 ln x en facteur',
          tex: '2\\ln x(3\\ln x-1)=0',
          why: 'La factorisation ne divise pas par ln(x) : on ne perd donc pas le cas ln(x) = 0.',
        },
        {
          title: 'Séparer les cas',
          tex: '\\ln x=0\\quad\\text{ou}\\quad3\\ln x-1=0',
          why: 'Un produit de réels est nul si et seulement si au moins un facteur est nul. Comme 2 ≠ 0, on obtient ln(x) = 0 ou 3ln(x) − 1 = 0.',
        },
        {
          title: 'Résoudre le premier cas',
          tex: 'x=e^0=1',
          why: 'On applique exp à ln(x) = 0.',
        },
        {
          title: 'Isoler ln x dans le second cas',
          tex: '3\\ln x=1',
          why: 'On ajoute 1 aux deux membres.',
        },
        {
          title: 'Diviser par 3',
          tex: '\\ln x=\\frac13',
          why: 'On divise les deux membres par 3 ≠ 0 : 3ln(x)/3 = ln(x) et 1/3 reste à droite. On obtient une équation équivalente.',
        },
        {
          title: 'Revenir à x',
          tex: 'x=e^{1/3}',
          why: 'Sur x > 0, on a exp(ln(x)) = x. L’injectivité de exp rend cette transformation équivalente ; les deux valeurs 1 et e^(1/3) sont strictement positives.',
        },
        {
          title: 'Retenir le résultat',
          tex: 'S=\\{1,e^{1/3}\\}',
          why: 'La propriété du produit nul donne ln(x) = 0 ou ln(x) = 1/3. Les deux valeurs 1 et e^(1/3) sont strictement positives et vérifient l’équation initiale.',
        },
      ],
      visual: 'logs',
    },
    {
      id: '8q4',
      label: 'Question 4',
      prompt: 'Résoudre dans ℝ.',
      tex: '\\frac{1-2\\ln x}{2+\\ln x}=0',
      result: '\\{\\sqrt e\\}',
      steps: [
        {
          title: 'Lire l’énoncé',
          tex: '\\frac{1-2\\ln x}{2+\\ln x}=0',
          why: 'Deux conditions d’existence sont nécessaires : x > 0 pour définir ln(x), et 2 + ln(x) ≠ 0 pour définir le quotient.',
        },
        {
          title: 'Définir le logarithme',
          tex: 'x>0',
          why: 'Première condition d’existence : x > 0, car le logarithme népérien est défini uniquement sur ]0, +∞[.',
        },
        {
          title: 'Éviter un dénominateur nul',
          tex: '2+\\ln x\\ne0',
          why: 'Une fraction n’existe pas si son dénominateur vaut zéro.',
        },
        {
          title: 'Trouver la valeur interdite',
          tex: '\\ln x\\ne-2\\quad\\Longrightarrow\\quad x\\ne e^{-2}',
          why: 'On soustrait 2, puis on applique exp pour identifier la valeur à exclure.',
        },
        {
          title: 'Résoudre l’équation du numérateur nul',
          tex: '1-2\\ln x=0',
          why: 'Pour x > 0 et x ≠ e^(−2), le dénominateur est non nul. Le quotient est donc nul si et seulement si son numérateur est nul.',
        },
        {
          title: 'Ajouter 2 ln x',
          tex: '1=2\\ln x',
          why: 'On ajoute la même quantité aux deux membres.',
        },
        {
          title: 'Diviser par 2',
          tex: '\\ln x=\\frac12',
          why: 'On obtient la valeur du logarithme.',
        },
        {
          title: 'Appliquer exp',
          tex: 'x=e^{1/2}=\\sqrt e',
          why: 'Une puissance d’exposant 1/2 est une racine carrée.',
        },
        {
          title: 'Contrôler le dénominateur',
          tex: '2+\\frac12=\\frac52\\ne0',
          why: 'La valeur √e est strictement positive et son logarithme vaut 1/2. Le dénominateur vaut donc 2 + 1/2 = 5/2 ≠ 0 : les deux conditions d’existence sont respectées.',
        },
        {
          title: 'Retenir le résultat',
          tex: 'S=\\{\\sqrt e\\}',
          why: 'La valeur √e est strictement positive et rend le dénominateur égal à 5/2, non nul. Elle est l’unique zéro admissible du numérateur, donc l’unique solution.',
        },
      ],
      visual: 'logs',
    },
    {
      id: '8d1',
      label: 'Domaine de f1',
      prompt: 'Déterminer l’ensemble de définition.',
      tex: 'f_1(x)=(\\ln x-5\\ln2)^3',
      result: ']0,+\\infty[',
      steps: [
        {
          title: 'Lire l’énoncé',
          tex: 'f_1(x)=(\\ln x-5\\ln2)^3',
          why: 'On cherche l’ensemble de définition : tous les réels x pour lesquels l’expression de la fonction est définie dans ℝ. Les conditions portant sur chaque opération doivent être satisfaites simultanément.',
        },
        {
          title: 'Définir ln x',
          tex: 'x>0',
          why: 'C’est la seule expression qui peut poser un problème de définition.',
        },
        {
          title: 'Contrôler la constante',
          tex: '2>0',
          why: 'ln(2) est bien défini.',
        },
        {
          title: 'Contrôler la différence',
          tex: '\\ln x-5\\ln2\\in\\mathbb R',
          why: 'Une différence de deux réels est toujours un réel. Elle peut être positive, négative ou nulle.',
        },
        {
          title: 'Contrôler le cube',
          tex: 'u^3\\text{ existe pour tout }u\\in\\mathbb R',
          why: 'Élever au cube n’ajoute aucune restriction, même si u est négatif ou nul.',
        },
        {
          title: 'Retenir le résultat',
          tex: 'D=]0,+\\infty[',
          why: 'La seule restriction est x > 0 pour définir ln(x). La différence et son cube sont ensuite définis pour toute valeur réelle obtenue.',
        },
      ],
      visual: 'logs',
    },
    {
      id: '8d2',
      label: 'Domaine de f2',
      prompt: 'Déterminer l’ensemble de définition.',
      tex: 'f_2(x)=(\\ln(x+2)-\\ln7)^{-2}',
      result: ']-2,5[\\cup]5,+\\infty[',
      steps: [
        {
          title: 'Lire l’énoncé',
          tex: 'f_2(x)=(\\ln(x+2)-\\ln7)^{-2}',
          why: 'On cherche l’ensemble de définition : tous les réels x pour lesquels l’expression de la fonction est définie dans ℝ. Les conditions portant sur chaque opération doivent être satisfaites simultanément.',
        },
        {
          title: 'Définir le logarithme',
          tex: 'x+2>0\\quad\\Longrightarrow\\quad x>-2',
          why: 'Le logarithme impose une positivité stricte.',
        },
        {
          title: 'Lire l’exposant négatif',
          tex: 'u^{-2}=\\frac1{u^2}\\quad(u\\ne0)',
          why: 'Pour u ≠ 0, u^(−2) = 1/u². Cette puissance impose donc que la différence u des deux logarithmes soit non nulle ; elle peut être strictement négative ou strictement positive.',
        },
        {
          title: 'Interdire la base nulle',
          tex: '\\ln(x+2)-\\ln7\\ne0',
          why: 'Ici la base u est la différence des deux logarithmes.',
        },
        {
          title: 'Comparer les logarithmes',
          tex: '\\ln(x+2)\\ne\\ln7\\quad\\Longrightarrow\\quad x+2\\ne7',
          why: 'Sur x > −2, les arguments sont strictement positifs. Par injectivité de ln, leurs logarithmes sont différents si et seulement si les arguments sont différents.',
        },
        {
          title: 'Conserver les deux conditions',
          tex: 'x>-2,\\qquad x\\ne5',
          why: 'On soustrait 2 pour trouver la valeur interdite 5.',
        },
        {
          title: 'Retenir le résultat',
          tex: 'D=]-2,5[\\cup]5,+\\infty[',
          why: 'Il faut simultanément x > −2 pour le logarithme et x ≠ 5 pour la puissance d’exposant négatif. Ces conditions donnent les deux intervalles ouverts indiqués.',
        },
      ],
      visual: 'logs',
    },
    {
      id: '8d3',
      label: 'Domaine de f3',
      prompt: 'Déterminer l’ensemble de définition.',
      tex: 'f_3(x)=\\frac1{6(\\ln x)^2-2\\ln x}',
      result: ']0,1[\\cup]1,e^{1/3}[\\cup]e^{1/3},+\\infty[',
      steps: [
        {
          title: 'Lire l’énoncé',
          tex: 'f_3(x)=\\frac1{6(\\ln x)^2-2\\ln x}',
          why: 'On cherche l’ensemble de définition : tous les réels x pour lesquels l’expression de la fonction est définie dans ℝ. Les conditions portant sur chaque opération doivent être satisfaites simultanément.',
        },
        {
          title: 'Définir ln x',
          tex: 'x>0',
          why: 'Cette restriction précède toute factorisation.',
        },
        {
          title: 'Interdire le dénominateur nul',
          tex: '6(\\ln x)^2-2\\ln x\\ne0',
          why: 'Une division par zéro n’existe pas.',
        },
        {
          title: 'Factoriser',
          tex: '2\\ln x(3\\ln x-1)\\ne0',
          why: 'On sort le facteur commun 2 ln(x).',
        },
        {
          title: 'Exclure le zéro du premier facteur',
          tex: '\\ln x\\ne0\\quad\\Longrightarrow\\quad x\\ne1',
          why: 'exp(0) = 1.',
        },
        {
          title: 'Exclure le zéro du second facteur',
          tex: '3\\ln x-1\\ne0\\quad\\Longrightarrow\\quad x\\ne e^{1/3}',
          why: '3 ln(x) = 1 donnerait ln(x) = 1/3, donc x = e¹ᐟ³.',
        },
        {
          title: 'Réunir les conditions',
          tex: 'x>0,\\qquad x\\notin\\{1,e^{1/3}\\}',
          why: 'On part de ]0, +∞[, ensemble de définition de ln, puis on en retire 1 et e^(1/3), qui annulent le dénominateur.',
        },
        {
          title: 'Retenir le résultat',
          tex: 'D=]0,1[\\cup]1,e^{1/3}[\\cup]e^{1/3},+\\infty[',
          why: 'Il faut x > 0 et un dénominateur non nul. Ses seuls zéros sont 1 et e^(1/3) : on les retire de ]0, +∞[.',
        },
      ],
      visual: 'logs',
    },
    {
      id: '8d4',
      label: 'Domaine de f4',
      prompt: 'Déterminer l’ensemble de définition.',
      tex: 'f_4(x)=\\frac{2+\\ln x}{1-2\\ln x}',
      result: ']0,\\sqrt e[\\cup]\\sqrt e,+\\infty[',
      steps: [
        {
          title: 'Lire l’énoncé',
          tex: 'f_4(x)=\\frac{2+\\ln x}{1-2\\ln x}',
          why: 'On cherche l’ensemble de définition : tous les réels x pour lesquels l’expression de la fonction est définie dans ℝ. Les conditions portant sur chaque opération doivent être satisfaites simultanément.',
        },
        {
          title: 'Définir le logarithme',
          tex: 'x>0',
          why: 'ln(x) apparaît au numérateur et au dénominateur.',
        },
        {
          title: 'Interdire seulement le dénominateur nul',
          tex: '1-2\\ln x\\ne0',
          why: 'Un numérateur nul est autorisé. C’est le dénominateur qu’il faut contrôler.',
        },
        {
          title: 'Chercher le zéro interdit',
          tex: '1-2\\ln x=0\\quad\\Longrightarrow\\quad\\ln x=\\frac12',
          why: 'On ajoute 2 ln(x), puis on divise par 2.',
        },
        {
          title: 'Exprimer la valeur interdite',
          tex: 'x\\ne e^{1/2}=\\sqrt e',
          why: 'On retire e^(1/2) = √e de ]0, +∞[, car cette valeur annule le dénominateur. Toutes les autres valeurs de cet intervalle sont admises.',
        },
        {
          title: 'Contrôler la valeur qui annule le numérateur',
          tex: 'x=e^{-2}\\quad\\Longrightarrow\\quad1-2\\ln x=5',
          why: 'e⁻² est autorisé : le numérateur y vaut zéro mais le dénominateur vaut 5.',
        },
        {
          title: 'Retenir le résultat',
          tex: 'D=]0,\\sqrt e[\\cup]\\sqrt e,+\\infty[',
          why: 'La condition x > 0 définit le logarithme. On exclut ensuite uniquement √e, qui annule le dénominateur ; un zéro du numérateur est autorisé.',
        },
      ],
      visual: 'logs',
      note: 'La valeur e⁻² est autorisée ici : 2 + ln(x) est désormais au numérateur.',
    },
  ],
  color: 'blue',
} satisfies Exercise;
