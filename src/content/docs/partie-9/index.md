---
title: "Partie 9 · Concevoir une API propre"
description: "Documentation OpenAPI, versions, pagination, filtres et erreurs cohérentes."
sidebar:
  label: Introduction
  order: 0
---

Documentation OpenAPI, versions, pagination, filtres et erreurs cohérentes.

Jusqu'ici, tu as construit une API qui **fonctionne**. Cette partie s'intéresse à celle qui se **laisse utiliser** : un développeur qui ne connaît pas ton code doit pouvoir la comprendre, la parcourir sans qu'elle s'écroule quand les données grossissent, et ne pas se faire casser par tes prochains changements. Ce sont des décisions de conception, mais chacune se vérifie par un test.

## Ce que tu construis

- **Loup-Garou (dans le texte)** : la documentation Swagger de l'API, une liste de villages en deux versions (l'ancienne annoncée comme obsolète), paginée, filtrable et triable, un classement des joueurs calculé par la base, et des erreurs de validation champ par champ.
- **Marketplace (dans tes exercices)** : un catalogue de produits paginé, filtrable et trié, avec sa documentation, sa version 2 et un classement des vendeurs.

## Ce que tu vas faire

- **a.** Documenter avec Swagger : une documentation générée depuis ton code, et testée.
- **b.** Versionner son API : changer une réponse sans casser les clients existants.
- **c.** Paginer les listes, par pages et par curseur.
- **d.** Filtrer, trier et classer, sans jamais faire confiance à ce que le client envoie.
- **e.** Des erreurs cohérentes, documentées, et un contrat figé dans un fichier.

:::note[Ce que cette partie suppose]
Elle s'appuie sur l'application des parties 5 à 8 : villages et participations en base (partie 5), tests avec Vitest et base de test (partie 6), authentification et guard global (partie 7), filtre d'exceptions et `RequeteIdMiddleware` (partie 8). Les tests de bout en bout reprennent `configurerApp` et la base `_test`.
:::
