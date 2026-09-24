# NestJS Open

Cours en ligne gratuit pour apprendre NestJS en partant de zéro, sur le modèle pédagogique de Full Stack Open (Université d'Helsinki). Site statique Astro Starlight.

## Principes du cours

- Public : débutants backend. Prérequis : bases de la programmation (variables, conditions, boucles, fonctions).
- Du texte, pas de vidéo. Chaque partie est découpée en sections (a, b, c…), la plupart se terminent par des exercices numérotés (8.5, 8.6…).
- Deux projets fil rouge, de la partie 3 à la partie 11 :
  - dans le texte du cours : le backend d'un **Loup-Garou** en ligne (villages, rôles, jour/nuit, votes, chat) ;
  - dans les exercices : une **marketplace B2B** (vendeurs, catalogue, panier, commandes).
- La partie 12 contient les versions complètes des deux projets (microservices, Kafka, Kubernetes…).
- Ne jamais utiliser le nom « Thiercelieux » ni les illustrations du jeu commercial d'Asmodee : on parle du Loup-Garou traditionnel.
- NestJS 11.

## Site

- Français par défaut à la racine (`src/content/docs/`), anglais sous `src/content/docs/en/`. Une page absente en anglais retombe sur le français.
- Les parties sont déclarées dans le tableau `parties` de `src/parties.mjs` (partagé par la sidebar et l'accueil, avec le regroupement en étapes).
- URL du dépôt GitHub (lien d'en-tête, « Modifier cette page ») : `GITHUB` dans `src/site.mjs`.
- Composant d'exercices : `src/components/Exercices.astro` + `Exercice.astro` (une case à cocher par exercice, état dans `localStorage`, clé `nestjs-open:exercice:<numéro>`) :

      <Exercices partie={8} de={5} a={7}>
        <Exercice numero="8.5" titre="Cacher les prix négociés">Consigne…</Exercice>
      </Exercices>

- Frontmatter des leçons (badges et encadré sous le titre) : `projet` (`loup-garou` | `marketplace`), `duree` (minutes), `prerequis` (texte court), `exercices` (nombre). **`exercices` doit correspondre au nombre de `<Exercice>` de la page** : la sidebar s'en sert pour savoir quand une partie est terminée. Un garde-fou (`src/verifierExercices.ts`, appelé par `src/routeData.ts`) fait échouer le build si ce nombre, la numérotation (`<Exercices de a>` et `numero`) ou l'unicité des numéros dans une langue ne sont pas respectés.
- Maquettes validées : `design/*.dc.html`. Ce sont des exports d'un outil de maquette : lire le HTML et les styles inline comme référence visuelle, ignorer `support.js`, la syntaxe `{{…}}`, `<sc-for>`, `<sc-if>` et le bloc `<script type="text/x-dc">` (qui contient seulement les données d'exemple).
- Tâche en cours : voir `HANDOFF.md`.

## Commandes

    npm install
    npm run dev      # http://localhost:4321
    npm run build    # doit passer sans erreur avant de considérer une tâche terminée
    npm test         # tests du garde-fou des exercices (node --test, sans dépendance)

## Conventions

- Textes du site en français, tutoiement, phrases courtes, pas de jargon non expliqué.
- Toute chaîne d'interface existe en français et en anglais.
- Accessibilité : cibles tactiles ≥ 44 px, contraste texte ≥ 4.5:1, vrais `<button>` / `<a>` / `<label>`.

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
