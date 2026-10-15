# Ajouter une correction détaillée

Créer un fichier `src/content/exercise-N.ts` conforme à `Exercise` et l’importer dans `src/content/index.ts`. Conserver des identifiants uniques : `Nq1` pour une question, `Nd1` pour un domaine. La barre de navigation et les passages entre exercices sont générés depuis ce tableau. Ajouter aussi l’identifiant de l’activité dans `src/content/phase-plan.ts`, même avec un tableau vide si aucun changement de phase intermédiaire n’est nécessaire. Les repères de phase y désignent des titres exacts et uniques ; une référence ambiguë bloque la préparation.

Une activité comporte un énoncé, un résultat exact, une suite d’étapes et les éventuelles notes sur le document source. Une étape contient `title`, `tex` et `why`. Commencer par l’énoncé ; terminer par le résultat avec les conditions conservées. Éviter les étapes qui font à la fois une factorisation, une résolution et une sélection des racines.

## Indiquer ce qui change

`focus` désigne une sous-expression LaTeX exacte et complète à souligner dans la formule actuelle. `fromFocus` désigne une sous-expression de l’étape précédente à souligner avant la transformation. Ne pas couper une commande LaTeX ni un groupe. Si le fragment apparaît plusieurs fois, préciser `focusOccurrence` (à partir de 1). Pour une sélection dans l’étape précédente, utiliser `fromFocusOccurrence` : ce choix est indépendant de la sélection précédente. Les lettres contenues dans une commande, comme le a de `\Delta`, ne sont pas des occurrences de la variable a. Sans indication, le lecteur souligne un membre d’égalité ou l’expression entière.

Pour animer une multiplication isolée :

```ts
{
  title: 'Multiplier x par −1',
  tex: 'x-3=x^2-x+5(x-1)',
  why: 'Un nombre multiplié par −1 donne son opposé : x × (−1) = −x.',
  fromFocus: 'x(-1)', // présent dans la formule de l’étape précédente
  focus: '-x',
  product: {left: 'x', right: '(-1)', result: '-x'}
}
```

La scène souligne les facteurs à leur place réelle, déplace des copies vers un calcul temporaire et ramène le produit dans son emplacement. La formule complète reste visible. Utiliser une étape par multiplication avant de regrouper les termes semblables.

Pour un regroupement, sélectionner deux termes de l’expression précédente et expliciter le calcul intermédiaire :

```ts
{
  title: 'Regrouper seulement les termes en x',
  tex: 'x-3=x^2+4x-5',
  why: 'Le coefficient de −x est −1 : −1 + 5 = 4.',
  focus: '4x',
  collect: {left: '-x', right: '5x', via: '(-1+5)x', result: '4x'}
}
```

Les deux termes doivent figurer dans cet ordre dans l’étape précédente. `fromFocus` peut délimiter leur région si l’expression contient plusieurs occurrences. La compilation refuse une sélection introuvable, hors de sa région ou des sélections qui se croisent. Vérifier que `left + right`, `via` et `result` sont bien équivalents ; pour `product`, vérifier `left × right = result`.

`diagram: 'fold'` sélectionne l’illustration de pliage. `circle` contient un angle en radians, son annotation et l’axe `sin` ou `cos` ; il montre le point et la projection associés à cette étape de trigonométrie. Ces scènes remplacent la formule dans le même tableau ; elles ne créent pas de panneau concurrent.

## Synchronisation et vérification

Pour une règle de puissance, déclarer `power` et les deux fragments exacts qui délimitent l’opération :

```ts
{
  title: 'Additionner les exposants',
  tex: 'x^{2+3}',
  why: 'On conserve la base x et on additionne les exposants 2 et 3.',
  focus: '2+3',
  fromFocus: 'x^2\\times x^3',
  power: { kind: 'product', base: 'x', left: '2', right: '3', to: 'x^{2+3}' }
}
```

Les variantes `quotient` et `power` insèrent respectivement une soustraction et une multiplication des exposants. `targetLeft` et `targetRight` permettent d’ajouter les parenthèses nécessaires autour d’un exposant entier. Les rôles explicites évitent de confondre, par exemple, une base 4 avec un exposant 4. `distribute` sélectionne un facteur et un terme, indique le produit écrit et le facteur conservé devant le reste ; voir les deux étapes de distribution de 2.4. `side: 'right'` indique un facteur placé à droite de la parenthèse ; sans cette option, le facteur est à gauche. Les calculs des produits viennent ensuite. Le générateur `expandBinomial(wrap, p, q)` détaille `(x+p)(x+q)` pour p positif et q négatif ; `wrap` conserve l’équation environnante. Il écrit les distributions, calcule les quatre produits un par un, puis regroupe les termes en x.

