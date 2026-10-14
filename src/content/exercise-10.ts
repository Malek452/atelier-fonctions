import type { Exercise } from '../types';
export default {
  id: 10,
  title: 'Explorer le cercle',
  short: 'Trigonométrie',
  theme: 'Pour aller plus loin',
  level: 'Intermédiaire',
  minutes: 25,
  description:
    'Visualiser les abscisses et ordonnées du cercle unité, puis décrire toutes les solutions.',
  objectives: ['Résoudre des équations trigonométriques', 'Exprimer des familles périodiques'],
  prerequisites: ['Radians', 'Angles remarquables'],
  activities: [
    {
      id: '10q1',
      label: 'Question 1',
      prompt: 'Résoudre dans ℝ.',
      tex: '\\cos x=0',
      result: 'x=\\tfrac\\pi2+k\\pi',
      steps: [
        {
          title: 'Lire l’énoncé',
          tex: '\\cos x=0',
          why: 'Résoudre dans ℝ. Nous allons d’abord poser les conditions utiles, puis détailler le calcul.',
        },
        {
          title: 'Lire la coordonnée cherchée',
          tex: '\\cos x=0',
          why: 'Le cosinus est l’abscisse : on cherche les deux points dont la coordonnée horizontale vaut zéro.',
        },
        {
          title: 'Se placer sur un seul tour',
          tex: '0\\le x<2\\pi',
          why: 'Les angles sont en radians. Un tour complet vaut 2π radians, soit 360 degrés.',
        },
        {
          title: 'Repérer le premier angle',
          tex: '\\cos(\\pi/2)=0',
          why: 'On lit une valeur remarquable du cercle trigonométrique.',
          circle: {
            angle: 1.5707963267948966,
            label: '\\cos(\\pi/2)=0',
            axis: 'cos',
          },
        },
        {
          title: 'Repérer le second angle',
          tex: '\\cos(3\\pi/2)=0',
          why: 'Un second point du cercle possède la même coordonnée. Il donne une autre solution.',
          circle: {
            angle: 4.71238898038469,
            label: '\\cos(3\\pi/2)=0',
            axis: 'cos',
          },
        },
        {
          title: 'Retrouver tous les tours',
          tex: 'x=\\theta+2k\\pi,\\qquad k\\in\\mathbb Z',
          why: 'À partir d’un angle solution θ, ajouter ou retirer un nombre entier de tours ne change pas le point. k peut valoir 0, 1, −1, 2, −2, etc.',
        },
        {
          title: 'Réunir les deux familles',
          tex: 'x=\\tfrac\\pi2+k\\pi',
          why: 'Les deux angles sont espacés de π. Une seule formule, avec un pas de π, décrit donc les deux familles.',
        },
        {
          title: 'Retenir le résultat',
          tex: 'x=\\tfrac\\pi2+k\\pi,\\quad k\\in\\mathbb Z',
          why: 'k est un entier quelconque, positif, nul ou négatif. Cette écriture contient toutes les solutions, sur tous les tours.',
        },
      ],
      visual: 'trig',
    },
    {
      id: '10q2',
      label: 'Question 2',
      prompt: 'Résoudre dans ℝ.',
      tex: '\\sin x=0',
      result: 'x=k\\pi',
      steps: [
        {
          title: 'Lire l’énoncé',
          tex: '\\sin x=0',
          why: 'Résoudre dans ℝ. Nous allons d’abord poser les conditions utiles, puis détailler le calcul.',
        },
        {
          title: 'Lire la coordonnée cherchée',
          tex: '\\sin x=0',
          why: 'Le sinus est l’ordonnée : on cherche les deux points dont la coordonnée verticale vaut zéro.',
        },
        {
          title: 'Se placer sur un seul tour',
          tex: '0\\le x<2\\pi',
          why: 'Les angles sont en radians. Un tour complet vaut 2π radians, soit 360 degrés.',
        },
        {
          title: 'Repérer le premier angle',
          tex: '\\sin(0)=0',
          why: 'On lit une valeur remarquable du cercle trigonométrique.',
          circle: {
            angle: 0,
            label: '\\sin(0)=0',
            axis: 'sin',
          },
        },
        {
          title: 'Repérer le second angle',
          tex: '\\sin(\\pi)=0',
          why: 'Un second point du cercle possède la même coordonnée. Il donne une autre solution.',
          circle: {
            angle: 3.141592653589793,
            label: '\\sin(\\pi)=0',
            axis: 'sin',
          },
        },
        {
          title: 'Retrouver tous les tours',
          tex: 'x=\\theta+2k\\pi,\\qquad k\\in\\mathbb Z',
          why: 'À partir d’un angle solution θ, ajouter ou retirer un nombre entier de tours ne change pas le point. k peut valoir 0, 1, −1, 2, −2, etc.',
        },
        {
          title: 'Réunir les deux familles',
          tex: 'x=k\\pi',
          why: 'Les deux angles sont espacés de π. Une seule formule, avec un pas de π, décrit donc les deux familles.',
        },
        {
          title: 'Retenir le résultat',
          tex: 'x=k\\pi,\\quad k\\in\\mathbb Z',
          why: 'k est un entier quelconque, positif, nul ou négatif. Cette écriture contient toutes les solutions, sur tous les tours.',
        },
      ],
      visual: 'trig',
    },
    {
      id: '10q3',
      label: 'Question 3',
      prompt: 'Résoudre dans ℝ.',
      tex: '\\cos x=\\pi',
      result: '\\varnothing',
      steps: [
        {
          title: 'Lire l’énoncé',
          tex: '\\cos x=\\pi',
          why: 'Résoudre dans ℝ. Nous allons d’abord poser les conditions utiles, puis détailler le calcul.',
        },
        {
          title: 'Rappeler les limites du cosinus',
          tex: '-1\\le\\cos x\\le1',
          why: 'Sur le cercle unité, une abscisse reste toujours entre −1 et 1.',
        },
        {
          title: 'Comparer la valeur demandée',
          tex: '\\pi\\approx3.14>1',
          why: 'Ici π est la valeur demandée pour le cosinus, pas une mesure d’angle à placer sur le cercle.',
        },
        {
          title: 'Constater l’impossibilité',
          tex: '\\cos x\\ne\\pi\\quad\\text{pour tout }x\\in\\mathbb R',
          why: 'Aucun cosinus ne peut atteindre un nombre supérieur à 1.',
        },
        {
          title: 'Retenir le résultat',
          tex: 'S=\\varnothing',
          why: 'S désigne l’ensemble des solutions. On ne conserve que les valeurs compatibles avec l’énoncé et ses conditions de définition.',
        },
      ],
      visual: 'trig',
    },
    {
      id: '10q4',
      label: 'Question 4',
      prompt: 'Résoudre dans ℝ.',
      tex: '\\sin x=\\tfrac12',
      result: 'x=\\tfrac\\pi6+2k\\pi\\;\\text{ou}\\;\\tfrac{5\\pi}6+2k\\pi',
      steps: [
        {
          title: 'Lire l’énoncé',
          tex: '\\sin x=\\tfrac12',
          why: 'Résoudre dans ℝ. Nous allons d’abord poser les conditions utiles, puis détailler le calcul.',
        },
        {
          title: 'Lire la coordonnée cherchée',
          tex: '\\sin x=1/2',
          why: 'Le sinus est l’ordonnée. La hauteur 1/2 est atteinte une fois à droite, une fois à gauche du cercle.',
        },
        {
          title: 'Se placer sur un seul tour',
          tex: '0\\le x<2\\pi',
          why: 'Les angles sont en radians. Un tour complet vaut 2π radians, soit 360 degrés.',
        },
        {
          title: 'Repérer le premier angle',
          tex: '\\sin(\\pi/6)=1/2',
          why: 'On lit une valeur remarquable du cercle trigonométrique.',
          circle: {
            angle: 0.5235987755982988,
            label: '\\sin(\\pi/6)=1/2',
            axis: 'sin',
          },
        },
        {
          title: 'Repérer le second angle',
          tex: '\\sin(5\\pi/6)=1/2',
          why: 'Un second point du cercle possède la même coordonnée. Il donne une autre solution.',
          circle: {
            angle: 2.6179938779914944,
            label: '\\sin(5\\pi/6)=1/2',
            axis: 'sin',
          },
        },
        {
          title: 'Retrouver tous les tours',
          tex: 'x=\\theta+2k\\pi,\\qquad k\\in\\mathbb Z',
          why: 'À partir d’un angle solution θ, ajouter ou retirer un nombre entier de tours ne change pas le point. k peut valoir 0, 1, −1, 2, −2, etc.',
        },
        {
          title: 'Retenir le résultat',
          tex: 'x=\\tfrac\\pi6+2k\\pi\\;\\text{ou}\\;\\tfrac{5\\pi}6+2k\\pi,\\quad k\\in\\mathbb Z',
          why: 'k est un entier quelconque, positif, nul ou négatif. Cette écriture contient toutes les solutions, sur tous les tours.',
        },
      ],
      visual: 'trig',
    },
    {
      id: '10q5',
      label: 'Question 5',
      prompt: 'Résoudre dans ℝ.',
      tex: '\\cos x=-\\tfrac{\\sqrt2}2',
      result: 'x=\\tfrac{3\\pi}4+2k\\pi\\;\\text{ou}\\;\\tfrac{5\\pi}4+2k\\pi',
      steps: [
        {
          title: 'Lire l’énoncé',
          tex: '\\cos x=-\\tfrac{\\sqrt2}2',
          why: 'Résoudre dans ℝ. Nous allons d’abord poser les conditions utiles, puis détailler le calcul.',
        },
        {
          title: 'Lire la coordonnée cherchée',
          tex: '\\cos x=-\\sqrt2/2',
          why: 'Le cosinus est l’abscisse. La coordonnée négative −√2/2 est atteinte en haut à gauche et en bas à gauche.',
        },
        {
          title: 'Se placer sur un seul tour',
          tex: '0\\le x<2\\pi',
          why: 'Les angles sont en radians. Un tour complet vaut 2π radians, soit 360 degrés.',
        },
        {
          title: 'Repérer le premier angle',
          tex: '\\cos(3\\pi/4)=-\\sqrt2/2',
          why: 'On lit une valeur remarquable du cercle trigonométrique.',
          circle: {
            angle: 2.356194490192345,
            label: '\\cos(3\\pi/4)=-\\sqrt2/2',
            axis: 'cos',
          },
        },
        {
          title: 'Repérer le second angle',
          tex: '\\cos(5\\pi/4)=-\\sqrt2/2',
          why: 'Un second point du cercle possède la même coordonnée. Il donne une autre solution.',
          circle: {
            angle: 3.9269908169872414,
            label: '\\cos(5\\pi/4)=-\\sqrt2/2',
            axis: 'cos',
          },
        },
        {
          title: 'Retrouver tous les tours',
          tex: 'x=\\theta+2k\\pi,\\qquad k\\in\\mathbb Z',
          why: 'À partir d’un angle solution θ, ajouter ou retirer un nombre entier de tours ne change pas le point. k peut valoir 0, 1, −1, 2, −2, etc.',
        },
        {
          title: 'Retenir le résultat',
          tex: 'x=\\tfrac{3\\pi}4+2k\\pi\\;\\text{ou}\\;\\tfrac{5\\pi}4+2k\\pi,\\quad k\\in\\mathbb Z',
          why: 'k est un entier quelconque, positif, nul ou négatif. Cette écriture contient toutes les solutions, sur tous les tours.',
        },
      ],
      visual: 'trig',
    },
    {
      id: '10q6',
      label: 'Question 6',
      prompt: 'Résoudre dans ℝ.',
      tex: '\\sin x=\\tfrac{\\sqrt2}2',
      result: 'x=\\tfrac\\pi4+2k\\pi\\;\\text{ou}\\;\\tfrac{3\\pi}4+2k\\pi',
      steps: [
        {
          title: 'Lire l’énoncé',
          tex: '\\sin x=\\tfrac{\\sqrt2}2',
          why: 'Résoudre dans ℝ. Nous allons d’abord poser les conditions utiles, puis détailler le calcul.',
        },
        {
          title: 'Lire la coordonnée cherchée',
          tex: '\\sin x=\\sqrt2/2',
          why: 'Le sinus est l’ordonnée. La hauteur positive √2/2 est atteinte dans les deux quarts supérieurs.',
        },
        {
          title: 'Se placer sur un seul tour',
          tex: '0\\le x<2\\pi',
          why: 'Les angles sont en radians. Un tour complet vaut 2π radians, soit 360 degrés.',
        },
        {
          title: 'Repérer le premier angle',
          tex: '\\sin(\\pi/4)=\\sqrt2/2',
          why: 'On lit une valeur remarquable du cercle trigonométrique.',
          circle: {
            angle: 0.7853981633974483,
            label: '\\sin(\\pi/4)=\\sqrt2/2',
            axis: 'sin',
          },
        },
        {
          title: 'Repérer le second angle',
          tex: '\\sin(3\\pi/4)=\\sqrt2/2',
          why: 'Un second point du cercle possède la même coordonnée. Il donne une autre solution.',
          circle: {
            angle: 2.356194490192345,
            label: '\\sin(3\\pi/4)=\\sqrt2/2',
            axis: 'sin',
          },
        },
        {
          title: 'Retrouver tous les tours',
          tex: 'x=\\theta+2k\\pi,\\qquad k\\in\\mathbb Z',
          why: 'À partir d’un angle solution θ, ajouter ou retirer un nombre entier de tours ne change pas le point. k peut valoir 0, 1, −1, 2, −2, etc.',
        },
        {
          title: 'Retenir le résultat',
          tex: 'x=\\tfrac\\pi4+2k\\pi\\;\\text{ou}\\;\\tfrac{3\\pi}4+2k\\pi,\\quad k\\in\\mathbb Z',
          why: 'k est un entier quelconque, positif, nul ou négatif. Cette écriture contient toutes les solutions, sur tous les tours.',
        },
      ],
      visual: 'trig',
    },
    {
      id: '10q7',
      label: 'Question 7',
      prompt: 'Résoudre dans ℝ.',
      tex: '\\sin x=1',
      result: 'x=\\tfrac\\pi2+2k\\pi',
      steps: [
        {
          title: 'Lire l’énoncé',
          tex: '\\sin x=1',
          why: 'Résoudre dans ℝ. Nous allons d’abord poser les conditions utiles, puis détailler le calcul.',
        },
        {
          title: 'Lire la coordonnée cherchée',
          tex: '\\sin x=1',
          why: 'La hauteur maximale du cercle unité est 1, atteinte uniquement au sommet.',
        },
        {
          title: 'Se placer sur un seul tour',
          tex: '0\\le x<2\\pi',
          why: 'Les angles sont en radians. Un tour complet vaut 2π radians, soit 360 degrés.',
        },
        {
          title: 'Repérer le premier angle',
          tex: '\\sin(\\pi/2)=1',
          why: 'On lit une valeur remarquable du cercle trigonométrique.',
          circle: {
            angle: 1.5707963267948966,
            label: '\\sin(\\pi/2)=1',
            axis: 'sin',
          },
        },
        {
          title: 'Retrouver tous les tours',
          tex: 'x=\\theta+2k\\pi,\\qquad k\\in\\mathbb Z',
          why: 'À partir d’un angle solution θ, ajouter ou retirer un nombre entier de tours ne change pas le point. k peut valoir 0, 1, −1, 2, −2, etc.',
        },
        {
          title: 'Retenir le résultat',
          tex: 'x=\\tfrac\\pi2+2k\\pi,\\quad k\\in\\mathbb Z',
          why: 'k est un entier quelconque, positif, nul ou négatif. Cette écriture contient toutes les solutions, sur tous les tours.',
        },
      ],
      visual: 'trig',
    },
    {
      id: '10q8',
      label: 'Question 8',
      prompt: 'Résoudre dans ℝ.',
      tex: '\\cos x=-1',
      result: 'x=\\pi+2k\\pi',
      steps: [
        {
          title: 'Lire l’énoncé',
          tex: '\\cos x=-1',
          why: 'Résoudre dans ℝ. Nous allons d’abord poser les conditions utiles, puis détailler le calcul.',
        },
        {
          title: 'Lire la coordonnée cherchée',
          tex: '\\cos x=-1',
          why: 'L’abscisse minimale du cercle unité est −1, atteinte uniquement au point le plus à gauche.',
        },
        {
          title: 'Se placer sur un seul tour',
          tex: '0\\le x<2\\pi',
          why: 'Les angles sont en radians. Un tour complet vaut 2π radians, soit 360 degrés.',
        },
        {
          title: 'Repérer le premier angle',
          tex: '\\cos(\\pi)=-1',
          why: 'On lit une valeur remarquable du cercle trigonométrique.',
          circle: {
            angle: 3.141592653589793,
            label: '\\cos(\\pi)=-1',
            axis: 'cos',
          },
        },
        {
          title: 'Retrouver tous les tours',
          tex: 'x=\\theta+2k\\pi,\\qquad k\\in\\mathbb Z',
          why: 'À partir d’un angle solution θ, ajouter ou retirer un nombre entier de tours ne change pas le point. k peut valoir 0, 1, −1, 2, −2, etc.',
        },
        {
          title: 'Retenir le résultat',
          tex: 'x=\\pi+2k\\pi,\\quad k\\in\\mathbb Z',
          why: 'k est un entier quelconque, positif, nul ou négatif. Cette écriture contient toutes les solutions, sur tous les tours.',
        },
      ],
      visual: 'trig',
    },
    {
      id: '10d1',
      label: 'Domaine de f1',
      prompt: 'Déterminer l’ensemble de définition.',
      tex: 'f_1(x)=\\sin x-\\cos x',
      result: '\\mathbb R',
      steps: [
        {
          title: 'Lire l’énoncé',
          tex: 'f_1(x)=\\sin x-\\cos x',
          why: 'Déterminer l’ensemble de définition. On cherche toutes les valeurs de x pour lesquelles chaque calcul est possible.',
        },
        {
          title: 'Définir le sinus',
          tex: 'D_{\\sin}=\\mathbb R',
          why: 'Le sinus est défini pour tout angle réel.',
        },
        {
          title: 'Définir le cosinus',
          tex: 'D_{\\cos}=\\mathbb R',
          why: 'Le cosinus est aussi défini pour tout angle réel.',
        },
        {
          title: 'Former la différence',
          tex: '\\sin x-\\cos x\\in\\mathbb R',
          why: 'Soustraire deux nombres réels n’introduit aucune valeur interdite.',
        },
        {
          title: 'Conserver le domaine commun',
          tex: '\\mathbb R\\cap\\mathbb R=\\mathbb R',
          why: 'Le symbole ∩ signifie qu’on garde les valeurs autorisées par les deux expressions.',
        },
        {
          title: 'Retenir le résultat',
          tex: 'D=\\mathbb R',
          why: 'Ce domaine regroupe toutes les valeurs autorisées par les conditions précédentes. Une borne ouverte est exclue ; une borne fermée est incluse.',
        },
      ],
      visual: 'trig',
    },
    {
      id: '10d2',
      label: 'Domaine de f2',
      prompt: 'Déterminer l’ensemble de définition.',
      tex: 'f_2(x)=\\frac{\\cos x}{\\sin x}',
      result: '\\mathbb R\\setminus\\{k\\pi:k\\in\\mathbb Z\\}',
      steps: [
        {
          title: 'Lire l’énoncé',
          tex: 'f_2(x)=\\frac{\\cos x}{\\sin x}',
          why: 'Déterminer l’ensemble de définition. On cherche toutes les valeurs de x pour lesquelles chaque calcul est possible.',
        },
        {
          title: 'Vérifier les fonctions usuelles',
          tex: '\\sin x,\\ \\cos x\\text{ sont définis pour tout }x\\in\\mathbb R',
          why: 'Le seul problème peut venir de la division.',
        },
        {
          title: 'Interdire le dénominateur nul',
          tex: '\\sin x\\ne0',
          why: 'Le sinus est au dénominateur : il ne peut pas valoir zéro.',
        },
        {
          title: 'Trouver les zéros sur un tour',
          tex: 'x=0\\quad\\text{ou}\\quad x=\\pi\\pmod{2\\pi}',
          why: 'Le sinus est la hauteur sur le cercle. Elle est nulle à droite et à gauche.',
        },
        {
          title: 'Répéter les valeurs interdites',
          tex: 'x\\ne k\\pi,\\qquad k\\in\\mathbb Z',
          why: 'Les zéros sont espacés d’un demi-tour, soit π radians. On retire tous les multiples entiers de π.',
        },
        {
          title: 'Retenir le résultat',
          tex: 'D=\\mathbb R\\setminus\\{k\\pi:k\\in\\mathbb Z\\}',
          why: 'Ce domaine regroupe toutes les valeurs autorisées par les conditions précédentes. Une borne ouverte est exclue ; une borne fermée est incluse.',
        },
      ],
      visual: 'trig',
    },
    {
      id: '10d3',
      label: 'Domaine de f3',
      prompt: 'Déterminer l’ensemble de définition.',
      tex: 'f_3(x)=\\ln(\\sin x)+5',
      result: '\\bigcup_{k\\in\\mathbb Z}]2k\\pi,(2k+1)\\pi[',
      steps: [
        {
          title: 'Lire l’énoncé',
          tex: 'f_3(x)=\\ln(\\sin x)+5',
          why: 'Déterminer l’ensemble de définition. On cherche toutes les valeurs de x pour lesquelles chaque calcul est possible.',
        },
        {
          title: 'Définir le logarithme',
          tex: '\\sin x>0',
          why: 'Le sinus doit être strictement positif, pas seulement défini.',
        },
        {
          title: 'Lire une hauteur positive',
          tex: '0<x<\\pi',
          why: 'Sur un tour, le sinus est positif dans la moitié supérieure du cercle.',
        },
        {
          title: 'Exclure les extrémités',
          tex: '\\sin0=\\sin\\pi=0',
          why: 'Le logarithme de zéro n’existe pas. Les deux bornes restent ouvertes.',
        },
        {
          title: 'Répéter à chaque tour',
          tex: '2k\\pi<x<(2k+1)\\pi,\\qquad k\\in\\mathbb Z',
          why: 'On ajoute 2kπ aux deux bornes pour retrouver tous les tours.',
        },
        {
          title: 'Comprendre la réunion',
          tex: '\\cdots\\cup]-2\\pi,-\\pi[\\cup]0,\\pi[\\cup]2\\pi,3\\pi[\\cup\\cdots',
          why: 'Le domaine réunit tous ces intervalles ouverts. Le +5 extérieur n’ajoute aucune restriction.',
        },
        {
          title: 'Retenir le résultat',
          tex: 'D=\\bigcup_{k\\in\\mathbb Z}]2k\\pi,(2k+1)\\pi[',
          why: 'Ce domaine regroupe toutes les valeurs autorisées par les conditions précédentes. Une borne ouverte est exclue ; une borne fermée est incluse.',
        },
      ],
      visual: 'trig',
    },
    {
      id: '10d4',
      label: 'Domaine de f4',
      prompt: 'Déterminer l’ensemble de définition.',
      tex: 'f_4(x)=\\frac{2\\sin x+4\\cos x}{2\\sin x-1}',
      result: '\\mathbb R\\setminus\\{\\pi/6+2k\\pi,5\\pi/6+2k\\pi:k\\in\\mathbb Z\\}',
      steps: [
        {
          title: 'Lire l’énoncé',
          tex: 'f_4(x)=\\frac{2\\sin x+4\\cos x}{2\\sin x-1}',
          why: 'Déterminer l’ensemble de définition. On cherche toutes les valeurs de x pour lesquelles chaque calcul est possible.',
        },
        {
          title: 'Repérer l’unique restriction',
          tex: '2\\sin x-1\\ne0',
          why: 'Les sinus et cosinus sont définis partout. Le numérateur peut valoir zéro ; le dénominateur ne le peut pas.',
        },
        {
          title: 'Chercher les zéros à exclure',
          tex: '2\\sin x=1',
          why: 'Pour trouver les valeurs interdites, on résout d’abord l’équation du dénominateur nul.',
        },
        {
          title: 'Diviser par 2',
          tex: '\\sin x=\\frac12',
          why: 'C’est l’équation de la question 10.4.',
        },
        {
          title: 'Lire les deux angles d’un tour',
          tex: 'x=\\pi/6\\quad\\text{ou}\\quad x=5\\pi/6\\pmod{2\\pi}',
          why: 'Le cercle a deux points de hauteur 1/2.',
        },
        {
          title: 'Exclure tous les tours correspondants',
          tex: 'x\\ne\\pi/6+2k\\pi,\\quad x\\ne5\\pi/6+2k\\pi,\\quad k\\in\\mathbb Z',
          why: 'Il faut retirer ces deux familles, et conserver tous les autres réels.',
        },
        {
          title: 'Retenir le résultat',
          tex: 'D=\\mathbb R\\setminus\\{\\pi/6+2k\\pi,5\\pi/6+2k\\pi:k\\in\\mathbb Z\\}',
          why: 'Ce domaine regroupe toutes les valeurs autorisées par les conditions précédentes. Une borne ouverte est exclue ; une borne fermée est incluse.',
        },
      ],
      visual: 'trig',
    },
  ],
  color: 'sage',
} satisfies Exercise;
