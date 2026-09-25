---
title: "Partie 10 · Mise en production"
description: "Docker, CI/CD avec GitHub Actions, logs, health checks et déploiement."
sidebar:
  label: Introduction
  order: 0
---

Docker, CI/CD avec GitHub Actions, logs, health checks et déploiement.

Ton API tourne sur ta machine, avec `npm run start:dev`, un `.env` à côté et une base dans un conteneur. En production, plus rien de tout ça n'existe : pas de fichier `.env`, pas de `nest` pour recompiler, personne pour regarder la console, et un serveur qui peut être arrêté à tout moment pour une mise à jour. Cette partie transforme ton projet en quelque chose qu'on peut **livrer** : une image qui démarre partout de la même façon, qui refuse de démarrer si on l'a mal configurée, qui dit si elle va bien, qui écrit des journaux qu'une machine sait lire, et qui s'arrête sans couper les joueurs en pleine partie. Puis on automatise : chaque `git push` lance les tests et fabrique l'image.

Comme depuis le début du cours, tout ce qui est montré ici a été exécuté : les tailles d'image, les temps de construction, les messages d'erreur et les codes de statut sont ceux qu'on a mesurés.

## Ce que tu construis

- **Loup-Garou (dans le texte)** : une configuration validée pour la production, une image Docker légère qui tourne sans les droits d'administrateur, un `docker-compose.yml` complet (API, PostgreSQL, Redis, migrations), des routes de santé, des journaux JSON avec l'identifiant de requête, un arrêt propre, et un workflow GitHub Actions qui teste puis publie l'image.
- **Marketplace (dans tes exercices)** : la même mise en production, de la validation de l'environnement jusqu'à l'image publiée sur le registre de GitHub, et une répétition de déploiement.

## Ce que tu vas faire

- **a.** Configurer pour la production : `NODE_ENV`, un environnement validé au démarrage, des secrets qui ne sont nulle part dans le code.
- **b.** Une image Docker : multi-étapes, légère, sans `root`, avec un cache efficace, et des migrations qui tournent sans `nest`.
- **c.** Docker Compose au complet : l'API, PostgreSQL et Redis, démarrés dans le bon ordre.
- **d.** Santé, journaux et arrêt propre : `/sante`, des journaux JSON, et un `SIGTERM` qui laisse finir les requêtes en cours.
- **e.** Intégration et livraison continues avec GitHub Actions, et le principe d'un déploiement.

:::note[Ce que cette partie suppose]
Elle s'appuie sur l'application des parties 5 à 9 : `docker-compose.yml`, migrations et `data-source.ts` (partie 5), tests avec Vitest et base `_test` (partie 6), authentification, `THROTTLE_ACTIF` et helmet (partie 7), `RequeteIdMiddleware`, `ToutesExceptionsFilter` et la route `/sante` (partie 8), Swagger et `configurerApp` (partie 9). Il te faut Docker (ou Podman, voir la partie 5) et un compte GitHub pour la section e.
:::
