---
title: "Partie 6 · Tester son API"
description: "Tests unitaires avec Vitest, doublures, tests de bout en bout avec Supertest, base de test et couverture."
sidebar:
  label: Introduction
  order: 0
---

Tests unitaires avec Vitest, doublures, tests de bout en bout avec Supertest, base de test et couverture.

Jusqu'ici, tu vérifiais ton API à la main, avec `curl`. Ça marche tant que le projet est petit. Mais chaque nouvelle route peut casser une ancienne sans que tu t'en aperçoives, et refaire dix `curl` après chaque modification finit par ne plus se faire. Un test automatique refait cette vérification pour toi, en une commande, en quelques secondes.

## Ce que tu construis

- **Loup-Garou (dans le texte)** : le moteur du jeu, écrit pour être testé, avec ses tests : distribution des rôles, résolution de la nuit, décompte des votes, conditions de victoire.
- **Marketplace (dans tes exercices)** : les tests du calcul des prix par paliers, des transitions de commande, du service des produits et de l'API des vendeurs.

## Ce que tu vas faire

- **a.** Les tests unitaires : tester une fonction seule, sans serveur ni base.
- **b.** Le module de test et les doublures : tester un service qui dépend d'autres, sans leurs vraies dépendances.
- **c.** Les tests de bout en bout : envoyer de vraies requêtes HTTP à l'application, avec Supertest.
- **d.** La base de données de test : des tests qui parlent à un vrai PostgreSQL, sans jamais toucher à tes vraies données.
- **e.** La couverture : mesurer ce que tes tests exécutent, et comprendre ce que ce chiffre ne dit pas.

:::note[Vitest, pas Jest]
Un projet créé avec NestJS 12 utilise **Vitest**, un outil de test moderne. Beaucoup de tutoriels, et les versions précédentes de NestJS, utilisent **Jest**. Les deux se ressemblent beaucoup : `describe`, `it` et `expect` s'écrivent pareil. La principale différence à retenir : `jest.fn()` devient `vi.fn()`.
:::
