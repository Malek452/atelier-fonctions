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
          why: 'Résoudre dans ℝ. Nous allons d’abord poser les conditions utiles, puis détailler le calcul.',
        },
        {
          title: 'Appliquer ln aux deux membres',
          tex: '\\ln(e^{2x+1})=\\ln5',
          why: 'Les deux membres sont positifs. Le logarithme permet de retrouver l’exposant.',
        },
        {
          title: 'Annuler les fonctions inverses',
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
          why: 'Le 2 multiplie x : on divise tout le membre de droite par 2.',
        },
        {
          title: 'Retenir le résultat',
          tex: 'S=\\{\\tfrac{\\ln5-1}2\\}',
          why: 'S désigne l’ensemble des solutions. On ne conserve que les valeurs compatibles avec l’énoncé et ses conditions de définition.',
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
          why: 'Résoudre dans ℝ. Nous allons d’abord poser les conditions utiles, puis détailler le calcul.',
        },
        {
          title: 'Diviser les deux membres par 3',
          tex: 'e^{-x}=\\frac43',
          why: 'On commence par isoler l’exponentielle. Le coefficient 3 devient un diviseur du membre de droite.',
        },
        {
          title: 'Appliquer ln',
          tex: '\\ln(e^{-x})=\\ln(4/3)',
          why: '4/3 est positif : on peut prendre son logarithme.',
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
          why: 'S désigne l’ensemble des solutions. On ne conserve que les valeurs compatibles avec l’énoncé et ses conditions de définition.',
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
          why: 'Résoudre dans ℝ. Nous allons d’abord poser les conditions utiles, puis détailler le calcul.',
        },
        {
          title: 'Réécrire la première exponentielle',
          tex: 'e^x\\cdot e^x-e^x=0',
          why: 'La règle e²ˣ = eˣ × eˣ permet de voir un facteur eˣ dans chaque terme.',
        },
        {
          title: 'Mettre eˣ en facteur',
          tex: 'e^x(e^x-1)=0',
          why: 'On sort le facteur commun eˣ. Les termes restants restent dans la parenthèse.',
        },
        {
          title: 'Écarter le facteur jamais nul',
          tex: 'e^x-1=0',
          why: 'L’exponentielle est strictement positive : eˣ ne peut jamais être zéro. Seule la parenthèse pourrait s’annuler.',
        },
        {
          title: 'Isoler l’exponentielle',
          tex: 'e^x=1',
          why: 'On ajoute 1 aux deux membres.',
        },
        {
          title: 'Conclure avec le signe de exp',
          tex: 'x=0',
          why: '1 = e⁰. Deux exponentielles égales ont le même exposant, donc x = 0.',
        },
        {
          title: 'Retenir le résultat',
          tex: 'S=\\{0\\}',
          why: 'S désigne l’ensemble des solutions. On ne conserve que les valeurs compatibles avec l’énoncé et ses conditions de définition.',
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
          why: 'Résoudre dans ℝ. Nous allons d’abord poser les conditions utiles, puis détailler le calcul.',
        },
        {
          title: 'Réécrire la première exponentielle',
          tex: 'e^x\\cdot e^x+2e^x=0',
          why: 'La règle e²ˣ = eˣ × eˣ permet de voir un facteur eˣ dans chaque terme.',
        },
        {
          title: 'Mettre eˣ en facteur',
          tex: 'e^x(e^x+2)=0',
          why: 'On sort le facteur commun eˣ. Les termes restants restent dans la parenthèse.',
        },
        {
          title: 'Écarter le facteur jamais nul',
          tex: 'e^x+2=0',
          why: 'L’exponentielle est strictement positive : eˣ ne peut jamais être zéro. Seule la parenthèse pourrait s’annuler.',
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
          why: 'S désigne l’ensemble des solutions. On ne conserve que les valeurs compatibles avec l’énoncé et ses conditions de définition.',
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
          why: 'Résoudre dans ℝ. Nous allons d’abord poser les conditions utiles, puis détailler le calcul.',
        },
        {
          title: 'Nommer la nouvelle variable',
          tex: 'X=e^x,\\qquad X>0',
          why: 'La lettre X représente eˣ. Attention : elle ne peut prendre que des valeurs strictement positives.',
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
          why: 'Son numérateur est négatif et son dénominateur est positif. Elle ne peut donc pas représenter eˣ.',
        },
        {
          title: 'Garder la racine positive',
          tex: 'X=\\frac{-3+2\\sqrt{11}}5>0',
          why: 'Comme 2√11 > 3, le numérateur est positif. Cette racine respecte X > 0.',
        },
        {
          title: 'Remplacer X par eˣ',
          tex: 'e^x=\\frac{-3+2\\sqrt{11}}5',
          why: 'On revient maintenant à l’inconnue de départ.',
        },
        {
          title: 'Prendre le logarithme',
          tex: 'x=\\ln\\!\\left(\\frac{-3+2\\sqrt{11}}5\\right)',
          why: 'Le logarithme d’un nombre positif est l’unique exposant qui donne ce nombre.',
        },
        {
          title: 'Retenir le résultat',
          tex: 'S=\\{\\ln(\\frac{-3+2\\sqrt{11}}5)\\}',
          why: 'S désigne l’ensemble des solutions. On ne conserve que les valeurs compatibles avec l’énoncé et ses conditions de définition.',
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
          why: 'Résoudre dans ℝ. Nous allons d’abord poser les conditions utiles, puis détailler le calcul.',
        },
        {
          title: 'Sortir le facteur commun eˣ',
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
          why: 'On remplace eˣ par X, donc e²ˣ par X².',
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
          why: '21 < 25, donc √21 < 5. Même la plus petite racine est positive : on garde les deux.',
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
          why: 'S désigne l’ensemble des solutions. On ne conserve que les valeurs compatibles avec l’énoncé et ses conditions de définition.',
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
          why: 'Résoudre dans ℝ. Nous allons d’abord poser les conditions utiles, puis détailler le calcul.',
        },
        {
          title: 'Ajouter la seconde exponentielle',
          tex: 'e^{-x}=e^{2x-3}',
          why: 'On ajoute e²ˣ⁻³ aux deux membres.',
        },
        {
          title: 'Comparer les exposants',
          tex: '-x=2x-3',
          why: 'La fonction exponentielle prend chaque valeur positive une seule fois. Des exponentielles égales ont donc des exposants égaux.',
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
          why: 'S désigne l’ensemble des solutions. On ne conserve que les valeurs compatibles avec l’énoncé et ses conditions de définition.',
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
          why: 'Déterminer l’ensemble de définition. On cherche toutes les valeurs de x pour lesquelles chaque calcul est possible.',
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
          why: 'exp prend chaque valeur une seule fois : eˣ = e⁰ seulement si x = 0.',
        },
        {
          title: 'Retenir le résultat',
          tex: 'D=\\mathbb R\\setminus\\{0\\}',
          why: 'Ce domaine regroupe toutes les valeurs autorisées par les conditions précédentes. Une borne ouverte est exclue ; une borne fermée est incluse.',
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
          why: 'Déterminer l’ensemble de définition. On cherche toutes les valeurs de x pour lesquelles chaque calcul est possible.',
        },
        {
          title: 'Définir le logarithme',
          tex: 'e^{2x}+2e^x>0',
          why: 'Le logarithme exige un argument strictement positif.',
        },
        {
          title: 'Signer le premier terme',
          tex: 'e^{2x}>0',
          why: 'Une exponentielle est strictement positive pour tout réel x.',
        },
        {
          title: 'Signer le second terme',
          tex: '2e^x>0',
          why: '2 est positif et eˣ est positif : leur produit l’est aussi.',
        },
        {
          title: 'Additionner deux positifs',
          tex: 'e^{2x}+2e^x>0\\quad\\text{pour tout }x\\in\\mathbb R',
          why: 'La condition est automatiquement satisfaite.',
        },
        {
          title: 'Retenir le résultat',
          tex: 'D=\\mathbb R',
          why: 'Ce domaine regroupe toutes les valeurs autorisées par les conditions précédentes. Une borne ouverte est exclue ; une borne fermée est incluse.',
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
          why: 'Déterminer l’ensemble de définition. On cherche toutes les valeurs de x pour lesquelles chaque calcul est possible.',
        },
        {
          title: 'Définir le logarithme',
          tex: '10e^{2x}+12e^x-14>0',
          why: 'On cherche où son argument est strictement positif.',
        },
        {
          title: 'Changer de variable',
          tex: '10X^2+12X-14>0,\\qquad X=e^x>0',
          why: 'On se ramène à un trinôme, sans oublier que X est positif.',
        },
        {
          title: 'Nommer les deux racines',
          tex: '\\alpha=\\frac{-3-2\\sqrt{11}}5<0,\\qquad\\beta=\\frac{-3+2\\sqrt{11}}5>0',
          why: 'Ces racines ont été calculées en 5.5. Le coefficient de X² est positif.',
        },
        {
          title: 'Lire les zones positives',
          tex: 'X<\\alpha\\quad\\text{ou}\\quad X>\\beta',
          why: 'Un trinôme de coefficient dominant positif est positif à l’extérieur de ses deux racines.',
        },
        {
          title: 'Respecter X > 0',
          tex: 'X>\\beta',
          why: 'Le cas X < α impose un nombre négatif et est donc impossible pour eˣ.',
        },
        {
          title: 'Revenir à x',
          tex: 'x>\\ln\\!\\left(\\frac{-3+2\\sqrt{11}}5\\right)',
          why: 'On applique ln, qui est croissant sur les nombres positifs. La borne est exclue car l’argument du logarithme initial y vaut zéro.',
        },
        {
          title: 'Retenir le résultat',
          tex: 'D=]\\ln(\\frac{-3+2\\sqrt{11}}5),+\\infty[',
          why: 'Ce domaine regroupe toutes les valeurs autorisées par les conditions précédentes. Une borne ouverte est exclue ; une borne fermée est incluse.',
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
          why: 'Déterminer l’ensemble de définition. On cherche toutes les valeurs de x pour lesquelles chaque calcul est possible.',
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
          title: 'Retirer le facteur jamais nul',
          tex: 'e^{2x}-5e^x+1\\ne0',
          why: 'eˣ ne peut jamais annuler le dénominateur.',
        },
        {
          title: 'Exclure les deux racines en X',
          tex: 'e^x\\ne\\frac{5-\\sqrt{21}}2,\\qquad e^x\\ne\\frac{5+\\sqrt{21}}2',
          why: 'Le trinôme en X = eˣ a deux racines positives.',
        },
        {
          title: 'Exprimer les valeurs interdites en x',
          tex: 'x\\ne\\ln(\\frac{5-\\sqrt{21}}2),\\qquad x\\ne\\ln(\\frac{5+\\sqrt{21}}2)',
          why: 'On applique ln à chacune des deux égalités interdites.',
        },
        {
          title: 'Retenir le résultat',
          tex: 'D=\\mathbb R\\setminus\\{\\ln(\\frac{5-\\sqrt{21}}2),\\ln(\\frac{5+\\sqrt{21}}2)\\}',
          why: 'Ce domaine regroupe toutes les valeurs autorisées par les conditions précédentes. Une borne ouverte est exclue ; une borne fermée est incluse.',
        },
      ],
      visual: 'substitution',
    },
  ],
  color: 'ochre',
} satisfies Exercise;
