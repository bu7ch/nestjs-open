---
title: "Partie 11 · Aller plus loin"
description: "Le temps réel avec les WebSockets, des minuteurs qui survivent à un redémarrage, les files de tâches et les webhooks."
sidebar:
  label: Introduction
  order: 0
---

Le temps réel avec les WebSockets, des minuteurs qui survivent à un redémarrage, les files de tâches et les webhooks.

Jusqu'ici, ton API ne parlait que lorsqu'on lui posait une question : une requête arrive, une réponse repart. Un Loup-Garou en ligne a besoin de plus. Le serveur doit **prévenir** les joueurs quand la nuit tombe, sans attendre qu'ils le demandent. Il doit compter le temps d'une phase, même si on le redémarre au milieu. Et il doit accepter des messages envoyés par d'autres services que tes clients. Chacune de ces capacités ouvre une nouvelle façon de laisser passer une information à qui ne devrait pas la voir : c'est le fil conducteur de cette partie.

## Ce que tu construis

- **Loup-Garou (dans le texte)** : un chat du village le jour, un chat privé des loups la nuit, où les morts se taisent et d'où aucun secret ne fuit, une reconnexion qui rattrape ce qu'on a manqué, des phases qui basculent seules à l'heure dite, même après un redémarrage, l'envoi du récapitulatif de fin de partie en arrière-plan, et un webhook de « pass premium » signé et traité une seule fois.
- **Marketplace (dans tes exercices)** : les commandes notifiées en temps réel au vendeur, par un WebSocket authentifié, l'annulation automatique des commandes impayées, l'import d'un catalogue CSV dans une file de tâches, et un webhook de paiement signé et idempotent.

## Ce que tu vas faire

- **a.** Le temps réel avec les WebSockets : un gateway, des salles par village, des événements typés.
- **b.** Des canaux privés et authentifiés : le jeton vérifié à la connexion, le chat des loups, les morts, et la reconnexion.
- **c.** Les phases et les minuteurs : des jobs différés dans Redis avec BullMQ, qu'on annule, qu'on reprogramme, et qui survivent à un redémarrage.
- **d.** Les files de tâches en général : producteur et consommateur, réessais, échec définitif, doublons. *Bonus.*
- **e.** Webhooks et idempotence : vérifier une signature, dédoublonner, rejouer. *Bonus.*

Les sections **d** et **e** sont des **bonus** : leurs exercices ne sont pas exigés pour terminer la partie. La section c t'apprend déjà assez de BullMQ pour la suite du cours.

:::note[Ce que cette partie suppose]
Elle s'appuie sur l'application des parties 5 à 10 : villages et participations en base (partie 5), tests avec Vitest et base de test (partie 6), authentification par JWT et guard global `AuthGuard` (partie 7), filtre d'exceptions et règles de jeu (partie 8), et le service **Redis** de ton `docker-compose.yml` (partie 10), dont les sections c et d ont besoin. Les tests de bout en bout reprennent `configurerApp` et la base `_test`, et ont besoin de Redis, comme depuis la partie 10.
:::
