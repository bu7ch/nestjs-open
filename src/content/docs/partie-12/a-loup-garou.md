---
title: "a · Loup-Garou multijoueur"
description: Cahier des charges du Loup-Garou en ligne dans sa version complète.
sidebar:
  order: 1
---

## Objectifs

Construire un backend scalable pour un Loup-Garou en ligne, capable de supporter 10 000 joueurs connectés simultanément, répartis dans des centaines de villages.

| Objectif | Cible |
|---|---|
| Latence réseau | < 100 ms (p95) |
| Connexions WebSocket par instance | 10 000 |
| Scalabilité | Horizontale (microservices) |
| Information cachée | Aucun rôle ni action secrète ne fuite vers un client non autorisé |
| Reconnexion | Transparente, sans perte d'état |

## Périmètre

**Inclus** : authentification, salons publics et privés, matchmaking par niveau, moteur de jeu (phases jour et nuit, rôles, votes), chat par canal (village, loups, morts), mode spectateur, reconnexion, classements et statistiques par rôle.

**Exclus** : client (web ou mobile), paiements in-game, modération avancée par IA.

## Le moteur de jeu

Une partie suit une state machine :

```
LOBBY → DISTRIBUTION → NUIT → AUBE → JOUR → VOTE → CRÉPUSCULE → NUIT … → TERMINÉE
```

Chaque nuit se résout dans un ordre fixe : Cupidon (première nuit seulement), la voyante, les loups-garous, puis la sorcière. Le serveur applique les effets (morts, amoureux, potions) à l'aube. La partie s'arrête dès qu'un camp remplit sa condition de victoire.

Le jeu repose sur l'information cachée : le serveur est le seul à connaître tous les rôles. Chaque message envoyé à un client est filtré selon ce que ce joueur a le droit de savoir.

## Ce qui change par rapport à la version du cours

| Version du cours | Version complète |
|---|---|
| Monolithe NestJS | Microservices derrière une API Gateway |
| Appels de fonctions entre modules | gRPC en synchrone, Kafka pour les événements de partie |
| Une instance WebSocket | Socket.io avec l'adaptateur Redis |
| Rôles de base (loups, villageois, voyante, sorcière) | Rôles configurables, ajout de rôles par plugin |
| Docker Compose | Kubernetes, OpenTelemetry, Grafana |

## Stack

NestJS 11, PostgreSQL 16, Redis 7 en cluster, Kafka, gRPC, Socket.io, Passport + JWT, Docker et Kubernetes.

## Planning indicatif

Environ 16 semaines : authentification, salons et matchmaking, moteur de jeu et rôles, WebSocket et reconnexion, chat par canal, spectateurs, classements, tests de charge, déploiement.
