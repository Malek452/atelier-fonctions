import type { Activity, Exercise, Step } from '../types';

interface Cue {
  at: string;
  phase?: string;
  statement?: boolean;
}
const phase = (at: string, label: string, statement = true): Cue => ({
  at,
  phase: label,
  statement,
});
const reset = (at: string): Cue => ({ at, statement: true });

/** Reviewed teaching boundaries, selected by exact authored title, never by
 * visual similarity or a guessed mathematical equivalence. A reset introduces
 * a different object/case/condition; it must not morph out of the previous one. */
const plans: Record<string, Cue[]> = {
  '1q1': [phase('Lire le résultat', 'Lire la valeur', false)],
  '1q2': [phase('Soustraire l’exposant du dénominateur', 'Effectuer le quotient', false)],
  '1q3': [
    phase('Simplifier la première fraction', 'Premier quotient', false),
    phase('Simplifier la seconde fraction', 'Second quotient', false),
    phase('Calculer la puissance', 'Calculer la valeur', false),
  ],
  '1q4': [
    phase('Écrire 4 avec la base 2', 'Choisir la même base', false),
    phase('Réunir les puissances de même base', 'Multiplier les puissances', false),
    phase('Effectuer le quotient', 'Effectuer le quotient', false),
  ],
  '1q5': [
    phase('Traiter le second facteur', 'Seconde puissance', false),
    phase('Multiplier les deux puissances', 'Réunir les facteurs', false),
  ],
  '1q6': [],
  '1q7': [
    phase('Traiter le numérateur', 'Traiter le numérateur', false),
    phase('Passer au quotient', 'Effectuer le quotient', false),
  ],
  '1q8': [phase('Diviser les puissances', 'Effectuer le quotient', false)],
  '2q1': [],
  '2q2': [phase('Rassembler les deux valeurs', 'Réunir les solutions')],
  '2q3': [
    phase('Séparer les deux possibilités', 'Séparer les deux cas'),
    phase('Résoudre le premier cas', 'Premier facteur nul'),
  ],
  '2q4': [
    phase('Exclure la division par zéro', 'Poser la condition'),
    phase('Multiplier chaque membre par x', 'Éliminer le dénominateur'),
    phase('Distribuer x au premier terme', 'Distribuer sans calculer', false),
    phase('Calculer x × 7x', 'Calculer les produits', false),
  ],
  '2q5': [
    phase('Garder la valeur interdite', 'Poser la condition'),
    phase('Écrire 1 avec le dénominateur x²', 'Réunir les fractions'),
    phase('Contrôler les deux valeurs', 'Vérifier les solutions'),
  ],
  '2q6': [
    phase('Contrôler le premier dénominateur', 'Poser les conditions'),
    reset('Contrôler le second dénominateur'),
    phase('Multiplier par les deux dénominateurs', 'Éliminer les dénominateurs'),
    phase('Distribuer le premier facteur', 'Développer le produit', false),
    phase('Soustraire x des deux côtés', 'Réunir dans un membre', false),
  ],
  '2d1': [phase('Conserver tous les réels', 'Interpréter le résultat')],
  '2d2': [
    phase('Interdire le dénominateur nul', 'Poser la condition'),
    phase('Factoriser le dénominateur', 'Factoriser', false),
    phase('Exclure le zéro du premier facteur', 'Premier facteur'),
    phase('Exclure les zéros du second facteur', 'Second facteur'),
    phase('Réunir les trois exclusions', 'Réunir les conditions'),
  ],
  '2d3': [
    phase('Écrire les deux facteurs', 'Factoriser', false),
    phase('Exclure le premier zéro', 'Premier facteur'),
    phase('Exclure le second zéro', 'Second facteur'),
  ],
  '2d4': [
    phase('Définir la fraction intérieure', 'Fraction intérieure'),
    phase('Interdire le dénominateur extérieur nul', 'Fraction extérieure'),
    phase('Réécrire 7x avec le dénominateur x', 'Réunir les fractions'),
    phase('Traduire la condition de non-annulation', 'Chercher les zéros'),
    phase('Écarter toute autre exclusion', 'Réunir les conditions'),
  ],
  '2d5': [
    phase('Définir les fractions intérieures', 'Fractions intérieures'),
    phase('Interdire le dénominateur extérieur nul', 'Fraction extérieure'),
    phase('Décomposer le terme x', 'Factoriser le numérateur', false),
    phase('Imposer les deux conditions', 'Exclure les zéros'),
    phase('Réunir toutes les exclusions', 'Réunir les conditions'),
  ],
  '2d6': [
    phase('Définir la première fraction', 'Première fraction'),
    phase('Définir la seconde fraction', 'Seconde fraction'),
    phase('Nommer la différence intérieure', 'Racine cubique et inverse'),
    phase('Mettre la première fraction au même dénominateur', 'Réunir les fractions'),
    phase('Distribuer les deux termes du premier facteur', 'Développer le produit', false),
    phase('Calculer x × x', 'Calculer les produits', false),
    phase('Appliquer le signe moins au premier terme', 'Traiter le signe moins', false),
    phase('Regrouper les termes en x', 'Réduire le numérateur', false),
    phase('Chercher les valeurs à exclure', 'Chercher les zéros'),
    phase('Vérifier que 1 n’est pas une nouvelle racine', 'Vérifier les exclusions'),
    phase('Réunir les quatre exclusions', 'Réunir les conditions'),
  ],
  '3q1': [phase('Trouver les zéros', 'Chercher les frontières')],
  '3q2': [
    phase('Exclure zéro', 'Poser la condition'),
    phase('Réunir sur le dénominateur x', 'Réunir les fractions'),
    phase('Étudier le numérateur', 'Signe du numérateur'),
    reset('Déduire son signe'),
  ],
  '3q3': [
    phase('Exclure zéro', 'Poser la condition'),
    phase('Écrire 1 avec le dénominateur x²', 'Réunir les fractions'),
    phase('Factoriser le numérateur', 'Factoriser', false),
    reset('Prendre les signes opposés'),
  ],
  '3q4': [phase('Soustraire x des deux côtés', 'Réunir dans un membre', false)],
  '3d1': [
    phase('Nommer les racines du trinôme', 'Retrouver les zéros'),
    phase('Factoriser le polynôme', 'Préparer les signes'),
    reset('Ordonner les trois zéros'),
  ],
  '3d2': [
    phase('Définir la racine', 'Condition de la racine'),
    phase('Réunir sur le dénominateur x', 'Réunir les fractions', false),
    phase('Étudier le numérateur', 'Signe du numérateur'),
    reset('Déduire son signe'),
  ],
  '3d3': [
    phase('Définir le logarithme', 'Condition du logarithme'),
    phase('Reconnaître une expression opposée', 'Préparer les signes', false),
  ],
  '3d4': [
    phase('Distribuer le premier facteur', 'Développer le produit', false),
    phase('Soustraire x des deux côtés', 'Réunir dans un membre', false),
  ],
  '4q1': [],
  '4q2': [phase('Soustraire l’exposant du dénominateur', 'Effectuer le quotient', false)],
  '4q3': [
    phase('Simplifier la première fraction', 'Premier quotient', false),
    phase('Simplifier la seconde fraction', 'Second quotient', false),
  ],
  '4q4': [
    phase('Traiter la seconde puissance', 'Seconde puissance', false),
    phase('Simplifier le facteur commun', 'Simplifier le quotient', false),
  ],
  '4q5': [
    phase('Traiter le second facteur', 'Seconde puissance', false),
    phase('Multiplier les deux puissances', 'Réunir les facteurs', false),
  ],
  '4q6': [phase('Multiplier les exponentielles', 'Réunir les facteurs', false)],
  '4q7': [
    phase('Soustraire tout l’exposant du bas', 'Effectuer le quotient', false),
    phase('Distribuer le signe moins', 'Réduire l’exposant', false),
  ],
  '4q8': [
    phase('Traiter le premier quotient', 'Premier quotient', false),
    phase('Traiter le second quotient', 'Second quotient', false),
  ],
  '4q9': [
    phase('Multiplier au numérateur', 'Traiter le numérateur', false),
    phase('Effectuer le quotient', 'Effectuer le quotient', false),
  ],
  '4q10': [
    phase('Traiter le second facteur', 'Seconde puissance', false),
    phase('Multiplier les deux puissances', 'Réunir les facteurs', false),
  ],
  '5q1': [phase('Soustraire 1 des deux côtés', 'Isoler x', false)],
  '5q2': [
    phase('Appliquer ln', 'Retrouver l’exposant', false),
    phase('Multiplier les deux côtés par −1', 'Isoler x', false),
  ],
  '5q3': [phase('Écarter le facteur jamais nul', 'Résoudre le facteur restant', false)],
  '5q4': [
    phase('Écarter le facteur jamais nul', 'Résoudre le facteur restant', false),
    phase('Conclure avec le signe de exp', 'Vérifier la possibilité'),
  ],
  '5q5': [phase('Nommer la nouvelle variable', 'Poser X = exp(x)'), reset('Remplacer e²ˣ')],
  '5q6': [
    phase('Changer de variable', 'Poser X = exp(x)'),
    phase('Vérifier la plus petite racine', 'Respecter X > 0'),
    phase('Revenir à x, premier cas', 'Revenir à x : premier cas'),
    phase('Revenir à x, second cas', 'Revenir à x : second cas'),
  ],
  '5q7': [phase('Comparer les exposants', 'Isoler x', false)],
  '5d1': [
    phase('Factoriser', 'Factoriser', false),
    phase('Repérer le facteur toujours positif', 'Premier facteur'),
    phase('Interdire le zéro du second facteur', 'Second facteur'),
  ],
  '5d2': [
    phase('Signer le premier terme', 'Signe du premier terme'),
    phase('Signer le second terme', 'Signe du second terme'),
    phase('Additionner deux positifs', 'Signe de la somme'),
  ],
  '5d3': [
    phase('Changer de variable', 'Poser X = exp(x)'),
    reset('Nommer les deux racines'),
    phase('Lire les zones positives', 'Étudier les signes'),
    phase('Respecter X > 0', 'Respecter la substitution', false),
    phase('Revenir à x', 'Revenir à x', false),
  ],
  '5d4': [
    phase('Mettre eˣ en facteur', 'Factoriser', false),
    phase('Exclure les deux racines en X', 'Exclure les racines'),
    phase('Exprimer les valeurs interdites en x', 'Revenir à x', false),
  ],
  '6q1': [phase('Inclure la borne', 'Contrôler la borne')],
  '6q2': [
    phase('Annuler le premier facteur', 'Zéro du premier facteur'),
    phase('Annuler le second facteur', 'Zéro du second facteur'),
    phase('Signer 4 − 2x', 'Signe du premier facteur'),
    phase('Signer e − eˣ', 'Signe du second facteur'),
    phase('Multiplier les signes', 'Réunir les signes'),
    phase('Inclure les zéros', 'Choisir les intervalles'),
  ],
  '6q3': [phase('Comparer les exposants', 'Isoler x', false)],
  '6q4': [
    phase('Vérifier le signe du dénominateur', 'Autoriser la multiplication'),
    phase('Multiplier les deux membres', 'Isoler l’exponentielle'),
    phase('Comparer les exposants', 'Isoler x', false),
  ],
  '6q5': [
    phase('Signer le dénominateur', 'Signe du dénominateur'),
    phase('Garder le signe du numérateur', 'Signe du numérateur'),
  ],
  '6d1': [phase('Inclure la borne', 'Contrôler la borne')],
  '6d2': [
    phase('Annuler le premier facteur', 'Zéro du premier facteur'),
    phase('Annuler le second facteur', 'Zéro du second facteur'),
    phase('Signer 4 − 2x', 'Signe du premier facteur'),
    phase('Signer e − eˣ', 'Signe du second facteur'),
    phase('Multiplier les signes', 'Réunir les signes'),
    phase('Inclure les zéros', 'Choisir les intervalles'),
  ],
  '6d3': [
    phase('Définir la racine', 'Condition de la racine'),
    phase('Interdire une racine nulle', 'Condition de l’inverse', false),
    phase('Isoler les deux exponentielles', 'Résoudre la condition', false),
  ],
  '6d4': [
    phase('Signer le dénominateur', 'Signe du dénominateur'),
    phase('Garder le signe du numérateur', 'Signe du numérateur'),
  ],
  '7q1': [phase('Regrouper les termes en ln 3', 'Regrouper', false)],
  '7q2': [
    phase('Vérifier les arguments', 'Vérifier les arguments'),
    phase('Réunir la différence', 'Réunir les logarithmes'),
    phase('Reconnaître une différence de carrés', 'Factoriser', false),
  ],
  '7q3': [phase('Séparer le produit positif', 'Utiliser le logarithme', false)],
  '7q4': [phase('Réécrire 32', 'Second logarithme', false)],
  '7q5': [
    phase('Faire entrer le second coefficient', 'Second logarithme', false),
    phase('Réunir les logarithmes', 'Réunir les logarithmes', false),
  ],
  '7q6': [
    phase('Ouvrir le logarithme du produit', 'Second logarithme', false),
    phase('Distribuer −2 au premier terme', 'Distribuer le coefficient', false),
  ],
  '8q1': [
    phase('Poser la condition de définition', 'Poser la condition'),
    phase('Faire entrer le coefficient 5', 'Résoudre l’équation'),
    phase('Vérifier la condition', 'Vérifier la solution'),
  ],
  '8q2': [
    phase('Exiger un argument positif', 'Poser la condition'),
    phase('Comparer les arguments', 'Résoudre l’équation'),
    phase('Vérifier la solution', 'Vérifier la solution'),
  ],
  '8q3': [
    phase('Poser le domaine', 'Poser la condition'),
    phase('Faire apparaître le facteur commun', 'Factoriser'),
    phase('Séparer les cas', 'Séparer les deux cas'),
    phase('Résoudre le premier cas', 'Premier cas'),
    phase('Isoler ln x dans le second cas', 'Second cas'),
  ],
  '8q4': [
    phase('Définir le logarithme', 'Poser les conditions'),
    reset('Éviter un dénominateur nul'),
    phase('Annuler le numérateur', 'Résoudre l’équation'),
    phase('Contrôler le dénominateur', 'Vérifier la solution'),
  ],
  '8d1': [
    reset('Contrôler la constante'),
    phase('Contrôler la différence', 'Vérifier les opérations'),
    reset('Contrôler le cube'),
  ],
  '8d2': [
    phase('Lire l’exposant négatif', 'Comprendre la puissance −2'),
    reset('Interdire la base nulle'),
    phase('Conserver les deux conditions', 'Réunir les conditions'),
  ],
  '8d3': [
    phase('Interdire le dénominateur nul', 'Condition du dénominateur'),
    phase('Factoriser', 'Factoriser', false),
    phase('Exclure le zéro du premier facteur', 'Premier facteur'),
    phase('Exclure le zéro du second facteur', 'Second facteur'),
    phase('Réunir les conditions', 'Réunir les conditions'),
  ],
  '8d4': [
    phase('Interdire seulement le dénominateur nul', 'Condition du dénominateur'),
    phase('Chercher le zéro interdit', 'Chercher la valeur interdite'),
    reset('Exprimer la valeur interdite'),
    phase('Contrôler la valeur qui annule le numérateur', 'Vérifier le numérateur'),
  ],
  '9q1': [
    phase('Définir le premier logarithme', 'Premier logarithme'),
    phase('Définir le second logarithme', 'Second logarithme'),
    reset('Garder la condition la plus forte'),
    phase('Comparer les arguments', 'Résoudre l’inéquation'),
    phase('Croiser avec le domaine', 'Croiser les conditions'),
  ],
  '9q2': [
    phase('Définir le premier logarithme', 'Premier logarithme'),
    phase('Définir le second logarithme', 'Second logarithme'),
    phase('Réunir les logarithmes', 'Résoudre l’inéquation'),
    phase('Distribuer les deux termes', 'Développer le produit', false),
    phase('Lire où le trinôme est négatif', 'Étudier le signe'),
    phase('Respecter aussi x > 3', 'Croiser les conditions'),
  ],
  '9q3': [
    phase('Définir ln x', 'Poser la condition'),
    phase('Diviser par le coefficient positif 2', 'Résoudre l’inéquation'),
  ],
  '9d1': [phase('Définir la racine carrée', 'Condition de la racine')],
  '9d2': [
    phase('Définir le second logarithme', 'Second logarithme'),
    reset('Contrôler le logarithme constant'),
    phase('Prendre les conditions ensemble', 'Réunir les conditions'),
    reset('Contrôler l’exponentielle extérieure'),
  ],
  '9d3': [
    phase('Définir le logarithme extérieur', 'Logarithme extérieur'),
    phase('Retirer les facteurs positifs', 'Résoudre la condition', false),
  ],
  '10q1': [],
  '10q2': [],
  '10q3': [
    phase('Rappeler les limites du cosinus', 'Valeurs possibles du cosinus'),
    phase('Comparer la valeur demandée', 'Tester la valeur demandée'),
    reset('Constater l’impossibilité'),
  ],
  '10q4': [],
  '10q5': [],
  '10q6': [],
  '10q7': [],
  '10q8': [],
  '10d1': [
    phase('Définir le cosinus', 'Domaine du cosinus'),
    phase('Former la différence', 'Vérifier la différence'),
    reset('Conserver le domaine commun'),
  ],
  '10d2': [
    phase('Interdire le dénominateur nul', 'Condition du dénominateur'),
    phase('Trouver les zéros sur un tour', 'Chercher les zéros'),
    phase('Répéter les valeurs interdites', 'Exclure tous les zéros'),
  ],
  '10d3': [
    phase('Lire une hauteur positive', 'Étudier un tour'),
    reset('Exclure les extrémités'),
    phase('Répéter à chaque tour', 'Retrouver tous les tours'),
  ],
  '10d4': [
    phase('Chercher les zéros à exclure', 'Chercher les zéros'),
    phase('Lire les deux angles d’un tour', 'Étudier un tour'),
    phase('Exclure tous les tours correspondants', 'Exclure toutes les familles'),
  ],
  '11q1': [
    phase('Partager le grand côté en deux', 'Observer le pliage'),
    phase('Égaler les deux rapports', 'Traduire la même forme'),
    phase('Reconnaître le rapport r', 'Trouver le rapport', false),
    phase('Vérifier les côtés après pliage', 'Vérifier le modèle'),
  ],
  '12q1': [
    phase('Calculer la vitesse de la Terre', 'Vitesse de la Terre'),
    phase('Calculer la vitesse de la Lune', 'Vitesse de la Lune'),
    phase('Calculer la vitesse de rattrapage', 'Vitesse relative'),
    phase('Écrire la condition d’un tour de rattrapage', 'Trouver la durée'),
    phase('Séparer les 24 heures entières', 'Convertir la durée', false),
    reset('Convertir le reste en minutes'),
    reset('Convertir le dernier tiers en secondes'),
    phase('Ajouter le délai à midi', 'Retrouver l’heure'),
    phase('Distinguer l’autre haute mer du modèle', 'Préciser le modèle'),
  ],
};

