---
title: À propos du cours
description: Prérequis, organisation et fonctionnement des exercices.
---

## À qui s'adresse ce cours

Ce cours part de zéro côté backend. Il suppose seulement que tu connais les bases de la programmation : variables, conditions, boucles et fonctions, dans n'importe quel langage.

## Comment il est organisé

Le cours est découpé en parties. Chaque partie est divisée en sections, et la plupart des sections se terminent par une série d'exercices numérotés (3.1, 3.2…).

Deux projets avancent en parallèle, de la partie 3 à la partie 11 :

- **Dans le texte du cours**, on construit le backend d'un Loup-Garou en ligne : villages, distribution des rôles, alternance du jour et de la nuit, votes, pouvoirs des rôles spéciaux et chat.
- **Dans les exercices**, tu construis une marketplace B2B : vendeurs, catalogue, panier et commandes.

Les deux projets utilisent les mêmes notions, mais sur des domaines différents. Tu ne pourras pas copier-coller : il faudra comprendre pour transposer.

Les parties 0 à 2 posent les bases avec de petits exercices indépendants.

## Les sections bonus

Certaines sections sont marquées « bonus » dans l'introduction de leur partie. Elles présentent une alternative à ce que tu viens d'apprendre (Joi et Zod, Prisma, GraphQL, Passport, Clerk) ou un projet supplémentaire : le mini-dashboard NBA de la partie 4, sur un troisième thème, à construire seul pour vérifier que tu as tout retenu.

Tu peux les sauter sans rien perdre pour la suite. Leurs exercices sont numérotés comme les autres et comptent dans ton nombre d'exercices validés, mais ils ne sont **pas** exigés pour terminer une partie.

## Les projets de fin de parcours

La partie 12 reprend ces deux projets dans leur version complète, avec des cahiers des charges professionnels : microservices, files de messages, temps réel à grande échelle, paiements. Tu y arrives en connaissant déjà le domaine, puisque tu l'as construit en version simple.

## Rendre ses exercices

Un dépôt d'exercices, `nestjs-open-exercices`, contient un projet NestJS vide et les tests des exercices. Tu le forkes, tu y construis ta marketplace au fil des parties, et tu vérifies avec `npm run test:partie-N` (par exemple `npm run test:partie-3`). GitHub Actions relance les mêmes tests à chaque push sur ton fork.

Les tests vérifient le comportement de ton API et la structure demandée par les exercices, pas ton style. Les exercices « manuels » (installer, lire un message d'erreur, casser quelque chose exprès) ne sont pas testés : tu les coches toi-même sur le site. Le dépôt contient aussi, pour chaque partie couverte, une solution que GitHub Actions vérifie à chaque changement : elle prouve que les exercices sont faisables, et te dépanne une fois que tu as essayé.

Le dépôt suit la rédaction du cours : à ce jour, les tests couvrent la **partie 3**. Sous les exercices des autres parties, aucune commande n'est affichée tant qu'ils ne sont pas couverts.
