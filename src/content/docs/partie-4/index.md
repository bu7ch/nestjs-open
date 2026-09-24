---
title: "Partie 4 · Valider les données"
description: "DTO, class-validator, pipes et gestion de la configuration."
sidebar:
  label: Introduction
  order: 0
---

DTO, class-validator, pipes et gestion de la configuration.

En partie 3, `@Body()` acceptait n'importe quoi : le type TypeScript que tu lui donnais n'était qu'une promesse, jamais vérifiée. Cette partie comble ce trou — et t'évite de laisser un prix négatif ou un champ manquant filer jusqu'à ta base de données.

## Ce que tu construis

- **Loup-Garou (dans le texte)** : des DTO pour créer un village (nombre de joueurs, rôles en jeu) et voter.
- **Marketplace (dans tes exercices)** : des DTO pour les produits et leurs variantes.

## Ce que tu vas faire

- **a.** Les DTO : donner une forme à ce que `@Body()` reçoit.
- **b.** class-validator : vérifier cette forme pour de vrai, à l'exécution.
- **c.** Les pipes : la mécanique générale derrière la validation.
- **d.** Gérer la configuration : `.env`, `ConfigService`, et la valider elle aussi.
- **e. (bonus)** Joi et Zod, deux autres bibliothèques de validation — pour situer `class-validator` parmi ses alternatives.