const shared: Cue[] = [
  phase('Vérifier les exclusions', 'Vérifier les solutions'),
  phase('Écrire le produit de facteurs', 'Préparer le tableau'),
  phase('Nommer les deux bornes', 'Préparer le tableau'),
  reset('Factoriser avec les deux racines'),
  phase('Rejeter la première racine', 'Respecter X > 0'),
  reset('Garder la racine positive'),
  phase('Remplacer X par eˣ', 'Revenir à x'),
  phase('Identifier les coefficients', 'Identifier le trinôme'),
  phase('Écrire la formule du discriminant', 'Calculer le discriminant'),
  phase('Remplacer Δ sous la racine', 'Calculer la racine de Δ'),
  phase('Écrire la formule de la première racine', 'Calculer la première racine'),
  phase('Écrire la formule de la seconde racine', 'Calculer la seconde racine'),
  phase('Placer les valeurs dans le tableau', 'Construire le tableau de signes'),
  phase('Lire les intervalles à conserver', 'Lire les solutions', false),
  phase('Se placer sur un seul tour', 'Étudier un tour'),
  phase('Repérer le premier angle', 'Premier point du cercle'),
  phase('Repérer le second angle', 'Second point du cercle'),
  phase('Retrouver tous les tours', 'Retrouver tous les tours'),
];

