import type { Exercise } from '../types';
export default {
  id: 6,
  title: 'Comparer les exponentielles',
  short: 'Inéquations exponentielles',
  theme: 'Exponentielle',
  level: 'Intermédiaire',
  minutes: 25,
  description:
    'La croissance de exp préserve le sens des inégalités. Les produits demandent encore une étude de signe.',
  objectives: ['Comparer deux exponentielles', 'Traiter les racines paires et logarithmes'],
  prerequisites: ['Exercices 3 et 5'],
  activities: [
    {
      id: '6q1',
      label: 'Question 1',
      prompt: 'Résoudre dans ℝ.',
      tex: 'e^4-e^x\\ge0',
      result: ']-\\infty,4]',
      steps: [
        {
          title: 'Lire l’énoncé',
          tex: 'e^4-e^x\\ge0',
          why: 'Résoudre dans ℝ. Nous allons d’abord poser les conditions utiles, puis détailler le calcul.',
        },
        {
          title: 'Ajouter eˣ des deux côtés',
          tex: 'e^4\\ge e^x',
          why: 'On déplace le terme en ajoutant la même quantité aux deux membres.',
        },
        {
          title: 'Lire l’inégalité dans l’autre ordre',
          tex: 'e^x\\le e^4',
          why: 'On écrit l’expression contenant x à gauche. Le sens de lecture est inversé, pas la relation entre les nombres.',
        },
        {
          title: 'Utiliser la croissance de exp',
          tex: 'x\\le4',
          why: 'L’exponentielle est strictement croissante : l’ordre des valeurs est celui des exposants.',
        },
        {
          title: 'Inclure la borne',
          tex: 'x=4\\quad\\Longrightarrow\\quad e^4-e^x=0',
          why: 'Le symbole ≥ accepte zéro. La borne 4 fait donc partie de la solution.',
        },
        {
          title: 'Retenir le résultat',
          tex: 'S=]-\\infty,4]',
          why: 'S désigne l’ensemble des solutions. On ne conserve que les valeurs compatibles avec l’énoncé et ses conditions de définition.',
        },
      ],
      visual: 'substitution',
    },
    {
      id: '6q2',
      label: 'Question 2',
      prompt: 'Résoudre dans ℝ.',
      tex: '(4-2x)(e-e^x)\\ge0',
      result: ']-\\infty,1]\\cup[2,+\\infty[',
      steps: [
        {
          title: 'Lire l’énoncé',
          tex: '(4-2x)(e-e^x)\\ge0',
          why: 'Résoudre dans ℝ. Nous allons d’abord poser les conditions utiles, puis détailler le calcul.',
        },
        {
          title: 'Annuler le premier facteur',
          tex: '4-2x=0',
          why: 'On cherche les valeurs où un facteur change de signe.',
        },
        {
          title: 'Résoudre ce premier cas',
          tex: '2x=4\\quad\\Longrightarrow\\quad x=2',
          why: 'On ajoute 2x des deux côtés, puis on divise par 2.',
        },
        {
          title: 'Annuler le second facteur',
          tex: 'e-e^x=0\\quad\\Longrightarrow\\quad e^x=e^1',
          why: 'e s’écrit aussi e puissance 1.',
        },
        {
          title: 'Résoudre ce second cas',
          tex: 'x=1',
          why: 'L’égalité des exponentielles donne l’égalité des exposants.',
        },
        {
          title: 'Signer 4 − 2x',
          tex: '4-2x>0\\ \\text{si }x<2;\\quad4-2x<0\\ \\text{si }x>2',
          why: 'Le coefficient de x est négatif. Le facteur décroît, donc il est positif avant son zéro et négatif après.',
        },
        {
          title: 'Signer e − eˣ',
          tex: 'e-e^x>0\\ \\text{si }x<1;\\quad e-e^x<0\\ \\text{si }x>1',
          why: 'Avant x = 1, eˣ est plus petit que e ; après, il est plus grand.',
        },
        {
          title: 'Multiplier les signes',
          tex: '\\begin{array}{c|ccc}x&]-\\infty,1[&]1,2[&]2,+\\infty[\\\\4-2x&+&+&-\\\\e-e^x&+&-&-\\\\\\text{produit}&+&-&+\\end{array}',
          why: 'Deux signes identiques donnent un produit positif. Des signes différents donnent un produit négatif.',
        },
        {
          title: 'Inclure les zéros',
          tex: 'x\\le1\\quad\\text{ou}\\quad x\\ge2',
          why: 'Le symbole ≥ accepte un produit nul. On garde donc aussi 1 et 2.',
        },
        {
          title: 'Retenir le résultat',
          tex: 'S=]-\\infty,1]\\cup[2,+\\infty[',
          why: 'S désigne l’ensemble des solutions. On ne conserve que les valeurs compatibles avec l’énoncé et ses conditions de définition.',
        },
      ],
      visual: 'signs',
    },
    {
      id: '6q3',
      label: 'Question 3',
      prompt: 'Résoudre dans ℝ.',
      tex: 'e^{x+6}<\\frac1{e^x}',
      result: ']-\\infty,-3[',
      steps: [
        {
          title: 'Lire l’énoncé',
          tex: 'e^{x+6}<\\frac1{e^x}',
          why: 'Résoudre dans ℝ. Nous allons d’abord poser les conditions utiles, puis détailler le calcul.',
        },
        {
          title: 'Réécrire l’inverse',
          tex: 'e^{x+6}<e^{-x}',
          why: '1/eˣ = e⁻ˣ. Les deux membres sont maintenant des exponentielles.',
        },
        {
          title: 'Comparer les exposants',
          tex: 'x+6<-x',
          why: 'Comme exp est croissante, on conserve le sens de l’inégalité.',
        },
        {
          title: 'Ajouter x des deux côtés',
          tex: '2x+6<0',
          why: 'x + x = 2x.',
        },
        {
          title: 'Soustraire 6',
          tex: '2x<-6',
          why: 'On soustrait la même quantité aux deux membres.',
        },
        {
          title: 'Diviser par le nombre positif 2',
          tex: 'x<-3',
          why: 'Diviser par un nombre positif conserve le sens. La borne −3 est exclue car l’inégalité est stricte.',
        },
        {
          title: 'Retenir le résultat',
          tex: 'S=]-\\infty,-3[',
          why: 'S désigne l’ensemble des solutions. On ne conserve que les valeurs compatibles avec l’énoncé et ses conditions de définition.',
        },
      ],
      visual: 'substitution',
    },
    {
      id: '6q4',
      label: 'Question 4',
      prompt: 'Résoudre dans ℝ.',
      tex: '\\frac{2-e^{-2x}}{e^{-2x}}<1',
      result: ']-\\infty,0[',
      steps: [
        {
          title: 'Lire l’énoncé',
          tex: '\\frac{2-e^{-2x}}{e^{-2x}}<1',
          why: 'Résoudre dans ℝ. Nous allons d’abord poser les conditions utiles, puis détailler le calcul.',
        },
        {
          title: 'Vérifier le signe du dénominateur',
          tex: 'e^{-2x}>0',
          why: 'Une exponentielle est toujours positive. On peut donc multiplier l’inégalité par ce dénominateur sans changer son sens.',
        },
        {
          title: 'Multiplier les deux membres',
          tex: '2-e^{-2x}<e^{-2x}',
          why: 'Le dénominateur se simplifie à gauche ; à droite, 1 devient e⁻²ˣ.',
        },
        {
          title: 'Ajouter e⁻²ˣ aux deux membres',
          tex: '2<2e^{-2x}',
          why: 'Le membre de droite contient maintenant deux fois la même exponentielle.',
        },
        {
          title: 'Diviser par 2',
          tex: '1<e^{-2x}',
          why: '2 est positif : le sens est conservé.',
        },
        {
          title: 'Écrire 1 comme une exponentielle',
          tex: 'e^0<e^{-2x}',
          why: '1 = e⁰, ce qui permet de comparer les exposants.',
        },
        {
          title: 'Comparer les exposants',
          tex: '0<-2x',
          why: 'La fonction exp est strictement croissante.',
        },
        {
          title: 'Diviser par −2',
          tex: '0>x',
          why: 'Cette fois, le diviseur est négatif : il faut inverser le sens de l’inégalité.',
        },
        {
          title: 'Lire le résultat',
          tex: 'x<0',
          why: '0 > x signifie exactement x < 0.',
        },
        {
          title: 'Retenir le résultat',
          tex: 'S=]-\\infty,0[',
          why: 'S désigne l’ensemble des solutions. On ne conserve que les valeurs compatibles avec l’énoncé et ses conditions de définition.',
        },
      ],
      visual: 'substitution',
    },
    {
      id: '6q5',
      label: 'Question 5',
      prompt: 'Résoudre dans ℝ.',
      tex: '\\frac{e^x-1}{e^x+2}>0',
      result: ']0,+\\infty[',
      steps: [
        {
          title: 'Lire l’énoncé',
          tex: '\\frac{e^x-1}{e^x+2}>0',
          why: 'Résoudre dans ℝ. Nous allons d’abord poser les conditions utiles, puis détailler le calcul.',
        },
        {
          title: 'Signer le dénominateur',
          tex: 'e^x+2>0',
          why: 'eˣ est positif et on lui ajoute 2. Le dénominateur ne s’annule jamais.',
        },
        {
          title: 'Garder le signe du numérateur',
          tex: 'e^x-1>0',
          why: 'Le dénominateur étant positif, le quotient est positif exactement lorsque son numérateur l’est.',
        },
        {
          title: 'Ajouter 1 des deux côtés',
          tex: 'e^x>1',
          why: 'On isole l’exponentielle.',
        },
        {
          title: 'Comparer avec e⁰',
          tex: 'e^x>e^0',
          why: '1 = e⁰.',
        },
        {
          title: 'Comparer les exposants',
          tex: 'x>0',
          why: 'La croissance de exp conserve l’ordre.',
        },
        {
          title: 'Retenir le résultat',
          tex: 'S=]0,+\\infty[',
          why: 'S désigne l’ensemble des solutions. On ne conserve que les valeurs compatibles avec l’énoncé et ses conditions de définition.',
        },
      ],
      visual: 'substitution',
    },
    {
      id: '6d1',
      label: 'Domaine de f1',
      prompt: 'Déterminer l’ensemble de définition.',
      tex: 'f_1(x)=\\sqrt[4]{e^4-e^x}',
      result: ']-\\infty,4]',
      steps: [
        {
          title: 'Lire l’énoncé',
          tex: 'f_1(x)=\\sqrt[4]{e^4-e^x}',
          why: 'Déterminer l’ensemble de définition. On cherche toutes les valeurs de x pour lesquelles chaque calcul est possible.',
        },
        {
          title: 'Définir la racine quatrième',
          tex: 'e^4-e^x\\ge0',
          why: 'Une racine d’ordre pair exige un argument positif ou nul. Zéro est autorisé ici.',
        },
        {
          title: 'Ajouter eˣ des deux côtés',
          tex: 'e^4\\ge e^x',
          why: 'On déplace le terme en ajoutant la même quantité aux deux membres.',
        },
        {
          title: 'Lire l’inégalité dans l’autre ordre',
          tex: 'e^x\\le e^4',
          why: 'On écrit l’expression contenant x à gauche. Le sens de lecture est inversé, pas la relation entre les nombres.',
        },
        {
          title: 'Utiliser la croissance de exp',
          tex: 'x\\le4',
          why: 'L’exponentielle est strictement croissante : l’ordre des valeurs est celui des exposants.',
        },
        {
          title: 'Inclure la borne',
          tex: 'x=4\\quad\\Longrightarrow\\quad e^4-e^x=0',
          why: 'Le symbole ≥ accepte zéro. La borne 4 fait donc partie de la solution.',
        },
        {
          title: 'Retenir le résultat',
          tex: 'D=]-\\infty,4]',
          why: 'Ce domaine regroupe toutes les valeurs autorisées par les conditions précédentes. Une borne ouverte est exclue ; une borne fermée est incluse.',
        },
      ],
      visual: 'substitution',
    },
    {
      id: '6d2',
      label: 'Domaine de f2',
      prompt: 'Déterminer l’ensemble de définition.',
      tex: 'f_2(x)=\\sqrt{(4-2x)(e-e^x)}',
      result: ']-\\infty,1]\\cup[2,+\\infty[',
      steps: [
        {
          title: 'Lire l’énoncé',
          tex: 'f_2(x)=\\sqrt{(4-2x)(e-e^x)}',
          why: 'Déterminer l’ensemble de définition. On cherche toutes les valeurs de x pour lesquelles chaque calcul est possible.',
        },
        {
          title: 'Définir la racine carrée',
          tex: '(4-2x)(e-e^x)\\ge0',
          why: 'L’argument sous la racine doit être positif ou nul.',
        },
        {
          title: 'Annuler le premier facteur',
          tex: '4-2x=0',
          why: 'On cherche les valeurs où un facteur change de signe.',
        },
        {
          title: 'Résoudre ce premier cas',
          tex: '2x=4\\quad\\Longrightarrow\\quad x=2',
          why: 'On ajoute 2x des deux côtés, puis on divise par 2.',
        },
        {
          title: 'Annuler le second facteur',
          tex: 'e-e^x=0\\quad\\Longrightarrow\\quad e^x=e^1',
          why: 'e s’écrit aussi e puissance 1.',
        },
        {
          title: 'Résoudre ce second cas',
          tex: 'x=1',
          why: 'L’égalité des exponentielles donne l’égalité des exposants.',
        },
        {
          title: 'Signer 4 − 2x',
          tex: '4-2x>0\\ \\text{si }x<2;\\quad4-2x<0\\ \\text{si }x>2',
          why: 'Le coefficient de x est négatif. Le facteur décroît, donc il est positif avant son zéro et négatif après.',
        },
        {
          title: 'Signer e − eˣ',
          tex: 'e-e^x>0\\ \\text{si }x<1;\\quad e-e^x<0\\ \\text{si }x>1',
          why: 'Avant x = 1, eˣ est plus petit que e ; après, il est plus grand.',
        },
        {
          title: 'Multiplier les signes',
          tex: '\\begin{array}{c|ccc}x&]-\\infty,1[&]1,2[&]2,+\\infty[\\\\4-2x&+&+&-\\\\e-e^x&+&-&-\\\\\\text{produit}&+&-&+\\end{array}',
          why: 'Deux signes identiques donnent un produit positif. Des signes différents donnent un produit négatif.',
        },
        {
          title: 'Inclure les zéros',
          tex: 'x\\le1\\quad\\text{ou}\\quad x\\ge2',
          why: 'Le symbole ≥ accepte un produit nul. On garde donc aussi 1 et 2.',
        },
        {
          title: 'Retenir le résultat',
          tex: 'D=]-\\infty,1]\\cup[2,+\\infty[',
          why: 'Ce domaine regroupe toutes les valeurs autorisées par les conditions précédentes. Une borne ouverte est exclue ; une borne fermée est incluse.',
        },
      ],
      visual: 'substitution',
    },
    {
      id: '6d3',
      label: 'Domaine de f3',
      prompt: 'Déterminer l’ensemble de définition.',
      tex: 'f_3(x)=\\frac1{\\sqrt{1/e^x-e^{x+6}}}',
      result: ']-\\infty,-3[',
      steps: [
        {
          title: 'Lire l’énoncé',
          tex: 'f_3(x)=\\frac1{\\sqrt{1/e^x-e^{x+6}}}',
          why: 'Déterminer l’ensemble de définition. On cherche toutes les valeurs de x pour lesquelles chaque calcul est possible.',
        },
        {
          title: 'Définir l’inverse de exp',
          tex: 'e^x>0',
          why: '1/eˣ existe pour tout réel x.',
        },
        {
          title: 'Définir la racine',
          tex: 'e^{-x}-e^{x+6}\\ge0',
          why: 'L’argument de la racine doit être positif ou nul.',
        },
        {
          title: 'Interdire une racine nulle',
          tex: 'e^{-x}-e^{x+6}>0',
          why: 'Cette racine est au dénominateur : on doit aussi interdire zéro.',
        },
        {
          title: 'Isoler les deux exponentielles',
          tex: 'e^{x+6}<e^{-x}',
          why: 'On ajoute eˣ⁺⁶ des deux côtés et on lit l’inégalité dans l’autre ordre.',
        },
        {
          title: 'Comparer les exposants',
          tex: 'x+6<-x',
          why: 'Comme exp est croissante, on conserve le sens de l’inégalité.',
        },
        {
          title: 'Ajouter x des deux côtés',
          tex: '2x+6<0',
          why: 'x + x = 2x.',
        },
        {
          title: 'Soustraire 6',
          tex: '2x<-6',
          why: 'On soustrait la même quantité aux deux membres.',
        },
        {
          title: 'Diviser par le nombre positif 2',
          tex: 'x<-3',
          why: 'Diviser par un nombre positif conserve le sens. La borne −3 est exclue car l’inégalité est stricte.',
        },
        {
          title: 'Retenir le résultat',
          tex: 'D=]-\\infty,-3[',
          why: 'Ce domaine regroupe toutes les valeurs autorisées par les conditions précédentes. Une borne ouverte est exclue ; une borne fermée est incluse.',
        },
      ],
      visual: 'substitution',
    },
    {
      id: '6d4',
      label: 'Domaine de f4',
      prompt: 'Déterminer l’ensemble de définition.',
      tex: 'f_4(x)=\\ln\\!\\left(\\frac{e^x-1}{e^x+2}\\right)',
      result: ']0,+\\infty[',
      steps: [
        {
          title: 'Lire l’énoncé',
          tex: 'f_4(x)=\\ln\\!\\left(\\frac{e^x-1}{e^x+2}\\right)',
          why: 'Déterminer l’ensemble de définition. On cherche toutes les valeurs de x pour lesquelles chaque calcul est possible.',
        },
        {
          title: 'Définir le logarithme',
          tex: '\\frac{e^x-1}{e^x+2}>0',
          why: 'Il faut un argument strictement positif, et une fraction définie.',
        },
        {
          title: 'Signer le dénominateur',
          tex: 'e^x+2>0',
          why: 'eˣ est positif et on lui ajoute 2. Le dénominateur ne s’annule jamais.',
        },
        {
          title: 'Garder le signe du numérateur',
          tex: 'e^x-1>0',
          why: 'Le dénominateur étant positif, le quotient est positif exactement lorsque son numérateur l’est.',
        },
        {
          title: 'Ajouter 1 des deux côtés',
          tex: 'e^x>1',
          why: 'On isole l’exponentielle.',
        },
        {
          title: 'Comparer avec e⁰',
          tex: 'e^x>e^0',
          why: '1 = e⁰.',
        },
        {
          title: 'Comparer les exposants',
          tex: 'x>0',
          why: 'La croissance de exp conserve l’ordre.',
        },
        {
          title: 'Retenir le résultat',
          tex: 'D=]0,+\\infty[',
          why: 'Ce domaine regroupe toutes les valeurs autorisées par les conditions précédentes. Une borne ouverte est exclue ; une borne fermée est incluse.',
        },
      ],
      visual: 'substitution',
    },
  ],
  color: 'ochre',
} satisfies Exercise;
