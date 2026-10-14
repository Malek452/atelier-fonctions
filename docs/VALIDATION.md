# Vérifications — transformations mathématiques

Exécution locale : TypeScript strict ; 261 tests réussis sous le lanceur natif Node.

- Conservation exacte des 92 énoncés et résultats par rapport à la fiche de référence ; 1 080 étapes.
- Rendu KaTeX et MathJax des formules et mises en évidence. Protection conservée contre le conflit `{{...}}` du composant `Latex` de Motion Canvas. Le tableau principal utilise désormais des caractères vectoriels préparés à la compilation et ne passe plus par cette segmentation.
- Comparaison des caractères visibles de chaque expression préparée avec son rendu MathJax sans marquage : aucune lettre, aucun signe, aucune fraction perdus. Les espaces sans tracé restent représentés par les positions des caractères suivants. Les accents français sont convertis en accents vectoriels.
- Géométrie des 1 080 étapes : coordonnées et échelles finies, sélections visibles, limites du cadre et conservation des positions lors du changement de sélection. La base 7 reste fixe pendant l’assemblage et la simplification de ses exposants ; l’exposant du dénominateur rejoint bien la zone supérieure.
- Les 26 multiplications et 14 regroupements possèdent deux sélections sources distinctes et un emplacement de résultat. Vérification numérique des produits et des sommes, du calcul intermédiaire des coefficients, et des développements partiels. Les correspondances de caractères conservent l’ordre des occurrences.
- Contrôles numériques indépendants des simplifications, racines, intervalles et modèles. Ces échantillonnages complètent les justifications analytiques, sans les remplacer. Contrôle des angles et projections trigonométriques.
- Contrôle des 36 règles de puissances : scopes, bases distinctes des exposants, opération correcte et équivalence de chaque transformation. Chaque étape de 1.4 vaut 64.
- Substitution indépendante dans chaque formule symbolique et numérique des racines, y compris les coefficients négatifs et les radicaux non entiers. Vérification de toutes les fractions et de chaque développement de l’argument de f6 ; vérification du domaine f4 et de la factorisation de f5.
- Cinq modèles de tableaux réutilisés dans les huit activités de l’exercice 3 : ordre des valeurs critiques, signes sur chaque intervalle, zéros, double barre aux pôles, choix des intervalles et inclusion des seules bornes permises. Tests DOM du remplissage progressif, des explications associées et du défilement au clavier.
- La géométrie non marquée est la référence unique : changer une sélection ne peut modifier ni les caractères, ni les espacements, ni la largeur d’une barre de fraction.
- Images des géométries préparées, rendues en SVG puis rasterisées : calcul d’un exposant, développement d’un produit, regroupement de termes en x et regroupement de logarithmes. Inspection des sources, du calcul temporaire, de l’étape intermédiaire et du résultat replacé dans l’expression. Ces images contrôlent les positions clés et la lisibilité ; elles ne sont pas des captures du lecteur Canvas en fonctionnement.
- Navigation en DOM simulé : boutons, liens directs, clavier, pause, répétition, préférence de mouvement, plein écran substitué, gestes tactiles et conservation du défilement des longues formules. La lecture automatique attend au moins dix secondes et laisse se terminer les animations de huit secondes.

Les outils de vérification algébrique se trouvent uniquement dans `tests/reference/`. L’application distribuée ne contient ni moteur de correction des réponses, ni collecte de données étudiantes.

La compilation React et Motion Canvas est vérifiée avant publication. Aucun contrôle dans un navigateur réel n’est disponible ici : les tests et images intermédiaires ne certifient pas la fluidité du Canvas sur téléphone ni le comportement réel des gestes tactiles. La validation mathématique de fond et les notes sur les ambiguïtés du PDF restent celles du corrigé intégral.
