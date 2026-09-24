# Handoff : appliquer la maquette UI/UX validée

Objectif : faire correspondre le site Starlight aux maquettes de `design/` :
- `design/Main.dc.html` : page d'accueil, mode jour (1440 px) ;
- `design/Lecon.dc.html` : page de leçon, mode jour (1440 px) ;
- `design/Mobile-nuit.dc.html` : page de leçon sur mobile, mode nuit (390 px).

Travailler en deux étapes. Faire valider l'étape 1 (build OK + captures) avant l'étape 2.

## Concept

Le Loup-Garou alterne jour et nuit : le mode clair s'appelle **Jour**, le mode sombre **Nuit**. Le logo est un croissant de lune. Le bouton de thème est un simple bascule jour/nuit (icône lune en mode jour, soleil en mode nuit), pas le `<select>` Clair/Sombre/Auto de Starlight. Au premier chargement, suivre `prefers-color-scheme`.

## Design tokens

### Jour (clair)

| Rôle | Valeur |
|---|---|
| Fond de page | `#f4f5f8` |
| Surface (header, sidebar, cartes) | `#ffffff` |
| Bordure | `#d9dde6` |
| Séparateur léger | `#e3e6ee` |
| Texte | `#1b2130` |
| Texte secondaire | `#3d4557` |
| Texte discret | `#545d72` |
| Accent (rouge Nest assombri) | `#b3173a`, survol `#7e0f28`, fond doux `#fbe7ec` |
| Badge Loup-Garou | fond `#e6e9f7`, texte `#2f3d8c` |
| Badge marketplace / validé | fond `#e2f1ec`, texte `#1d6b55` |

### Nuit (sombre)

| Rôle | Valeur |
|---|---|
| Fond de page | `#141a2a` |
| Surface | `#1b2236` |
| Bordure | `#2c3448` (contrôles : `#3a4359`) |
| Texte | `#e6e9f2`, secondaire `#d5d9e4`, discret `#a3abc0` |
| Accent | `#ff6b86` (liens `#ff8fa3`) |
| Badge Loup-Garou | fond `#28305a`, texte `#c9d2ff` |
| Badge marketplace | fond `#173d33`, texte `#9fd8b5` |

### Blocs de code (identiques jour et nuit)

Fond `#1b2130` (nuit : `#0f1422`), texte `#e6e9f2`, mots-clés `#ff8fa3`, types `#9db2ff`, chaînes `#9fd8b5`, nombres `#ffc27a`, commentaires `#8c95ab`. Lignes surlignées : bordure gauche 3 px `#ffc27a` + fond `rgba(255,194,122,0.1)`.

### Typographie

- Titres : **Bricolage Grotesque** 700/800, interlettrage négatif (-0.02 à -0.035em).
- Texte : **Atkinson Hyperlegible** 400/700 (choisie pour la lisibilité, public débutant), 18 px / 1.7 dans les leçons.
- Code : **JetBrains Mono** 400/600.
- Installer via Fontsource (`@fontsource-variable/bricolage-grotesque`, `@fontsource/atkinson-hyperlegible`, `@fontsource/jetbrains-mono`), pas de Google Fonts.

Rayons : 8 px (contrôles), 10–12 px (blocs, cartes), 999 px (badges).

## Étape 1 : configuration et styles

1. Tokens dans `src/styles/custom.css` via les variables Starlight (`--sl-color-*`, `--sl-font`, `--sl-font-mono`) pour `:root` (nuit) et `:root[data-theme='light']` (jour).
2. Polices Fontsource importées dans `customCss`.
3. Logo : SVG du croissant (voir `design/Main.dc.html`, header) dans `src/assets/logo.svg`, option `logo` de Starlight.
4. Blocs de code : configurer Expressive Code (`expressiveCode` dans la config Starlight) pour coller aux couleurs ci-dessus, avec titre de fichier (`title="src/…"`) et lignes marquées (`{4,6}`). Mettre à jour `partie-0/a-le-web.mdx` pour montrer un exemple.
5. Bascule jour/nuit : surcharger le composant `ThemeSelect` (option `components` de Starlight). Libellés FR/EN (« Passer en mode nuit » / « Switch to night mode »…) via le système de traductions de Starlight (`src/content/i18n/fr.json`, `en.json`).
6. Page d'accueil (`index.mdx` et `en/index.mdx`) selon `design/Main.dc.html` : hero à deux colonnes (titre « Apprends le backend en codant un Loup-Garou. », sous-titre, bouton « Commencer la partie 0 », ligne de prérequis ; à droite le panneau de réponse d'API où Clémence voit l'autre loup mais pas le rôle des villageois), puis « Le parcours » (13 parties en 3 étapes), puis les deux projets. Créer des composants Astro dédiés dans `src/components/accueil/`.

Critère de fin : `npm run build` passe, accueil et page de leçon en jour et nuit proches des maquettes, rien de cassé en anglais.

## Étape 2 : composants de leçon

1. Étendre le schéma du frontmatter dans `src/content.config.ts` (`docsSchema({ extend: z.object({...}) })`) :
   - `projet` : `'loup-garou' | 'marketplace'` (optionnel) ;
   - `duree` : nombre de minutes (optionnel) ;
   - `prerequis` : texte court (optionnel) ;
   - `exercices` : nombre (optionnel).
2. Surcharger `PageTitle` pour afficher sous le titre les badges (projet, « Environ 45 minutes », « 3 exercices ») et, si `prerequis` existe, l'encadré « Avant de commencer ».
3. Refaire `Exercices.astro` selon la maquette : bordure 2 px accent, titre « Exercices 8.5 à 8.7 », badge marketplace, chaque exercice avec une case à cocher, et la commande de test (`npm run test:partie-N`). L'état des cases est sauvegardé dans `localStorage` (clé par numéro d'exercice), lu en `try/catch`, et le rendu reste correct si le stockage est vide ou indisponible.
4. Surcharger `Sidebar` pour afficher la progression en haut (« 8 parties terminées sur 13, 41 exercices validés » + barre) et une pastille par partie (numéro, ou coche verte quand tous ses exercices sont cochés). Calcul côté client à partir du `localStorage`. Partie courante sur fond accent doux.
5. Mobile (≤ 50 rem) : barre de progression de lecture de 4 px sous le header, liens Précédent / Suivant fixés en bas (hauteur 52 px).
6. Ajouter le frontmatter complet à `partie-0/a-le-web.mdx` pour démontrer badges, prérequis et exercices.

Critère de fin : build OK, cases cochées conservées après rechargement, progression de la sidebar mise à jour, aucune régression en anglais, navigation clavier complète.
