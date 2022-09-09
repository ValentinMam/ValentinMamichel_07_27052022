git checkout -b <new-branch> <existing-branch>

$ git checkout -b feature main
Switched to a new branch 'feature'

1.  Ainsi, nous avons créé une nouvelle branche feature à partir de la branche existante main. L’option -b à la commande git checkout provoque la création de la nouvelle branche. En outre, cela entraîne l’extraction de la nouvelle branche.

2.  Maintenant, nous allons développer la nouvelle fonctionnalité et apporter nos modifications dans la nouvelle branche, à savoir feature.

Après avoir terminé le développement de la fonctionnalité et validé les modifications apportées à la nouvelle branche feature, nous aimerions fusionner cette branche avec la branche principale main.

Nous pouvons utiliser la commande git merge pour fusionner la branche feature ​​avec la branche principale main.

Tout d’abord, nous passerions à la branche principale main en utilisant la commande git checkout.

$ git checkout main
Switched to branch 'main'
Nous allons utiliser la commande git merge pour fusionner la branche feature avec la branche main.

Nous exécuterions la commande comme suit.

$ git merge --no-ff feature
Updating ea1b23a..05e9201
(Summary of changes)
L’option --no-ff de la commande git merge s’applique toujours à créer un nouvel objet de validation, même si une fusion rapide est effectuée. Cela entraîne la création d’un commit de fusion dans tous les cas, même lorsque la fusion peut être résolue en avance rapide.

C’est utile, car lorsque l’on parcourt l’historique de Git, on verrait des informations sur l’existence de la branche feature. Elle a aussi pour effet de regrouper tous les commits de la branche feature.

De plus, lorsque l’on souhaite inverser la fusion de la branche feature dans la branche main, c’est plus simple grâce à la présence du commit de fusion.

Dans le cas de la fusion accélérée, aucun commit de fusion n’est créé. Seule la mise à jour du pointeur de branche se produit pour correspondre à la branche fusionnée.

Enfin, nous devons pousser les modifications vers le référentiel distant.

$ git push origin main
$ git push origin feature
Ainsi, nous avons montré comment créer une branche à partir d’une autre branche dans Git.
