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
          why: 'Résoudre dans ℝ. Nous allons d’abord poser les conditions utiles, puis détailler le calcul.',
        },
        {
          title: 'Poser la condition de définition',
          tex: 'x>0',
          why: 'ln(x) existe uniquement si x est strictement positif.',
        },
        {
          title: 'Faire entrer le coefficient 5',
          tex: '\\ln x=\\ln(2^5)',
          why: '5 ln(2) = ln(2⁵).',
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
          why: 'Sur les nombres positifs, ln prend chaque valeur une seule fois. Deux logarithmes égaux ont donc des arguments égaux.',
        },
        {
          title: 'Vérifier la condition',
          tex: '32>0',
          why: 'La solution obtenue est bien dans le domaine du logarithme.',
        },
        {
          title: 'Retenir le résultat',
          tex: 'S=\\{32\\}',
          why: 'S désigne l’ensemble des solutions. On ne conserve que les valeurs compatibles avec l’énoncé et ses conditions de définition.',
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
          why: 'Résoudre dans ℝ. Nous allons d’abord poser les conditions utiles, puis détailler le calcul.',
        },
        {
          title: 'Exiger un argument positif',
          tex: 'x+2>0',
          why: 'L’argument du logarithme de gauche est x + 2.',
        },
        {
          title: 'Isoler x dans la condition',
          tex: 'x>-2',
          why: 'On soustrait 2. L’argument 7 du logarithme de droite est déjà positif.',
        },
        {
          title: 'Comparer les arguments',
          tex: 'x+2=7',
          why: 'ln est strictement croissante et prend chaque valeur une seule fois : les arguments sont égaux.',
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
          why: 'S désigne l’ensemble des solutions. On ne conserve que les valeurs compatibles avec l’énoncé et ses conditions de définition.',
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
          why: 'Résoudre dans ℝ. Nous allons d’abord poser les conditions utiles, puis détailler le calcul.',
        },
        {
          title: 'Poser le domaine',
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
          why: 'Un produit nul a au moins un facteur nul ; le coefficient 2 ne peut pas être nul.',
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
          why: 'On divise tout le membre de droite par 3.',
        },
        {
          title: 'Revenir à x',
          tex: 'x=e^{1/3}',
          why: 'On applique exp. Les deux solutions 1 et e¹ᐟ³ sont positives.',
        },
        {
          title: 'Retenir le résultat',
          tex: 'S=\\{1,e^{1/3}\\}',
          why: 'S désigne l’ensemble des solutions. On ne conserve que les valeurs compatibles avec l’énoncé et ses conditions de définition.',
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
          why: 'Résoudre dans ℝ. Nous allons d’abord poser les conditions utiles, puis détailler le calcul.',
        },
        {
          title: 'Définir le logarithme',
          tex: 'x>0',
          why: 'Première condition : l’argument de ln doit être positif.',
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
          title: 'Annuler le numérateur',
          tex: '1-2\\ln x=0',
          why: 'Sur le domaine autorisé, seule l’annulation du numérateur rend la fraction nulle.',
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
          why: 'Le logarithme de la solution vaut 1/2. Le dénominateur n’est donc pas nul.',
        },
        {
          title: 'Retenir le résultat',
          tex: 'S=\\{\\sqrt e\\}',
          why: 'S désigne l’ensemble des solutions. On ne conserve que les valeurs compatibles avec l’énoncé et ses conditions de définition.',
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
          why: 'Déterminer l’ensemble de définition. On cherche toutes les valeurs de x pour lesquelles chaque calcul est possible.',
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
          why: 'Ce domaine regroupe toutes les valeurs autorisées par les conditions précédentes. Une borne ouverte est exclue ; une borne fermée est incluse.',
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
          why: 'Déterminer l’ensemble de définition. On cherche toutes les valeurs de x pour lesquelles chaque calcul est possible.',
        },
        {
          title: 'Définir le logarithme',
          tex: 'x+2>0\\quad\\Longrightarrow\\quad x>-2',
          why: 'Le logarithme impose une positivité stricte.',
        },
        {
          title: 'Lire l’exposant négatif',
          tex: 'u^{-2}=\\frac1{u^2}\\quad(u\\ne0)',
          why: 'La puissance −2 signifie un inverse de carré. Sa base ne peut pas être nulle.',
        },
        {
          title: 'Interdire la base nulle',
          tex: '\\ln(x+2)-\\ln7\\ne0',
          why: 'Ici la base u est la différence des deux logarithmes.',
        },
        {
          title: 'Comparer les logarithmes',
          tex: '\\ln(x+2)\\ne\\ln7\\quad\\Longrightarrow\\quad x+2\\ne7',
          why: 'Sur le domaine autorisé, ln prend chaque valeur une seule fois.',
        },
        {
          title: 'Conserver les deux conditions',
          tex: 'x>-2,\\qquad x\\ne5',
          why: 'On soustrait 2 pour trouver la valeur interdite 5.',
        },
        {
          title: 'Retenir le résultat',
          tex: 'D=]-2,5[\\cup]5,+\\infty[',
          why: 'Ce domaine regroupe toutes les valeurs autorisées par les conditions précédentes. Une borne ouverte est exclue ; une borne fermée est incluse.',
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
          why: 'Déterminer l’ensemble de définition. On cherche toutes les valeurs de x pour lesquelles chaque calcul est possible.',
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
          why: 'On ne garde que les réels positifs, puis on y enlève ces deux valeurs.',
        },
        {
          title: 'Retenir le résultat',
          tex: 'D=]0,1[\\cup]1,e^{1/3}[\\cup]e^{1/3},+\\infty[',
          why: 'Ce domaine regroupe toutes les valeurs autorisées par les conditions précédentes. Une borne ouverte est exclue ; une borne fermée est incluse.',
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
          why: 'Déterminer l’ensemble de définition. On cherche toutes les valeurs de x pour lesquelles chaque calcul est possible.',
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
          why: 'On enlève cette valeur du domaine positif.',
        },
        {
          title: 'Contrôler la valeur qui annule le numérateur',
          tex: 'x=e^{-2}\\quad\\Longrightarrow\\quad1-2\\ln x=5',
          why: 'e⁻² est autorisé : le numérateur y vaut zéro mais le dénominateur vaut 5.',
        },
        {
          title: 'Retenir le résultat',
          tex: 'D=]0,\\sqrt e[\\cup]\\sqrt e,+\\infty[',
          why: 'Ce domaine regroupe toutes les valeurs autorisées par les conditions précédentes. Une borne ouverte est exclue ; une borne fermée est incluse.',
        },
      ],
      visual: 'logs',
      note: 'La valeur e⁻² est autorisée ici : 2 + ln(x) est désormais au numérateur.',
    },
  ],
  color: 'blue',
} satisfies Exercise;