function prepare(activity: Activity, exercise: number): Activity {
  const cues = plans[activity.id];
  if (!cues) throw new Error(`Missing reviewed phase plan for ${activity.id}`);
  for (const cue of cues) {
    if (activity.steps.filter((s) => s.title === cue.at).length !== 1)
      throw new Error(`Ambiguous or missing phase cue: ${activity.id} / ${cue.at}`);
  }
  const isDomain = activity.id.includes('d');
  const firstPhase = isDomain
    ? 'Poser les conditions'
    : [1, 4].includes(exercise)
      ? 'Utiliser les puissances'
      : exercise === 7
        ? 'Utiliser les logarithmes'
        : exercise === 10
          ? 'Lire le cercle'
          : exercise === 11
            ? 'Modéliser le pliage'
            : exercise === 12
              ? 'Comparer les rotations'
              : 'Préparer la résolution';
  const steps = activity.steps.map((original, i): Step => {
    const step = { ...original };
    if (i === 0) step.phase = 'Énoncé';
    if (i === 1 && !step.phase) {
      step.phase = firstPhase;
      if (isDomain) step.statement = true;
    }
    for (const cue of [...shared, ...cues])
      if (cue.at === step.title) {
        if (cue.phase) step.phase = cue.phase;
        if (cue.statement) step.statement = true;
      }
    if (i === activity.steps.length - 1) {
      step.phase = 'Conclusion';
      step.statement = true;
    }
    return step;
  });
  return { ...activity, steps };
}

export const withTeachingPhases = (exercises: Exercise[]): Exercise[] =>
  exercises.map((e) => ({ ...e, activities: e.activities.map((a) => prepare(a, e.id)) }));
