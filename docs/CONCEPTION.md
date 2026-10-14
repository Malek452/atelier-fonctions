# Présentation et transformations mathématiques

Le corrigé s’adresse à des étudiants de sciences du vivant ayant besoin de reprendre les bases. Les 92 corrections conservent les énoncés et résultats du TD. Elles comprennent maintenant 1 080 étapes, de l’énoncé à la conclusion, avec une explication explicite des conditions, des règles et des opérations intermédiaires.

## Concentrer l’attention

L’écran présente un seul tableau : le titre de l’étape, la formule ou le schéma, puis son explication. La formule n’est plus répétée dans une deuxième carte. Le plan latéral et l’énoncé séparé ont disparu. La présentation remplit la fenêtre dès l’ouverture. Une barre de navigation donne accès aux exercices et sous-questions ; la liste des étapes reste avec les commandes de lecture. L’accueil, les slogans, la barre latérale et le pied de page sont retirés. Un bouton active le plein écran sur les navigateurs compatibles. Une version mathématique réservée aux lecteurs d’écran accompagne le Canvas.

La lecture reste manuelle par défaut. La lecture automatique laisse au minimum dix secondes par étape à vitesse normale, davantage lorsque l’explication est longue, et attend le chargement de la scène. Les boutons précédent, suivant et rejouer restent disponibles, ainsi que la vitesse et la réduction des mouvements. Un balayage horizontal à un doigt navigue entre les étapes : gauche pour avancer, droite pour revenir. Les gestes verticaux, diagonaux, trop courts, prolongés ou à plusieurs doigts ne changent pas d’étape. Les bords du navigateur et les formules débordantes conservent leurs gestes natifs.

## Décomposer le raisonnement

Les puissances traitent le premier facteur, puis le second, avant de réunir les exposants. Les fractions sont mises au même dénominateur avant de réunir leurs numérateurs. Les logarithmes explicitent les arguments positifs et le rôle des parenthèses. Les domaines distinguent racine paire, racine impaire, logarithme et division par zéro. Les calculs du discriminant et des deux racines sont présentés séparément.

Les développements de (x + 5)(x − 1) et (x + 1)(x − 3) isolent les quatre multiplications. Les facteurs travaillés sont soulignés à leur emplacement réel, en doré et bleu. Des copies rejoignent un calcul temporaire dans le même tableau ; le résultat retourne ensuite à sa place dans la formule. La formule complète reste visible pendant ces 26 multiplications. Les 14 regroupements passent par un calcul explicite des coefficients, par exemple (−1 + 5)x avant 4x. Les termes semblables ne sont regroupés qu’ensuite. Aucun schéma périphérique ne bouge pendant ce calcul.

Les étapes de trigonométrie affichent les angles remarquables exacts de la question, avec la projection horizontale ou verticale correspondante. Le pliage A4 apparaît uniquement à l’étape qui explique le pli. Ces représentations occupent la même zone que les formules.

Les règles de puissances déclarent les rôles de chaque base et de chaque exposant. L’animation colore d’abord les exposants, puis assemble les bases et place l’opérateur adapté. La distributivité précède les calculs de produits. Les formules générales des deux racines sont de nouvelles affirmations, affichées sans transformation trompeuse du résultat précédent ; les substitutions suivantes ciblent un coefficient à la fois.

Les tableaux de signes de l’exercice 3 suivent tous le même parcours : ranger les valeurs, compléter chaque ligne avec sa justification, multiplier ou diviser les signes, puis lire les intervalles et les bornes. Le zéro d’un dénominateur produit une double barre sur la ligne du quotient. Le zéro d’un polynôme reste noté 0 ; il est retenu ou exclu selon l’inégalité et les conditions de définition. Les tableaux HTML gardent leur structure et leurs dimensions quand les signes sont inscrits, sans fondu ni duplication de la zone de présentation.

## Architecture

React gère le lecteur et les explications ; Motion Canvas anime la scène unique ; KaTeX fournit le rendu sans mouvement et l’alternative accessible. MathJax prépare les tracés vectoriels et leurs positions lors de la compilation. Chaque caractère devient un nœud Path : les caractères conservés se déplacent, les symboles modifiés se transforment, et les calculs ciblés gardent leurs facteurs d’origine. La correspondance des caractères est visuelle ; elle ne certifie pas l’équivalence mathématique et ne remplace pas les justifications. Un fichier TypeScript par exercice contient le contenu. Les paramètres d’animation sont attachés à l’étape qu’ils expliquent. Le projet reste statique, sans compte, évaluation automatique ni backend.
