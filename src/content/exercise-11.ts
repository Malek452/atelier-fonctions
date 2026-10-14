import type { Exercise } from '../types';
export default {
  id: 11,
  title: 'Le secret du format A4',
  short: 'Format A4',
  theme: 'Pour aller plus loin',
  level: 'Modélisation',
  minutes: 10,
  description: 'Pourquoi un rectangle peut-il garder ses proportions quand on le plie en deux ?',
  objectives: ['Traduire la similitude en équation', 'Distinguer rapport et dimensions'],
  prerequisites: ['Rapports', 'Équation du second degré'],
  activities: [
    {
      id: '11q1',
      label: 'Question 1',
      prompt:
        'Une feuille de côtés a et b conserve ses proportions une fois pliée en deux. Déterminer r = b/a, avec a ≤ b.',
      tex: '0<a\\le b,\\qquad r=\\frac ba',
      result: 'r=\\sqrt2',
      steps: [
        {
          title: 'Lire l’énoncé',
          tex: '0<a\\le b,\\qquad r=\\frac ba',
          why: 'Une feuille de côtés a et b conserve ses proportions une fois pliée en deux. Déterminer r = b/a, avec a ≤ b. Nous allons d’abord poser les conditions utiles, puis détailler le calcul.',
        },
        {
          title: 'Nommer le rapport',
          tex: 'r=\\frac ba>0',
          why: 'a est le petit côté et b le grand côté. On compare les formes grâce au rapport grand côté / petit côté.',
        },
        {
          title: 'Partager le grand côté en deux',
          tex: 'a\\times b\\longrightarrow (b/2)\\times a',
          why: 'Le pli partage b en deux et conserve a. Après rotation, on compare le rapport a/(b/2) au rapport initial b/a.',
          diagram: 'fold',
        },
        {
          title: 'Égaler les deux rapports',
          tex: '\\frac ba=\\frac{a}{b/2}',
          why: 'Conserver la même forme signifie conserver le même rapport entre les côtés correspondants.',
        },
        {
          title: 'Diviser par une fraction',
          tex: '\\frac ba=\\frac{2a}{b}',
          why: 'Diviser par b/2 revient à multiplier par 2/b.',
        },
        {
          title: 'Multiplier par b',
          tex: '\\frac{b^2}{a}=2a',
          why: 'b est une longueur positive. On peut multiplier les deux membres par b.',
        },
        {
          title: 'Multiplier par a',
          tex: 'b^2=2a^2',
          why: 'On supprime le dénominateur a, lui aussi positif.',
        },
        {
          title: 'Diviser par a²',
          tex: '\\frac{b^2}{a^2}=2',
          why: 'a² est non nul. Le membre de gauche est le carré de b/a.',
        },
        {
          title: 'Reconnaître le rapport r',
          tex: 'r^2=2',
          why: 'Puisque r = b/a, son carré vaut b²/a².',
        },
        {
          title: 'Choisir la racine positive',
          tex: 'r=\\sqrt2\\approx1.4142',
          why: 'Les deux racines de r² = 2 sont ±√2. Un rapport de longueurs est positif : on garde √2.',
        },
        {
          title: 'Vérifier les côtés après pliage',
          tex: '1<\\sqrt2<2\\quad\\Longrightarrow\\quad b/2<a<b',
          why: 'Cela confirme que le côté a devient le grand côté après pliage. La forme est fixée, mais pas la taille absolue.',
        },
        {
          title: 'Retenir le résultat',
          tex: 'r=\\sqrt2',
          why: 'Ce résultat découle des hypothèses de l’énoncé et du modèle explicité dans les étapes.',
        },
      ],
      visual: 'fold',
      note: 'Coquille de la fiche : lire 21 × 29,7 cm (ou 210 × 297 mm), et non 21 × 29,7 mm. Le rapport des dimensions arrondies n’est pas exactement √2.',
    },
  ],
  color: 'sage',
} satisfies Exercise;
