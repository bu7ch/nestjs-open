# NestJS Open

Cours en ligne gratuit pour apprendre NestJS de zéro, construit avec Astro Starlight.

## Lancer le site en local

    npm install
    npm run dev        # http://localhost:4321

## Organisation du contenu

- `src/content/docs/` : contenu français (langue par défaut, servi à la racine `/`)
- `src/content/docs/en/` : traduction anglaise (servie sous `/en/`)
- Une page absente en anglais retombe automatiquement sur la version française, avec un bandeau.
- Chaque partie est un dossier `partie-N/`. L'ordre des sections se règle avec `sidebar.order` dans le frontmatter.
- Pour ajouter une partie : créer le dossier et l'ajouter au tableau `parties` dans `astro.config.mjs`.

## Exercices

Dans un fichier `.mdx` :

    import Exercices from '../../../components/Exercices.astro';

    <Exercices partie={3} de={1} a={4}>
    #### 3.1 : ...
    </Exercices>
