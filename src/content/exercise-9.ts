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
          why: 'Résoudre dans ℝ. Nous allons d’abord poser les conditions utiles, puis détailler le calcul.',
        },
        {
          title: 'Définir le premier logarithme',
          tex: '2+5x>0\\quad\\Longrightarrow\\quad x>-\\frac25',
          why: 'On soustrait 2, puis on divise par 5 qui est positif.',
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
          why: 'Le logarithme est croissant : il conserve l’ordre sur les nombres positifs.',
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
          why: '4 est positif : le sens ne change pas.',
        },
        {
          title: 'Croiser avec le domaine',
          tex: '-\\frac25<x\\le1',
          why: 'On doit respecter à la fois la définition des logarithmes et l’inégalité obtenue.',
        },
        {
          title: 'Retenir le résultat',
          tex: 'S=]-\\tfrac25,1]',
          why: 'S désigne l’ensemble des solutions. On ne conserve que les valeurs compatibles avec l’énoncé et ses conditions de définition.',
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
          why: 'Résoudre dans ℝ. Nous allons d’abord poser les conditions utiles, puis détailler le calcul.',
        },
        {
          title: 'Définir le premier logarithme',
          tex: 'x+1>0\\quad\\Longrightarrow\\quad x>-1',
          why: 'Un argument de logarithme doit être positif.',
        },
        {
          title: 'Définir le second logarithme',
          tex: 'x-3>0\\quad\\Longrightarrow\\quad x>3',
          why: 'Cette condition est plus forte que x > −1. On garde x > 3 pour toute la résolution.',
        },
        {
          title: 'Réunir les logarithmes',
          tex: '\\ln((x+1)(x-3))<\\ln3',
          why: 'Les deux facteurs sont positifs sur le domaine. On utilise ln(a) + ln(b) = ln(ab).',
        },
        {
          title: 'Comparer les arguments',
          tex: '(x+1)(x-3)<3',
          why: 'ln est strictement croissante sur les nombres positifs.',
        },
        {
          title: 'Distribuer les deux termes',
          tex: 'x(x-3)+1(x-3)<3',
          why: 'On multiplie la seconde parenthèse par x, puis par 1.',
        },
        {
          title: 'Multiplier x par x',
          tex: 'x^2+x(-3)+1(x-3)<3',
          why: 'On ne traite que le premier produit : x × x = x².',
          focus: 'x^2',
          product: {
            left: 'x',
            right: 'x',
            result: 'x^2',
          },
          fromFocus: 'x(x-3)',
        },
        {
          title: 'Multiplier x par −3',
          tex: 'x^2-3x+1(x-3)<3',
          why: 'x × (−3) = −3x.',
          focus: '-3x',
          product: {
            left: 'x',
            right: '(-3)',
            result: '-3x',
          },
          fromFocus: 'x(-3)',
        },
        {
          title: 'Multiplier 1 par x',
          tex: 'x^2-3x+x+1(-3)<3',
          why: '1 × x = x.',
          focus: '+x',
          product: {
            left: '1',
            right: 'x',
            result: 'x',
          },
          fromFocus: '1(x-3)',
        },
        {
          title: 'Multiplier 1 par −3',
          tex: 'x^2-3x+x-3<3',
          why: '1 × (−3) = −3.',
          focus: '-3',
          product: {
            left: '1',
            right: '(-3)',
            result: '-3',
          },
          fromFocus: '1(-3)',
        },
        {
          title: 'Regrouper les termes en x',
          tex: 'x^2-2x-3<3',
          why: '−3x + x = (−3 + 1)x = −2x.',
          focus: '-2x',
          collect: {
            left: '-3x',
            right: 'x',
            result: '-2x',
            via: '(-3+1)x',
          },
        },
        {
          title: 'Soustraire 3 des deux membres',
          tex: 'x^2-2x-6<0',
          why: '−3 − 3 = −6.',
        },
        ...quadraticSteps({ a: 1, b: -2, c: -6, roots: ['1-\\sqrt7', '1+\\sqrt7'] }),
        {
          title: 'Lire où le trinôme est négatif',
          tex: '1-\\sqrt7<x<1+\\sqrt7',
          why: 'Le coefficient de x² est positif : le trinôme est négatif entre ses deux racines.',
        },
        {
          title: 'Respecter aussi x > 3',
          tex: '3<x<1+\\sqrt7',
          why: 'La racine inférieure est sous 3 et la racine supérieure au-dessus de 3. On ne garde que la partie compatible avec le domaine.',
        },
        {
          title: 'Retenir le résultat',
          tex: 'S=]3,1+\\sqrt7[',
          why: 'S désigne l’ensemble des solutions. On ne conserve que les valeurs compatibles avec l’énoncé et ses conditions de définition.',
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
          why: 'Résoudre dans ℝ. Nous allons d’abord poser les conditions utiles, puis détailler le calcul.',
        },
        {
          title: 'Définir ln x',
          tex: 'x>0',
          why: 'Cette condition garantit aussi que le dénominateur x est non nul et positif.',
        },
        {
          title: 'Diviser par le coefficient positif 2',
          tex: '\\frac{1+\\ln x}{x}\\ge0',
          why: 'Diviser par 2 ne change pas le sens de l’inégalité.',
        },
        {
          title: 'Multiplier par x positif',
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
          why: 'exp est croissante et exp(ln(x)) = x. La borne e⁻¹ est positive et autorisée.',
        },
        {
          title: 'Retenir le résultat',
          tex: 'S=[e^{-1},+\\infty[',
          why: 'S désigne l’ensemble des solutions. On ne conserve que les valeurs compatibles avec l’énoncé et ses conditions de définition.',
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
          why: 'Déterminer l’ensemble de définition. On cherche toutes les valeurs de x pour lesquelles chaque calcul est possible.',
        },
        {
          title: 'Définir les deux logarithmes',
          tex: '2+5x>0,\\qquad x+6>0',
          why: 'Les deux arguments doivent être strictement positifs.',
        },
        {
          title: 'Croiser les deux conditions',
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
          title: 'Comparer les arguments positifs',
          tex: '2+5x\\ge x+6',
          why: 'ln est croissant : le sens est conservé.',
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
          why: '4 est positif. Ces valeurs respectent toutes x > −2/5.',
        },
        {
          title: 'Retenir le résultat',
          tex: 'D=[1,+\\infty[',
          why: 'Ce domaine regroupe toutes les valeurs autorisées par les conditions précédentes. Une borne ouverte est exclue ; une borne fermée est incluse.',
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
          why: 'Déterminer l’ensemble de définition. On cherche toutes les valeurs de x pour lesquelles chaque calcul est possible.',
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
          title: 'Prendre les conditions ensemble',
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
          why: 'Ce domaine regroupe toutes les valeurs autorisées par les conditions précédentes. Une borne ouverte est exclue ; une borne fermée est incluse.',
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
          why: 'Déterminer l’ensemble de définition. On cherche toutes les valeurs de x pour lesquelles chaque calcul est possible.',
        },
        {
          title: 'Définir le logarithme intérieur',
          tex: 'x>0',
          why: 'Cela garantit aussi que le dénominateur x est positif et non nul.',
        },
        {
          title: 'Définir le logarithme extérieur',
          tex: '2\\frac{1+\\ln x}{x}>0',
          why: 'L’argument entier du logarithme extérieur doit être strictement positif.',
        },
        {
          title: 'Retirer les facteurs positifs',
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
          why: 'exp est croissante. L’inégalité reste stricte : x = e⁻¹ annulerait l’argument du logarithme extérieur.',
        },
        {
          title: 'Retenir le résultat',
          tex: 'D=]e^{-1},+\\infty[',
          why: 'Ce domaine regroupe toutes les valeurs autorisées par les conditions précédentes. Une borne ouverte est exclue ; une borne fermée est incluse.',
        },
      ],
      visual: 'logs',
    },
  ],
  color: 'blue',
} satisfies Exercise;
