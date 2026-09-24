---
title: "Partie 7 · Authentification"
description: "Hachage des mots de passe, JWT, guards, rôles, refresh token, limitation des tentatives, et deux alternatives : Passport et Clerk."
sidebar:
  label: Introduction
  order: 0
---

Hachage des mots de passe, JWT, guards, rôles, refresh token, limitation des tentatives, et deux alternatives : Passport et Clerk.

Jusqu'ici, ton API répond à n'importe qui. N'importe quel visiteur peut créer un village, lister les joueurs ou modifier un produit. Cette partie te fait poser deux questions distinctes, qu'il ne faut pas confondre :

- **Qui es-tu ?** C'est l'**authentification** : prouver son identité, avec un mot de passe.
- **Qu'as-tu le droit de faire ?** C'est l'**autorisation** : un joueur ne peut pas supprimer un village, un vendeur ne modifie pas les produits d'un autre.

## Ce que tu construis

- **Loup-Garou (dans le texte)** : l'inscription et la connexion des joueurs, les jetons JWT et leur renouvellement, les rôles `joueur` et `admin`, et le droit de ne rejoindre un village que pour soi-même.
- **Marketplace (dans tes exercices)** : les comptes acheteur, vendeur et admin, avec un vendeur qui ne peut modifier que ses propres produits.

## Ce que tu vas faire

- **a.** Hacher les mots de passe : ne jamais stocker un mot de passe, seulement son empreinte.
- **b.** Inscription et connexion : émettre un jeton JWT, et comprendre ce qu'il contient.
- **c.** Protéger les routes : un guard qui vérifie le jeton sur toute l'application.
- **d.** Les rôles et la propriété : autoriser selon qui tu es, et selon ce qui t'appartient.
- **e.** Le refresh token : des jetons courts, renouvelables, et révocables.
- **f.** Se protéger des abus : limiter les tentatives de connexion, en-têtes de sécurité et CORS.
- **g. (bonus)** Passport, la bibliothèque d'authentification la plus répandue autour de NestJS.
- **h. (bonus)** Clerk, un service qui prend en charge l'authentification à ta place.

:::caution[La sécurité ne se rattrape pas]
Cette partie t'apprend les mécanismes, pas à devenir expert en sécurité. Dans un vrai projet, appuie-toi sur des bibliothèques éprouvées (comme ici) plutôt que de réinventer un mécanisme, et fais relire tout ce qui touche à l'authentification.
:::
