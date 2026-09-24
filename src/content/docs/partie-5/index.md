---
title: "Partie 5 · Base de données"
description: "PostgreSQL, un ORM, les relations, les migrations et les données de test."
sidebar:
  label: Introduction
  order: 0
---

PostgreSQL, un ORM, les relations, les migrations et les données de test.

Jusqu'ici, tes données vivaient dans des tableaux en mémoire : au premier redémarrage du serveur, tout disparaissait. Cette partie les met dans une vraie base de données, qui survit aux redémarrages — et qui peut faire respecter des règles que ton code seul ne garantit pas.

## Ce que tu construis

- **Loup-Garou (dans le texte)** : les tables `utilisateurs`, `villages` et `participations` (le rôle d'un joueur dans un village, vivant ou mort).
- **Marketplace (dans tes exercices)** : les tables `vendeurs`, `produits`, `variantes`, `commandes` et `lignes_commande`. Les produits de la partie 4 quittent la mémoire, et leurs variantes deviennent une vraie table.

## Ce que tu vas faire

- **a.** PostgreSQL et TypeORM : lancer une base avec Docker, s'y connecter, écrire une première entité.
- **b.** Le repository : créer, lire, modifier et supprimer, pour de vrai.
- **c.** Les relations : relier des tables entre elles, et ce que la base refuse de te laisser faire.
- **d.** Les migrations : faire évoluer le schéma sans perdre les données.
- **e.** Les données de test : un script qui remplit la base à la demande.
- **f. (bonus)** Prisma, un autre ORM — pour situer TypeORM parmi ses alternatives.
- **g. (bonus)** GraphQL, une autre façon d'exposer ton API que REST.
