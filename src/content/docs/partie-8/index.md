---
title: "Partie 8 · Le cycle de vie d'une requête"
description: "Middleware, guards, interceptors, pipes et filtres d'exceptions : qui s'exécute quand, et pourquoi."
sidebar:
  label: Introduction
  order: 0
---

Middleware, guards, interceptors, pipes et filtres d'exceptions : qui s'exécute quand, et pourquoi.

Tu as déjà rencontré la plupart de ces briques, une par une : les pipes en partie 4, les guards en partie 7, un filtre d'exceptions implicite à chaque `NotFoundException`. Cette partie les met **côte à côte**. Savoir dans quel ordre elles s'exécutent explique des comportements qui, sinon, surprennent : pourquoi un guard voit un `:id` qui n'a pas encore été validé, pourquoi un interceptor n'a pas de « après » quand la route échoue, pourquoi une erreur levée par un middleware sort quand même au bon format.

## Ce que tu construis

- **Loup-Garou (dans le texte)** : un middleware qui identifie chaque requête, des guards « c'est le bon moment » et « tu es vivant » (et loup, si l'action l'exige), un interceptor qui cache le rôle des autres joueurs, et un filtre qui uniformise les erreurs.
- **Marketplace (dans tes exercices)** : un guard qui isole les données de chaque vendeur, un interceptor qui masque les champs internes, un filtre d'erreurs.

## Ce que tu vas faire

- **a.** Le cycle de vie : l'ordre exact des couches, prouvé par un test.
- **b.** Les middlewares : identifier et journaliser chaque requête.
- **c.** Les guards de jeu : autoriser une action selon la phase, le joueur et son rôle.
- **d.** Les interceptors : transformer une réponse, borner un temps d'exécution.
- **e.** Les filtres d'exceptions : un format d'erreur unique, et des erreurs de base de données traduites une fois pour toutes.

:::note[Ce que cette partie suppose]
Elle s'appuie sur l'application des parties 5 à 7 : villages et participations en base (partie 5), tests avec Vitest et base de test (partie 6), authentification et guard global `AuthGuard` (partie 7). Les tests de bout en bout reprennent la fonction `configurerApp` et la base `_test`.
:::
