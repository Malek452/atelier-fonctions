import type { Exercise } from '../types';
export default {
  id: 12,
  title: 'Retrouver l’alignement',
  short: 'La marée',
  theme: 'Pour aller plus loin',
  level: 'Modélisation',
  minutes: 15,
  description:
    'Une course angulaire entre la Terre et la Lune. Distinguer les conséquences d’un modèle et une prévision physique.',
  objectives: ['Calculer une vitesse relative', 'Expliciter les hypothèses du modèle'],
  prerequisites: ['Proportionnalité', 'Conversions heures/minutes'],
  activities: [
    {
      id: '12q1',
      label: 'Question 1',
      prompt:
        'La Terre tourne en 24 h, la Lune en 28 jours. Une haute mer a lieu à midi. Dans le modèle proposé, quel délai, en heures, sépare deux hautes mers homologues ? En déduire l’heure demain.',
      tex: 'T_{\\mathrm T}=24\\,h,\\qquad T_{\\mathrm L}=28\\times24\\,h',
      result: 'T=\\frac{224}{9}\\,h=24\\,h\\ 53\\,min\\ 20\\,s',
      steps: [
        {
          title: 'Lire l’énoncé',
          tex: 'T_{\\mathrm T}=24\\,h,\\qquad T_{\\mathrm L}=28\\times24\\,h',
          why: 'On utilise le modèle de l’énoncé : deux rotations uniformes dans le même sens, de périodes 24 h et 28 jours. On cherche le délai entre deux retours au même alignement, puis l’heure de la haute mer correspondante.',
        },
        {
          title: 'Convertir les jours en heures',
          tex: 'T_{\\mathrm L}=28\\times24=672\\,h',
          why: 'Pour comparer les deux rotations, on utilise la même unité : l’heure.',
        },
        {
          title: 'Calculer la vitesse de la Terre',
          tex: '\\omega_{\\mathrm T}=\\frac1{24}\\ \\mathrm{tour}/h',
          why: 'Un tour en 24 heures signifie 1/24 de tour chaque heure, dans ce modèle uniforme.',
        },
        {
          title: 'Calculer la vitesse de la Lune',
          tex: '\\omega_{\\mathrm L}=\\frac1{672}\\ \\mathrm{tour}/h',
          why: 'Un tour en 672 heures signifie 1/672 de tour par heure.',
        },
        {
          title: 'Calculer la vitesse de rattrapage',
          tex: '\\omega_{\\mathrm{rel}}=\\frac1{24}-\\frac1{672}',
          why: 'Les rotations sont supposées dans le même sens : on soustrait les vitesses pour mesurer l’avance relative.',
        },
        {
          title: 'Mettre au même dénominateur',
          tex: '\\omega_{\\mathrm{rel}}=\\frac{28}{672}-\\frac1{672}',
          why: 'Comme 672 = 28 × 24, on multiplie le numérateur et le dénominateur de 1/24 par 28. Ce facteur non nul conserve la valeur de la fraction.',
        },
        {
          title: 'Soustraire les numérateurs',
          tex: '\\omega_{\\mathrm{rel}}=\\frac{27}{672}\\ \\mathrm{tour}/h',
          why: '28 − 1 = 27. Le dénominateur commun reste 672.',
        },
        {
          title: 'Écrire la condition d’un tour de rattrapage',
          tex: '\\frac{27}{672}T=1',
          why: 'Pour une rotation uniforme, vitesse relative × durée = nombre de tours gagnés. Le premier retour au même alignement correspond à un tour d’avance relative, d’où (27/672)T = 1.',
        },
        {
          title: 'Isoler la durée',
          tex: 'T=\\frac{672}{27}=\\frac{224}{9}\\,h',
          why: 'On divise par 27/672, puis on simplifie le numérateur et le dénominateur par 3.',
        },
        {
          title: 'Séparer les 24 heures entières',
          tex: 'T=24+\\frac89\\,h',
          why: '24 × 9 = 216 et 224 − 216 = 8. Il reste 8/9 d’heure après une journée.',
        },
        {
          title: 'Convertir le reste en minutes',
          tex: '\\frac89\\times60=\\frac{160}{3}=53+\\frac13\\,min',
          why: 'Une heure contient 60 minutes. Le reste vaut 53 minutes et un tiers de minute.',
        },
        {
          title: 'Convertir le dernier tiers en secondes',
          tex: '\\frac13\\times60=20\\,s',
          why: 'Une minute contient 60 secondes : son tiers vaut 20 secondes.',
        },
        {
          title: 'Ajouter le délai à midi',
          tex: '\\text{Demain : }12\\,h\\ 53\\,min\\ 20\\,s',
          why: 'Après 24 heures, il est de nouveau midi. On ajoute ensuite 53 minutes et 20 secondes. Cela concerne la haute mer homologue dans le modèle précisé.',
        },
        {
          title: 'Distinguer l’autre haute mer du modèle',
          tex: 'T/2=12\\,h\\ 26\\,min\\ 40\\,s',
          why: 'Si le modèle retient deux hautes mers par cycle, l’autre surviendrait demain à 00 h 26 min 40 s. Ce calcul ne prédit pas la marée réelle.',
        },
        {
          title: 'Retenir le résultat',
          tex: 'T=\\frac{224}{9}\\,h=24\\,h\\ 53\\,min\\ 20\\,s',
          why: 'Dans ce modèle, un tour d’avance relative prend exactement 224/9 heures. À partir de midi, le retour au même alignement a donc lieu le lendemain à 12 h 53 min 20 s.',
        },
      ],
      visual: 'tide',
      note: 'L’énoncé ne distingue pas les deux hautes mers possibles. On calcule ici celle homologue à midi, avec rotations uniformes dans le même sens. Ce modèle n’est pas une prévision réelle de marée à La Pallice.',
    },
  ],
  color: 'sage',
} satisfies Exercise;
