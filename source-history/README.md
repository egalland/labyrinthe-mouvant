# Historique d’origine

La publication GitHub a été réalisée via l’API du connecteur, sans accès Git natif authentifié à GitHub. Les commits de publication GitHub sont donc distincts des commits d’origine.

Tout l’historique Git local disponible est conservé sans modification dans ces bundles :

- sites-history.bundle : commit d’origine Sites 5db7018ac5594c605bbbd41e214844cf5455a2bb.
- preparation-history.bundle : préparation du dépôt public, commit 654947dc22ce82b8f6e96a3c6ca965dfeb394f8c.

Chaque dépôt d’origine ne contenait qu’un commit. Aucun commit antérieur supplémentaire n’était disponible ; les interruptions d’environnement n’ont pas créé de commits.

Pour inspecter les commits et leurs métadonnées exactes :

```sh
git clone source-history/sites-history.bundle ../labyrinthe-original
git -C ../labyrinthe-original log --format=fuller
```

Ces archives conservent les objets Git, identifiants, auteurs, dates, messages et références existants. Elles ne sont pas intégrées à la chaîne des parents de main.
