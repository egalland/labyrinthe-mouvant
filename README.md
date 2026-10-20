# Labyrinthe mouvant

Un puzzle en français inspiré du mot **Perplexe**. Après chaque déplacement réussi, les portes cuivrées et lilas alternent entre ouvertes et fermées.

[Jouer à la version hébergée](https://labyrinthe-mouvant.emmanuel-galland117.chatgpt.site)

## Jouer

Récupérez les trois fragments puis rejoignez la sortie. Utilisez les flèches du clavier, les boutons de direction ou les cases voisines. Un mouvement bloqué ne fait pas avancer le compteur et ne change pas les portes.

- Cinq labyrinthes de 5 × 5 à 9 × 9.
- Annulation du dernier pas et redémarrage du niveau.
- Indice calculé sur le plus court chemin, avec détail du calcul et des égalités.
- Progression et records sauvegardés dans le navigateur.
- Interface responsive, commandes au clavier et respect du mouvement réduit.

## Développement

Node.js 24 ou supérieur, sans dépendance à installer.

```sh
npm run build
npm test
python3 -m http.server 8080 --directory dist
```

Ouvrir `http://localhost:8080`.

Le code TypeScript se trouve dans `src/`. Le script de build utilise la suppression native des types de Node.js, sans vérification statique des types. Les fichiers de `dist/` sont prêts pour un hébergement statique.

## Vérification et limites

11 tests automatisés couvrent la résolution des cinq niveaux, les portes bloquées, les sauvegardes, les indices, l’annulation et le parcours de victoire. Les tests d’interface utilisent un DOM simulé ; le rendu visuel sur mobile reste à vérifier.

Aucun service externe ni donnée de démonstration. La sauvegarde reste dans le navigateur utilisé, sans synchronisation entre appareils. Effacer les données du navigateur supprime la progression. Certaines bifurcations peuvent mener à une impasse : annuler permet de revenir en arrière.
