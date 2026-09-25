// Le site est servi sous un sous-chemin sur GitHub Pages (`base` dans astro.config.mjs) :
// tout lien écrit à la main doit passer par ici.
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

/** Préfixe un chemin absolu du site (`/partie-3/`) avec la base. */
export const avecBase = (chemin: string): string => (chemin.startsWith('/') ? BASE + chemin : chemin);

/** Retire la base d'un chemin d'URL (`/nestjs-open/en/x` devient `/en/x`). */
export const sansBase = (chemin: string): string => (BASE && chemin.startsWith(BASE) ? chemin.slice(BASE.length) || '/' : chemin);