`discriminantSteps({a,b,c,variable})` détaille les substitutions et les calculs de Δ, quel que soit son signe, avec a non nul. `quadraticSteps({a,b,c,roots,variable})` détaille le discriminant positif entier et les deux formules des racines. Fournir les deux résultats exacts vérifiés, dans l’ordre moins/plus ; la variable vaut `x` par défaut ou `X` après substitution. Ce générateur est limité au cas indiqué et ne remplace pas la résolution des autres cas. `statement: true` signale une nouvelle formule : le tableau effectue un bref glissement vertical, sans transformer les caractères de la précédente en ceux de la suivante. Si la formule est répétée, seul le surlignage évolue. Une étape de calcul ordinaire conserve au contraire sa continuité locale. `phase` donne le nom de la nouvelle phase dans l’en-tête. Le plan de phases central utilise `phase(titreExact, libellé)` pour annoncer une nouvelle phase et une nouvelle formule, `phase(titreExact, libellé, false)` si le même calcul se poursuit, et `reset(titreExact)` pour une nouvelle formule au sein de la phase. Déclarer ces limites en fonction du raisonnement, jamais d’une ressemblance visuelle.

Pour un tableau de signes, voir `src/content/sign-tables.ts`. Le modèle contient les valeurs critiques triées et, pour chaque ligne, son libellé, les signes des intervalles et les indications aux points (`0`, `bar` ou chaîne vide). `bar` désigne une valeur où la ligne n’est pas définie ; ne pas l’utiliser pour un simple zéro de polynôme. `signTableSteps` reçoit une justification par ligne, les indices des intervalles et des points à retenir, puis l’explication de lecture. Les données produisent à la fois le tableau HTML progressif et le LaTeX du corrigé imprimable. Inclure les valeurs interdites parmi les valeurs critiques, même lorsque le signe ne change pas à leur traversée.

`motion/timing.ts` définit le repérage partagé par la scène et le lecteur : dix secondes par étape, état stabilisé à 9,5 secondes. Les multiplications se terminent en 5,35 secondes, les regroupements en 6,10 secondes. Toute nouvelle animation doit respecter ce contrat. La lecture automatique laisse au minimum douze secondes à vitesse normale, s’allonge selon l’explication et ajoute 2,5 secondes au début d’une phase. Un retour ou un saut affiche l’état stabilisé ; une progression vers l’étape suivante ou une répétition lance l’animation. Modifier la vitesse ne relance pas l’étape.

Les règles de puissances prennent 5,2 secondes ; les distributions, 3,9 secondes. Le lecteur HTML complète la ligne active d’un tableau de gauche à droite, sans fondu ; sa pause et sa vitesse suivent les commandes existantes. Sur écran étroit, les gestes et les flèches dans un tableau débordant font défiler celui-ci au lieu de changer d’étape.

Le tableau principal utilise désormais les caractères vectoriels préparés par MathJax, animés par des nœuds `Path` de Motion Canvas. L’ajout d’un exercice régénère automatiquement ses géométries avec `npm run prepare:math` ; cette préparation fait aussi partie des tests et de la compilation. Le suivi des caractères facilite la lecture, mais ne constitue pas une preuve d’équivalence : les justifications restent écrites et vérifiées dans le contenu.

La géométrie vient toujours de la formule sans marquage. Les versions marquées ne fournissent que les rôles des caractères : un changement de couleur ne doit jamais déplacer une fraction ni modifier son espacement. Les tests contrôlent ce contrat pour toutes les sélections.

Pour un nouveau schéma qui utilise directement `Latex`, passer sa formule à `motionTex()` avant de la transmettre au composant. Motion Canvas réserve `{{...}}` à ses segments d’animation : des groupes LaTeX imbriqués peuvent être interprétés par erreur comme ces segments. Garder la formule source intacte pour KaTeX et le corrigé imprimable.

Lancer `npm test`, `npm run build` et `npm run docs`. Les tests contrôlent KaTeX et MathJax, les sources et cibles des soulignements, les multiplications animées et les développements. Compléter par une lecture et un contrôle visuel sur ordinateur et tablette. Aucun test automatique ne remplace la relecture d’un raisonnement.
