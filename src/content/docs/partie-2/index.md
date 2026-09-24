---
title: "Partie 2 · Node.js et un premier serveur"
description: "Un serveur HTTP écrit à la main, puis avec Express, pour comprendre ce qu'un framework comme NestJS va t'apporter."
sidebar:
  label: Introduction
  order: 0
---

Un serveur HTTP écrit à la main, puis avec Express, pour comprendre ce qu'un framework comme NestJS va t'apporter.

Tu vas écrire trois fois le même petit serveur : à la main avec le module `http` de Node, puis avec Express. À chaque étape, tu verras ce que la couche suivante t'évite d'écrire toi-même — c'est exactement ce que NestJS fera encore mieux, à partir de la partie 3.

## Ce que tu vas faire

- **a.** Le module `http` natif : un serveur sans aucune dépendance.
- **b.** npm et `package.json` : transformer un dossier de scripts en vrai projet.
- **c.** Express : le même serveur, en beaucoup moins de code.
- **d.** Les middlewares : la brique qu'Express partage avec NestJS.
