---
title: "b · Marketplace B2B multi-vendeurs"
description: Cahier des charges de la marketplace dans sa version complète.
sidebar:
  order: 2
---

## Objectifs

Construire une plateforme e-commerce B2B où des vendeurs professionnels vendent à des entreprises, avec des prix négociés, des catalogues volumineux et des workflows d'approbation.

| Objectif | Cible |
|---|---|
| Vendeurs actifs | 5 000 |
| Acheteurs actifs | 100 000 |
| Références par vendeur | Jusqu'à 1 million |
| Recherche | < 200 ms sur 10 millions de produits |
| Transactions par jour | 100 000 |

## Périmètre

**Inclus** : onboarding vendeurs avec KYC, catalogue multi-vendeurs, panier et commandes, paiements fractionnés avec Stripe Connect, tarification B2B et promotions, retours et remboursements, recherche à facettes, avis, workflow d'approbation.

**Exclus** : logistique (intégration des API transporteurs seulement), comptabilité avancée (export seulement), chat temps réel entre vendeur et acheteur.

## Ce qui change par rapport à la version du cours

| Version du cours | Version complète |
|---|---|
| Monolithe NestJS | Monorepo Nx avec un service par domaine |
| Recherche SQL avec filtres | Elasticsearch synchronisé par CDC (Debezium) |
| Stock décrémenté en transaction | Réservations avec verrous distribués (Redlock) |
| Webhooks Stripe en mode test | Stripe Connect avec split de paiement et commission |
| Import CSV en file de tâches | Import de 100 000 lignes en moins de 5 minutes |

## Stack

NestJS 11 en monorepo Nx, PostgreSQL 16 avec partitionnement, Elasticsearch 8, Redis 7 et Redlock, RabbitMQ, Debezium, Stripe Connect, S3 et CloudFront.

## Planning indicatif

Environ 29 semaines : vendeurs et authentification, catalogue et import, tarification, stock, commandes, paiements, recherche, avis et retours, tests de charge, déploiement.
