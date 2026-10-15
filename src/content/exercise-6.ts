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
          why: 'L’inéquation est définie sur ℝ. On utilisera la stricte croissance de l’exponentielle pour comparer les exposants.',
        },
        {
          title: 'Ajouter eˣ des deux côtés',
          tex: 'e^4\\ge e^x',
          why: 'On ajoute eˣ aux deux membres : −eˣ + eˣ = 0 à gauche. Ajouter la même quantité conserve le sens de l’inégalité et donne une inéquation équivalente.',
        },
        {
          title: 'Lire l’inégalité dans l’autre ordre',
          tex: 'e^x\\le e^4',
          why: 'On écrit l’expression contenant x à gauche. Le sens de lecture est inversé, pas la relation entre les nombres.',
        },
        {
          title: 'Utiliser la croissance de exp',
          tex: 'x\\le4',
          why: 'La fonction exp est strictement croissante sur ℝ : eᵘ ≤ eᵛ si et seulement si u ≤ v. Ici, eˣ ≤ e⁴ équivaut donc à x ≤ 4.',
        },
        {
          title: 'Inclure la borne',
          tex: 'x=4\\quad\\Longrightarrow\\quad e^4-e^x=0',
          why: 'Le symbole ≥ accepte zéro. La borne 4 fait donc partie de la solution.',
        },
        {
          title: 'Retenir le résultat',
          tex: 'S=]-\\infty,4]',
          why: 'La stricte croissance de exp donne eˣ ≤ e⁴ si et seulement si x ≤ 4. L’égalité est autorisée : la borne 4 est incluse.',
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
          why: 'Les deux facteurs sont définis sur ℝ. On déterminera leurs zéros et leurs signes pour savoir où leur produit est positif ou nul.',
        },
        {
          title: 'Chercher le zéro du premier facteur',
          tex: '4-2x=0',
          why: 'On cherche d’abord le zéro du premier facteur ; son signe sera ensuite étudié de part et d’autre de cette valeur.',
        },
        {
          title: 'Résoudre ce premier cas',
          tex: '2x=4\\quad\\Longrightarrow\\quad x=2',
          why: 'On ajoute 2x des deux côtés, puis on divise par 2.',
        },
        {
          title: 'Chercher le zéro du second facteur',
          tex: 'e-e^x=0\\quad\\Longrightarrow\\quad e^x=e^1',
          why: 'e s’écrit aussi e puissance 1.',
        },
        {
          title: 'Résoudre ce second cas',
          tex: 'x=1',
          why: 'Par injectivité de exp, eˣ = e¹ si et seulement si x = 1.',
        },
        {
          title: 'Étudier le signe de 4 − 2x',
          tex: '4-2x>0\\ \\text{si }x<2;\\quad4-2x<0\\ \\text{si }x>2',
          why: 'Le coefficient −2 de x est strictement négatif. La fonction affine 4 − 2x est strictement décroissante : elle est strictement positive pour x < 2, nulle en 2 et strictement négative pour x > 2.',
        },
        {
          title: 'Étudier le signe de e − eˣ',
          tex: 'e-e^x>0\\ \\text{si }x<1;\\quad e-e^x<0\\ \\text{si }x>1',
          why: 'La fonction exp est strictement croissante : eˣ < e si x < 1 et eˣ > e si x > 1. On en déduit le signe de e − eˣ.',
        },
        {
          title: 'Multiplier les signes',
          tex: '\\begin{array}{c|ccc}x&]-\\infty,1[&]1,2[&]2,+\\infty[\\\\4-2x&+&+&-\\\\e-e^x&+&-&-\\\\\\text{produit}&+&-&+\\end{array}',
          why: 'Sur chacun des intervalles considérés, les facteurs sont non nuls. Leur produit est strictement positif s’ils ont le même signe et strictement négatif s’ils ont des signes opposés.',
        },
        {
          title: 'Inclure les zéros',
          tex: 'x\\le1\\quad\\text{ou}\\quad x\\ge2',
          why: 'Le symbole ≥ accepte un produit nul. On garde donc aussi 1 et 2.',
        },
        {
          title: 'Retenir le résultat',
          tex: 'S=]-\\infty,1]\\cup[2,+\\infty[',
          why: 'Le produit est strictement positif sur ]−∞, 1[ et ]2, +∞[, et nul en 1 et en 2. Comme on demande un produit positif ou nul, ces deux bornes sont incluses.',
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
          why: 'Comme eˣ > 0 pour tout réel x, le quotient 1/eˣ est défini sur ℝ. On l’écrira sous la forme e^(−x), puis on comparera les exposants.',
        },
        {
          title: 'Réécrire l’inverse',
          tex: 'e^{x+6}<e^{-x}',
          why: '1/eˣ = e⁻ˣ. Les deux membres sont maintenant des exponentielles.',
        },
        {
          title: 'Comparer les exposants',
          tex: 'x+6<-x',
          why: 'La fonction exp est strictement croissante sur ℝ : eᵘ < eᵛ si et seulement si u < v. On obtient donc une inéquation équivalente en comparant les exposants.',
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
          title: 'Diviser par le nombre strictement positif 2',
          tex: 'x<-3',
          why: 'On divise les deux membres par 2 > 0 : l’inéquation est équivalente et garde le même sens. La borne −3 est exclue car elle donne une égalité, alors qu’on demande <.',
        },
        {
          title: 'Retenir le résultat',
          tex: 'S=]-\\infty,-3[',
          why: 'Les transformations sont équivalentes sur ℝ. On obtient x < −3 ; la borne −3 est exclue car elle donne l’égalité des deux membres.',
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
          why: 'Le dénominateur e^(−2x) est strictement positif pour tout réel x. On peut donc multiplier les deux membres par ce dénominateur en conservant le sens de l’inégalité.',
        },
        {
          title: 'Vérifier le signe du dénominateur',
          tex: 'e^{-2x}>0',
          why: 'Pour tout réel x, e^(−2x) > 0. La fraction est donc définie ; multiplier les deux membres par ce dénominateur donne une inéquation équivalente de même sens.',
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
          why: 'On divise les deux membres par 2 > 0 : le sens de l’inégalité est conservé.',
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
          why: 'Le dénominateur est toujours strictement positif. Les transformations équivalentes donnent x < 0 ; en x = 0, le quotient vaut 1 et ne satisfait pas l’inégalité stricte.',
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
          why: 'Le dénominateur eˣ + 2 est strictement positif sur ℝ. Le quotient est donc défini et a le même signe que son numérateur.',
        },
        {
          title: 'Étudier le signe du dénominateur',
          tex: 'e^x+2>0',
          why: 'Pour tout réel x, eˣ > 0, donc eˣ + 2 > 2 > 0. Le dénominateur est strictement positif et ne s’annule jamais.',
        },
        {
          title: 'Garder le signe du numérateur',
          tex: 'e^x-1>0',
          why: 'Le dénominateur étant strictement positif, le quotient a le signe de son numérateur. Il est strictement positif si et seulement si eˣ − 1 > 0.',
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
          why: 'La stricte croissance de exp donne eˣ > e⁰ si et seulement si x > 0.',
        },
        {
          title: 'Retenir le résultat',
          tex: 'S=]0,+\\infty[',
          why: 'Le quotient a le signe de eˣ − 1, qui est strictement positif si et seulement si x > 0. La valeur 0 est exclue car elle annule le numérateur.',
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
          why: 'On cherche l’ensemble de définition : tous les réels x pour lesquels l’expression de la fonction est définie dans ℝ. Les conditions portant sur chaque opération doivent être satisfaites simultanément.',
        },
        {
          title: 'Définir la racine quatrième',
          tex: 'e^4-e^x\\ge0',
          why: 'Une racine d’ordre pair exige un argument positif ou nul. Zéro est autorisé ici.',
        },
        {
          title: 'Ajouter eˣ des deux côtés',
          tex: 'e^4\\ge e^x',
          why: 'On ajoute eˣ aux deux membres : −eˣ + eˣ = 0 à gauche. Ajouter la même quantité conserve le sens de l’inégalité et donne une inéquation équivalente.',
        },
        {
          title: 'Lire l’inégalité dans l’autre ordre',
          tex: 'e^x\\le e^4',
          why: 'On écrit l’expression contenant x à gauche. Le sens de lecture est inversé, pas la relation entre les nombres.',
        },
        {
          title: 'Utiliser la croissance de exp',
          tex: 'x\\le4',
          why: 'La fonction exp est strictement croissante sur ℝ : eᵘ ≤ eᵛ si et seulement si u ≤ v. Ici, eˣ ≤ e⁴ équivaut donc à x ≤ 4.',
        },
        {
          title: 'Inclure la borne',
          tex: 'x=4\\quad\\Longrightarrow\\quad e^4-e^x=0',
          why: 'Le symbole ≥ accepte zéro. La borne 4 fait donc partie de la solution.',
        },
        {
          title: 'Retenir le résultat',
          tex: 'D=]-\\infty,4]',
          why: 'La quantité sous la racine quatrième est positive ou nulle si et seulement si x ≤ 4. À x = 4, cette racine vaut 0 et reste définie.',
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
          why: 'On cherche l’ensemble de définition : tous les réels x pour lesquels l’expression de la fonction est définie dans ℝ. Les conditions portant sur chaque opération doivent être satisfaites simultanément.',
        },
        {
          title: 'Définir la racine carrée',
          tex: '(4-2x)(e-e^x)\\ge0',
          why: 'L’argument sous la racine doit être positif ou nul.',
        },
        {
          title: 'Chercher le zéro du premier facteur',
          tex: '4-2x=0',
          why: 'On cherche d’abord le zéro du premier facteur ; son signe sera ensuite étudié de part et d’autre de cette valeur.',
        },
        {
          title: 'Résoudre ce premier cas',
          tex: '2x=4\\quad\\Longrightarrow\\quad x=2',
          why: 'On ajoute 2x des deux côtés, puis on divise par 2.',
        },
        {
          title: 'Chercher le zéro du second facteur',
          tex: 'e-e^x=0\\quad\\Longrightarrow\\quad e^x=e^1',
          why: 'e s’écrit aussi e puissance 1.',
        },
        {
          title: 'Résoudre ce second cas',
          tex: 'x=1',
          why: 'Par injectivité de exp, eˣ = e¹ si et seulement si x = 1.',
        },
        {
          title: 'Étudier le signe de 4 − 2x',
          tex: '4-2x>0\\ \\text{si }x<2;\\quad4-2x<0\\ \\text{si }x>2',
          why: 'Le coefficient −2 de x est strictement négatif. La fonction affine 4 − 2x est strictement décroissante : elle est strictement positive pour x < 2, nulle en 2 et strictement négative pour x > 2.',
        },
        {
          title: 'Étudier le signe de e − eˣ',
          tex: 'e-e^x>0\\ \\text{si }x<1;\\quad e-e^x<0\\ \\text{si }x>1',
          why: 'La fonction exp est strictement croissante : eˣ < e si x < 1 et eˣ > e si x > 1. On en déduit le signe de e − eˣ.',
        },
        {
          title: 'Multiplier les signes',
          tex: '\\begin{array}{c|ccc}x&]-\\infty,1[&]1,2[&]2,+\\infty[\\\\4-2x&+&+&-\\\\e-e^x&+&-&-\\\\\\text{produit}&+&-&+\\end{array}',
          why: 'Sur chacun des intervalles considérés, les facteurs sont non nuls. Leur produit est strictement positif s’ils ont le même signe et strictement négatif s’ils ont des signes opposés.',
        },
        {
          title: 'Inclure les zéros',
          tex: 'x\\le1\\quad\\text{ou}\\quad x\\ge2',
          why: 'Le symbole ≥ accepte un produit nul. On garde donc aussi 1 et 2.',
        },
        {
          title: 'Retenir le résultat',
          tex: 'D=]-\\infty,1]\\cup[2,+\\infty[',
          why: 'Le tableau de signes donne un produit positif ou nul sur ces deux intervalles. Les valeurs 1 et 2 annulent le produit : leur racine carrée vaut 0, donc elles sont incluses.',
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
          why: 'On cherche l’ensemble de définition : tous les réels x pour lesquels l’expression de la fonction est définie dans ℝ. Les conditions portant sur chaque opération doivent être satisfaites simultanément.',
        },
        {
          title: 'Vérifier que eˣ est non nul',
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
          why: 'La fonction exp est strictement croissante sur ℝ : eᵘ < eᵛ si et seulement si u < v. On obtient donc une inéquation équivalente en comparant les exposants.',
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
          title: 'Diviser par le nombre strictement positif 2',
          tex: 'x<-3',
          why: 'On divise les deux membres par 2 > 0 : l’inéquation est équivalente et garde le même sens. La borne −3 est exclue car elle donne une égalité, alors qu’on demande <.',
        },
        {
          title: 'Retenir le résultat',
          tex: 'D=]-\\infty,-3[',
          why: 'La quantité sous la racine doit être strictement positive, car cette racine est au dénominateur. Cette condition équivaut à x < −3 ; la borne −3 est exclue.',
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
          why: 'On cherche l’ensemble de définition : tous les réels x pour lesquels l’expression de la fonction est définie dans ℝ. Les conditions portant sur chaque opération doivent être satisfaites simultanément.',
        },
        {
          title: 'Définir le logarithme',
          tex: '\\frac{e^x-1}{e^x+2}>0',
          why: 'Il faut un argument strictement positif, et une fraction définie.',
        },
        {
          title: 'Étudier le signe du dénominateur',
          tex: 'e^x+2>0',
          why: 'Pour tout réel x, eˣ > 0, donc eˣ + 2 > 2 > 0. Le dénominateur est strictement positif et ne s’annule jamais.',
        },
        {
          title: 'Garder le signe du numérateur',
          tex: 'e^x-1>0',
          why: 'Le dénominateur étant strictement positif, le quotient a le signe de son numérateur. Il est strictement positif si et seulement si eˣ − 1 > 0.',
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
          why: 'La stricte croissance de exp donne eˣ > e⁰ si et seulement si x > 0.',
        },
        {
          title: 'Retenir le résultat',
          tex: 'D=]0,+\\infty[',
          why: 'Le dénominateur eˣ + 2 est toujours strictement positif. L’argument du logarithme est strictement positif si et seulement si x > 0 : c’est l’ensemble de définition.',
        },
      ],
      visual: 'substitution',
    },
  ],
  color: 'ochre',
} satisfies Exercise;
