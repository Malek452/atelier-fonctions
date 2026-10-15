import type { Exercise } from '../types';
import { quadraticSteps } from './quadratic';
export default {
  id: 5,
  title: 'Changer de variable',
  short: 'Équations exponentielles',
  theme: 'Exponentielle',
  level: 'Approfondissement',
  minutes: 30,
  description:
    'Une équation exponentielle cache parfois un trinôme. Le changement de variable doit toujours conserver X > 0.',
  objectives: ['Utiliser l’injectivité de exp', 'Résoudre un trinôme en eˣ'],
  prerequisites: ['Équations du second degré', 'Logarithme comme réciproque'],
  activities: [
    {
      id: '5q1',
      label: 'Question 1',
      prompt: 'Résoudre dans ℝ.',
      tex: 'e^{2x+1}=5',
      result: '\\{\\tfrac{\\ln5-1}2\\}',
      steps: [
        {
          title: 'Lire l’énoncé',
          tex: 'e^{2x+1}=5',
          why: 'L’équation est définie pour tout réel x. Comme e^(2x + 1) et 5 sont strictement positifs, on pourra appliquer le logarithme népérien aux deux membres.',
        },
        {
          title: 'Appliquer ln aux deux membres',
          tex: '\\ln(e^{2x+1})=\\ln5',
          why: 'Les deux membres sont strictement positifs. Comme ln est injective sur ]0, +∞[, appliquer ln aux deux membres donne une équation équivalente.',
        },
        {
          title: 'Utiliser la réciprocité de ln et exp',
          tex: '2x+1=\\ln5',
          why: 'Pour tout réel u, ln(eᵘ) = u.',
        },
        {
          title: 'Soustraire 1 des deux côtés',
          tex: '2x=\\ln5-1',
          why: 'On fait la même soustraction dans les deux membres pour conserver l’égalité.',
        },
        {
          title: 'Diviser les deux membres par 2',
          tex: 'x=\\frac{\\ln5-1}2',
          why: 'On divise les deux membres par 2, qui est non nul : 2x/2 = x et le membre de droite entier devient (ln(5) − 1)/2.',
        },
        {
          title: 'Retenir le résultat',
          tex: 'S=\\{\\tfrac{\\ln5-1}2\\}',
          why: 'Les transformations sont équivalentes : ln est injective sur ]0, +∞[ et la division par 2 est réversible. La valeur obtenue est donc l’unique solution réelle.',
        },
      ],
      visual: 'substitution',
    },
    {
      id: '5q2',
      label: 'Question 2',
      prompt: 'Résoudre dans ℝ.',
      tex: '3e^{-x}=4',
      result: '\\{\\ln(3/4)\\}',
      steps: [
        {
          title: 'Lire l’énoncé',
          tex: '3e^{-x}=4',
          why: 'L’équation est définie sur ℝ. On isolera e^(−x), puis on utilisera le logarithme népérien pour déterminer x.',
        },
        {
          title: 'Diviser les deux membres par 3',
          tex: 'e^{-x}=\\frac43',
          why: 'On divise les deux membres par 3, qui est non nul : 3e^(−x)/3 = e^(−x) et 4/3 reste à droite. L’équation obtenue est équivalente.',
        },
        {
          title: 'Appliquer ln',
          tex: '\\ln(e^{-x})=\\ln(4/3)',
          why: 'e^(−x) et 4/3 sont strictement positifs. L’injectivité de ln sur ]0, +∞[ autorise à appliquer ln aux deux membres par équivalence.',
        },
        {
          title: 'Retrouver l’exposant',
          tex: '-x=\\ln(4/3)',
          why: 'ln(eᵘ) = u, ici avec u = −x.',
        },
        {
          title: 'Multiplier les deux côtés par −1',
          tex: 'x=-\\ln(4/3)',
          why: 'On change le signe des deux membres pour isoler x.',
        },
        {
          title: 'Écrire le logarithme de l’inverse',
          tex: 'x=\\ln(3/4)',
          why: 'La règle −ln(a) = ln(1/a), valable pour a > 0, donne cette autre écriture exacte.',
        },
        {
          title: 'Retenir le résultat',
          tex: 'S=\\{\\ln(3/4)\\}',
          why: 'Pour tout A > 0, l’équation eᵘ = A équivaut à u = ln(A). Avec u = −x et A = 4/3, on obtient l’unique solution x = −ln(4/3) = ln(3/4).',
        },
      ],
      visual: 'substitution',
    },
    {
      id: '5q3',
      label: 'Question 3',
      prompt: 'Résoudre dans ℝ.',
      tex: 'e^{2x}-e^x=0',
      result: '\\{0\\}',
      steps: [
        {
          title: 'Lire l’énoncé',
          tex: 'e^{2x}-e^x=0',
          why: 'Les exponentielles sont définies sur ℝ. On factorisera par eˣ, qui est strictement positif et ne s’annule donc jamais.',
        },
        {
          title: 'Réécrire la première exponentielle',
          tex: 'e^x\\cdot e^x-e^x=0',
          why: 'La règle e²ˣ = eˣ × eˣ permet de voir un facteur eˣ dans chaque terme.',
        },
        {
          title: 'Mettre eˣ en facteur',
          tex: 'e^x(e^x-1)=0',
          why: 'On utilise la distributivité pour mettre le facteur commun eˣ en facteur. L’identité obtenue est valable pour tout réel x.',
        },
        {
          title: 'Diviser par le facteur non nul eˣ',
          tex: 'e^x-1=0',
          why: 'Pour tout réel x, eˣ > 0. On peut donc diviser les deux membres par eˣ ; le produit est nul si et seulement si le facteur entre parenthèses est nul.',
        },
        {
          title: 'Isoler l’exponentielle',
          tex: 'e^x=1',
          why: 'On ajoute 1 aux deux membres.',
        },
        {
          title: 'Utiliser l’injectivité de exp',
          tex: 'x=0',
          why: 'La fonction exp est strictement croissante, donc injective : eᵘ = eᵛ si et seulement si u = v. Comme 1 = e⁰, on obtient x = 0.',
        },
        {
          title: 'Retenir le résultat',
          tex: 'S=\\{0\\}',
          why: 'Puisque eˣ ≠ 0, l’équation initiale équivaut à eˣ = 1, puis à x = 0. Cette valeur est l’unique solution.',
        },
      ],
      visual: 'substitution',
    },
    {
      id: '5q4',
      label: 'Question 4',
      prompt: 'Résoudre dans ℝ.',
      tex: 'e^{2x}+2e^x=0',
      result: '\\varnothing',
      steps: [
        {
          title: 'Lire l’énoncé',
          tex: 'e^{2x}+2e^x=0',
          why: 'Les exponentielles sont définies sur ℝ. On factorisera par eˣ, puis on vérifiera si le second facteur peut être nul.',
        },
        {
          title: 'Réécrire la première exponentielle',
          tex: 'e^x\\cdot e^x+2e^x=0',
          why: 'La règle e²ˣ = eˣ × eˣ permet de voir un facteur eˣ dans chaque terme.',
        },
        {
          title: 'Mettre eˣ en facteur',
          tex: 'e^x(e^x+2)=0',
          why: 'On utilise la distributivité pour mettre le facteur commun eˣ en facteur. L’identité obtenue est valable pour tout réel x.',
        },
        {
          title: 'Diviser par le facteur non nul eˣ',
          tex: 'e^x+2=0',
          why: 'Pour tout réel x, eˣ > 0. On peut donc diviser les deux membres par eˣ ; le produit est nul si et seulement si le facteur entre parenthèses est nul.',
        },
        {
          title: 'Isoler l’exponentielle',
          tex: 'e^x=-2',
          why: 'On soustrait 2 aux deux membres.',
        },
        {
          title: 'Conclure avec le signe de exp',
          tex: 'e^x>0\\quad\\text{mais}\\quad -2<0',
          why: 'Une exponentielle ne peut pas être négative. Cette égalité est impossible dans les réels.',
        },
        {
          title: 'Retenir le résultat',
          tex: 'S=\\varnothing',
          why: 'L’équation initiale imposerait eˣ = −2, alors que eˣ > 0 pour tout réel x. Elle n’a donc aucune solution réelle.',
        },
      ],
      visual: 'substitution',
    },
    {
      id: '5q5',
      label: 'Question 5',
      prompt: 'Résoudre dans ℝ.',
      tex: '10e^{2x}+12e^x-14=0',
      result: '\\{\\ln(\\frac{-3+2\\sqrt{11}}5)\\}',
      steps: [
        {
          title: 'Lire l’énoncé',
          tex: '10e^{2x}+12e^x-14=0',
          why: 'L’équation est définie sur ℝ. On posera X = eˣ pour obtenir une équation du second degré, en conservant la condition X > 0.',
        },
        {
          title: 'Nommer la nouvelle variable',
          tex: 'X=e^x,\\qquad X>0',
          why: 'On pose X = eˣ. L’exponentielle réalise une bijection de ℝ sur ]0, +∞[ : X doit être strictement positif et chaque X > 0 correspond à l’unique réel x = ln(X).',
        },
        {
          title: 'Remplacer e²ˣ',
          tex: '10X^2+12X-14=0',
          why: 'e²ˣ = (eˣ)², donc il devient X². Le terme eˣ devient X.',
        },
        {
          title: 'Diviser chaque terme par 2',
          tex: '5X^2+6X-7=0',
          why: 'On simplifie les coefficients en divisant les deux membres par 2.',
        },
        ...quadraticSteps({
          a: 5,
          b: 6,
          c: -7,
          roots: ['\\frac{-3-2\\sqrt{11}}5', '\\frac{-3+2\\sqrt{11}}5'],
          variable: 'X',
        }),
        {
          title: 'Rejeter la première racine',
          tex: '\\frac{-3-2\\sqrt{11}}5<0',
          why: 'Le numérateur −3 − 2√11 est strictement négatif et le dénominateur 5 strictement positif. Cette racine est donc strictement négative et ne peut pas être égale à eˣ.',
        },
        {
          title: 'Garder la racine positive',
          tex: 'X=\\frac{-3+2\\sqrt{11}}5>0',
          why: 'Les deux nombres 2√11 et 3 sont positifs, et leurs carrés vérifient 44 > 9. Ainsi 2√11 > 3 : le numérateur est strictement positif et la racine respecte X > 0.',
        },
        {
          title: 'Remplacer X par eˣ',
          tex: 'e^x=\\frac{-3+2\\sqrt{11}}5',
          why: 'On revient maintenant à l’inconnue de départ.',
        },
        {
          title: 'Prendre le logarithme',
          tex: 'x=\\ln\\!\\left(\\frac{-3+2\\sqrt{11}}5\\right)',
          why: 'Pour tout A > 0, eˣ = A si et seulement si x = ln(A), car ln est la fonction réciproque de exp. La racine conservée est strictement positive.',
        },
        {
          title: 'Retenir le résultat',
          tex: 'S=\\{\\ln(\\frac{-3+2\\sqrt{11}}5)\\}',
          why: 'Une seule racine du trinôme est strictement positive. Elle correspond à un unique réel x par x = ln(X) : on obtient ainsi l’unique solution de l’équation initiale.',
        },
      ],
      visual: 'substitution',
    },
    {
      id: '5q6',
      label: 'Question 6',
      prompt: 'Résoudre dans ℝ.',
      tex: 'e^{3x}-5e^{2x}+e^x=0',
      result: '\\{\\ln(\\frac{5-\\sqrt{21}}2),\\ln(\\frac{5+\\sqrt{21}}2)\\}',
      steps: [
        {
          title: 'Lire l’énoncé',
          tex: 'e^{3x}-5e^{2x}+e^x=0',
          why: 'L’équation est définie sur ℝ. On factorisera par eˣ, puis on posera X = eˣ ; seules les racines strictement positives en X pourront convenir.',
        },
        {
          title: 'Mettre le facteur commun eˣ en facteur',
          tex: 'e^x(e^{2x}-5e^x+1)=0',
          why: 'e³ˣ = eˣ × e²ˣ, −5e²ˣ = eˣ × (−5eˣ) et eˣ = eˣ × 1.',
        },
        {
          title: 'Utiliser le facteur non nul',
          tex: 'e^{2x}-5e^x+1=0',
          why: 'On peut diviser par eˣ puisqu’il est toujours strictement positif.',
        },
        {
          title: 'Changer de variable',
          tex: 'X^2-5X+1=0,\\qquad X=e^x>0',
          why: 'On pose X = eˣ > 0, donc e^(2x) = X². Chaque valeur X > 0 correspond à un unique réel x = ln(X), ce qui permettra de revenir à l’inconnue initiale.',
        },
        ...quadraticSteps({
          a: 1,
          b: -5,
          c: 1,
          variable: 'X',
          roots: ['\\frac{5-\\sqrt{21}}2', '\\frac{5+\\sqrt{21}}2'],
        }),
        {
          title: 'Vérifier la plus petite racine',
          tex: '0<\\sqrt{21}<5\\quad\\Longrightarrow\\quad\\frac{5-\\sqrt{21}}2>0',
          why: 'La racine carrée est strictement croissante sur [0, +∞[. Comme 0 < 21 < 25, on a 0 < √21 < 5 : les deux racines (5 − √21)/2 et (5 + √21)/2 sont strictement positives.',
        },
        {
          title: 'Revenir à x, premier cas',
          tex: 'x=\\ln\\!\\left(\\frac{5-\\sqrt{21}}2\\right)',
          why: 'Dans le premier cas, on applique ln à eˣ = (5 − √21)/2.',
        },
        {
          title: 'Revenir à x, second cas',
          tex: 'x=\\ln\\!\\left(\\frac{5+\\sqrt{21}}2\\right)',
          why: 'On applique la même opération à la seconde racine positive.',
        },
        {
          title: 'Retenir le résultat',
          tex: 'S=\\{\\ln(\\frac{5-\\sqrt{21}}2),\\ln(\\frac{5+\\sqrt{21}}2)\\}',
          why: 'Les deux racines en X sont strictement positives et distinctes. Chacune correspond à un unique réel x = ln(X) ; ces deux valeurs sont exactement les solutions recherchées.',
        },
      ],
      visual: 'substitution',
    },
    {
      id: '5q7',
      label: 'Question 7',
      prompt: 'Résoudre dans ℝ.',
      tex: 'e^{-x}-e^{2x-3}=0',
      result: '\\{1\\}',
      steps: [
        {
          title: 'Lire l’énoncé',
          tex: 'e^{-x}-e^{2x-3}=0',
          why: 'Les deux exponentielles sont définies sur ℝ. On les isolera dans les deux membres, puis on utilisera l’injectivité de exp : des images égales ont des antécédents égaux.',
        },
        {
          title: 'Ajouter la seconde exponentielle',
          tex: 'e^{-x}=e^{2x-3}',
          why: 'On ajoute e²ˣ⁻³ aux deux membres.',
        },
        {
          title: 'Comparer les exposants',
          tex: '-x=2x-3',
          why: 'La fonction exp est strictement croissante sur ℝ, donc injective. Pour tous réels u et v, eᵘ = eᵛ si et seulement si u = v ; on peut donc égaler les exposants.',
        },
        {
          title: 'Soustraire 2x des deux côtés',
          tex: '-3x=-3',
          why: '−x − 2x = −3x.',
        },
        {
          title: 'Diviser par −3',
          tex: 'x=1',
          why: '−3 divisé par −3 vaut 1.',
        },
        {
          title: 'Retenir le résultat',
          tex: 'S=\\{1\\}',
          why: 'Par injectivité de exp, l’équation initiale équivaut à −x = 2x − 3. Cette équation du premier degré possède l’unique solution x = 1.',
        },
      ],
      visual: 'substitution',
    },
    {
      id: '5d1',
      label: 'Domaine de f1',
      prompt: 'Déterminer l’ensemble de définition.',
      tex: 'f_1(x)=\\frac5{e^{2x}-e^x}',
      result: '\\mathbb R\\setminus\\{0\\}',
      steps: [
        {
          title: 'Lire l’énoncé',
          tex: 'f_1(x)=\\frac5{e^{2x}-e^x}',
          why: 'On cherche l’ensemble de définition : tous les réels x pour lesquels l’expression de la fonction est définie dans ℝ. Les conditions portant sur chaque opération doivent être satisfaites simultanément.',
        },
        {
          title: 'Interdire le dénominateur nul',
          tex: 'e^{2x}-e^x\\ne0',
          why: 'Le numérateur 5 n’impose pas de condition.',
        },
        {
          title: 'Factoriser',
          tex: 'e^x(e^x-1)\\ne0',
          why: 'e²ˣ = eˣ × eˣ, donc eˣ est commun aux deux termes.',
        },
        {
          title: 'Repérer le facteur toujours positif',
          tex: 'e^x>0',
          why: 'Ce facteur n’annule jamais le produit.',
        },
        {
          title: 'Interdire le zéro du second facteur',
          tex: 'e^x\\ne1=e^0',
          why: 'Il faut que eˣ − 1 ne soit pas nul.',
        },
        {
          title: 'Comparer les exposants',
          tex: 'x\\ne0',
          why: 'Par injectivité de exp, eˣ = e⁰ si et seulement si x = 0. La condition eˣ ≠ 1 équivaut donc à x ≠ 0.',
        },
        {
          title: 'Retenir le résultat',
          tex: 'D=\\mathbb R\\setminus\\{0\\}',
          why: 'Le dénominateur eˣ(eˣ − 1) s’annule exactement pour x = 0. La fonction est définie pour tous les autres réels.',
        },
      ],
      visual: 'substitution',
    },
    {
      id: '5d2',
      label: 'Domaine de f2',
      prompt: 'Déterminer l’ensemble de définition.',
      tex: 'f_2(x)=\\ln(e^{2x}+2e^x)',
      result: '\\mathbb R',
      steps: [
        {
          title: 'Lire l’énoncé',
          tex: 'f_2(x)=\\ln(e^{2x}+2e^x)',
          why: 'On cherche l’ensemble de définition : tous les réels x pour lesquels l’expression de la fonction est définie dans ℝ. Les conditions portant sur chaque opération doivent être satisfaites simultanément.',
        },
        {
          title: 'Définir le logarithme',
          tex: 'e^{2x}+2e^x>0',
          why: 'Le logarithme exige un argument strictement positif.',
        },
        {
          title: 'Étudier le signe du premier terme',
          tex: 'e^{2x}>0',
          why: 'Une exponentielle est strictement positive pour tout réel x.',
        },
        {
          title: 'Étudier le signe du second terme',
          tex: '2e^x>0',
          why: '2 > 0 et eˣ > 0 pour tout réel x. Le produit 2eˣ est donc strictement positif sur ℝ.',
        },
        {
          title: 'Additionner deux termes strictement positifs',
          tex: 'e^{2x}+2e^x>0\\quad\\text{pour tout }x\\in\\mathbb R',
          why: 'La somme de deux réels strictement positifs est strictement positive. L’argument du logarithme est donc strictement positif pour tout réel x.',
        },
        {
          title: 'Retenir le résultat',
          tex: 'D=\\mathbb R',
          why: 'La somme e^(2x) + 2eˣ est strictement positive pour tout réel x. Son logarithme est donc défini sur tout ℝ.',
        },
      ],
      visual: 'substitution',
    },
    {
      id: '5d3',
      label: 'Domaine de f3',
      prompt: 'Déterminer l’ensemble de définition.',
      tex: 'f_3(x)=\\ln(10e^{2x}+12e^x-14)',
      result: ']\\ln(\\frac{-3+2\\sqrt{11}}5),+\\infty[',
      steps: [
        {
          title: 'Lire l’énoncé',
          tex: 'f_3(x)=\\ln(10e^{2x}+12e^x-14)',
          why: 'On cherche l’ensemble de définition : tous les réels x pour lesquels l’expression de la fonction est définie dans ℝ. Les conditions portant sur chaque opération doivent être satisfaites simultanément.',
        },
        {
          title: 'Définir le logarithme',
          tex: '10e^{2x}+12e^x-14>0',
          why: 'On cherche où son argument est strictement positif.',
        },
        {
          title: 'Changer de variable',
          tex: '10X^2+12X-14>0,\\qquad X=e^x>0',
          why: 'On pose X = eˣ, donc X > 0 et e^(2x) = X². On étudie le trinôme uniquement pour X > 0, puis on reviendra à x = ln(X).',
        },
        {
          title: 'Nommer les deux racines',
          tex: '\\alpha=\\frac{-3-2\\sqrt{11}}5<0,\\qquad\\beta=\\frac{-3+2\\sqrt{11}}5>0',
          why: 'Ces deux racines ont été calculées en 5.5. On a α < 0 < β et 10X² + 12X − 14 = 10(X − α)(X − β).',
        },
        {
          title: 'Lire les zones positives',
          tex: 'X<\\alpha\\quad\\text{ou}\\quad X>\\beta',
          why: 'Comme 10 > 0 et α < β, le produit 10(X − α)(X − β) est strictement positif exactement pour X < α ou X > β. Les racines sont exclues.',
        },
        {
          title: 'Respecter X > 0',
          tex: 'X>\\beta',
          why: 'Le cas X < α impose un nombre négatif et est donc impossible pour eˣ.',
        },
        {
          title: 'Revenir à x',
          tex: 'x>\\ln\\!\\left(\\frac{-3+2\\sqrt{11}}5\\right)',
          why: 'β > 0 et ln est strictement croissante sur ]0, +∞[ : eˣ > β équivaut à x > ln(β). L’égalité est exclue car elle annule l’argument du logarithme initial.',
        },
        {
          title: 'Retenir le résultat',
          tex: 'D=]\\ln(\\frac{-3+2\\sqrt{11}}5),+\\infty[',
          why: 'L’argument du logarithme est strictement positif exactement lorsque x dépasse la borne indiquée. À cette borne il vaut 0, ce qui explique son exclusion.',
        },
      ],
      visual: 'substitution',
    },
    {
      id: '5d4',
      label: 'Domaine de f4',
      prompt: 'Déterminer l’ensemble de définition.',
      tex: 'f_4(x)=\\frac{e^x}{e^{3x}-5e^{2x}+e^x}',
      result: '\\mathbb R\\setminus\\{\\ln(\\frac{5-\\sqrt{21}}2),\\ln(\\frac{5+\\sqrt{21}}2)\\}',
      steps: [
        {
          title: 'Lire l’énoncé',
          tex: 'f_4(x)=\\frac{e^x}{e^{3x}-5e^{2x}+e^x}',
          why: 'On cherche l’ensemble de définition : tous les réels x pour lesquels l’expression de la fonction est définie dans ℝ. Les conditions portant sur chaque opération doivent être satisfaites simultanément.',
        },
        {
          title: 'Interdire le dénominateur nul',
          tex: 'e^{3x}-5e^{2x}+e^x\\ne0',
          why: 'Même si une simplification est possible ensuite, on part des restrictions de l’expression initiale.',
        },
        {
          title: 'Mettre eˣ en facteur',
          tex: 'e^x(e^{2x}-5e^x+1)\\ne0',
          why: 'On retrouve le produit étudié en 5.6.',
        },
        {
          title: 'Diviser par le facteur non nul eˣ',
          tex: 'e^{2x}-5e^x+1\\ne0',
          why: 'Comme eˣ > 0, le produit eˣ(e²ˣ − 5eˣ + 1) est non nul si et seulement si son second facteur est non nul.',
        },
        {
          title: 'Exclure les deux racines en X',
          tex: 'e^x\\ne\\frac{5-\\sqrt{21}}2,\\qquad e^x\\ne\\frac{5+\\sqrt{21}}2',
          why: 'Le trinôme X² − 5X + 1 a exactement les deux racines indiquées, toutes deux strictement positives. On les exclut pour que le dénominateur soit non nul.',
        },
        {
          title: 'Exprimer les valeurs interdites en x',
          tex: 'x\\ne\\ln(\\frac{5-\\sqrt{21}}2),\\qquad x\\ne\\ln(\\frac{5+\\sqrt{21}}2)',
          why: 'Pour A > 0, eˣ = A équivaut à x = ln(A). Les deux racines étant strictement positives, leurs logarithmes sont exactement les deux valeurs interdites de x.',
        },
        {
          title: 'Retenir le résultat',
          tex: 'D=\\mathbb R\\setminus\\{\\ln(\\frac{5-\\sqrt{21}}2),\\ln(\\frac{5+\\sqrt{21}}2)\\}',
          why: 'Les deux valeurs exclues sont exactement les zéros du dénominateur. Les exponentielles étant définies sur ℝ, aucune autre restriction n’est nécessaire.',
        },
      ],
      visual: 'substitution',
    },
  ],
  color: 'ochre',
} satisfies Exercise;
