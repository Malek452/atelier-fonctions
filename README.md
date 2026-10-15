# Atelier Fonctions — corrigé animé du TD 2

Présentation pédagogique en français : **12 exercices, 92 corrections justifiées en 1 156 étapes**, d’après le TD de Mathématiques pour les Sciences Naturelles de La Rochelle Université. Toutes les corrections sont directement accessibles, sans compte ni serveur applicatif.

## Lancer et compiler

Node.js 24 et npm :

```bash
npm ci
npm run dev
npm test
npm run build
npm run preview
```

`predev` prépare les géométries mathématiques et compile Motion Canvas. Après une modification du contenu ou des scènes, relancer `npm run build:motion` puis recharger la page. `npm run motion` ouvre l’éditeur d’auteur. `npm run docs` génère le corrigé HTML imprimable et Markdown dans `docs/`.

La compilation crée un site autonome dans `dist/`. Servir ce dossier via HTTP, pas en ouvrant le fichier HTML directement.

## Utilisation

L’URL ouvre directement la première correction. L’application contient uniquement la présentation et ses commandes : aucun accueil, slogan, panneau latéral ou pied de page. La barre supérieure permet de choisir un exercice et une sous-question. Les boutons de question précédente/suivante passent aussi d’un exercice à l’autre. La liste inférieure donne accès à toutes les étapes. La lecture manuelle est privilégiée. Lecture automatique, pause, répétition et vitesse permettent de régler le rythme ; le temps de lecture s’adapte à l’explication. Sur téléphone : glisser vers la gauche pour avancer, vers la droite pour revenir. Le défilement vertical, le zoom à deux doigts et le défilement des longues formules sont préservés. Sur ordinateur : flèches gauche/droite, boutons de navigation et bouton plein écran lorsque le navigateur le permet. La touche Échap quitte le plein écran. Espace contrôle la lecture hors des boutons et champs. Le bouton des animations conserve les formules et les justifications sans animation.

La partie en cours est dorée et soulignée. Les déplacements suivent des rôles mathématiques explicites : facteur distribué, exposant ou terme regroupé. Une substitution ordinaire souligne la partie remplacée, puis montre le résultat complet ; un chiffre ne se transforme pas en une lettre. Le début et la fin inchangés servent de repères lorsque la place le permet. Les nouvelles phases sont nommées dans l’en-tête existant. Une nouvelle affirmation est présentée directement, sans suggérer une équivalence avec la précédente. Revenir en arrière ou choisir une étape affiche son état final ; le bouton de répétition rejoue son animation.

Les 26 multiplications isolent un seul produit à la fois. Les facteurs sont sélectionnés en doré et bleu à leur position réelle ; des copies rejoignent le calcul temporaire sous l’expression, puis le résultat rejoint sa place. La formule complète reste visible. Les 14 regroupements montrent aussi le calcul des coefficients, par exemple `(-1 + 5)x` avant `4x`. Ces calculs partagent le tableau, sans panneau supplémentaire. Les schémas gardent leurs couleurs propres : projection horizontale en doré, projection verticale en bleu.

Les 18 distributions copient le facteur avant de calculer les produits. Les développements de deux parenthèses calculent chacun des quatre produits séparément.

Une animation dispose de dix secondes ; la lecture automatique laisse au moins douze secondes par étape à vitesse normale, davantage pour une explication longue et 2,5 secondes supplémentaires au début d’une phase. Pause, répétition, vitesse et réduction des mouvements restent disponibles.

Les 36 applications des règles de puissances possèdent des mouvements dédiés : les exposants sont repérés en doré et bleu, les bases communes en vert, puis les exposants rejoignent leur somme, différence ou produit. La question 1.4 commence par `(4^0.5)^4 = 4^(0.5 × 4)`. Les calculs de racines montrent les formules générales avant les substitutions, avec un numérateur et un dénominateur calculés séparément. Les domaines f4, f5 et f6 de l’exercice 2 sont détaillés sans modifier leurs résultats ; f6 développe la différence sous la racine cubique et conserve les quatre exclusions.

Les huit activités de l’exercice 3 construisent chacune un tableau de signes selon les conventions françaises : valeurs critiques sur la ligne x, signes dans les intervalles, zéro aux racines, double barre aux valeurs interdites. Chaque ligne se complète de gauche à droite, puis les intervalles et les bornes autorisées sont marqués. Ces tableaux HTML accessibles occupent la même zone que les formules. Ils conservent leur taille sur téléphone et peuvent défiler horizontalement ; le clavier, la pause, la vitesse et le mode sans mouvement restent utilisables.

Il n’y a plus de saisie de réponses, de QCM, d’indices, de validation, de carnet ni de suivi de réussite. Seule la préférence de mouvement est enregistrée dans le navigateur.

## Organisation

- `src/content/exercise-*.ts` : énoncés, corrections et justifications, un fichier par exercice.
- `src/types.ts` : format de contenu.
- `src/components/Lesson.tsx` : présentation et commandes de lecture.
- `src/components/useStepSwipe.ts` : gestes tactiles, avec filtrage du défilement vertical, du zoom et des mouvements accidentels.
- `src/components/focus.ts` : mise en évidence mathématique.
- `src/components/Animation.tsx` : adaptateur et lecture accessible de secours.
- `motion/lesson.ts` : scènes Motion Canvas ; `motion/player.ts` : contrôle de la timeline.
- `scripts/prepare-equations.mjs` et `scripts/math-svg.mjs` : MathJax prépare les caractères, positions et sélections au moment de compiler. Le résultat partagé est régénéré dans `motion/generated/`, sans API externe.
- `motion/geometry.ts` et `motion/EquationLayer.ts` : conservation du contexte inchangé, ancrage, déplacements explicites et substitutions locales.
- `motion/operations.ts` : parcours des facteurs et regroupements, de leur source au résultat.
- `motion/semantic-ranges.ts` et `motion/semantic-operations.ts` : rôles explicites des bases, exposants et facteurs distribués.
- `src/content/quadratic.ts`, `src/content/binomial.ts` et `src/content/domain-steps.ts` : dérivations détaillées et réutilisables.
- `src/content/phase-plan.ts` : changements explicites de phase et de formule, propres à chaque activité.
- `src/content/sign-tables.ts` et `src/components/SignTable.tsx` : contenu des tableaux, export LaTeX et présentation HTML progressive.
- `motion/tex.ts` : protège les groupes LaTeX des annotations des schémas qui utilisent encore le composant `Latex`.
- `tests/` : contenu, mathématiques et navigation en DOM simulé.
- `tests/reference/` : références et outils mathématiques uniquement destinés aux tests, jamais livrés au navigateur.
- `docs/CORRIGE.html` : toutes les corrections, imprimables.
- `public/TD-2-MSN-2025.pdf` : fiche source.

## Déploiement statique

Netlify : commande `npm run build`, dossier publié `dist`. La configuration est dans `netlify.toml`.

GitHub Pages : activer GitHub Actions comme source de déploiement et utiliser `.github/workflows/deploy.yml`. Les chemins relatifs permettent l’hébergement sous un sous-dossier.

Tout autre hébergeur statique : déposer **tout le contenu de `dist/`**, notamment `animations/`, les polices et le PDF. Aucun service de correction ni clé d’API ne sont nécessaires.

Voir `docs/AJOUTER-UN-EXERCICE.md` pour adapter le contenu et `docs/VALIDATION.md` pour les vérifications et limites.
