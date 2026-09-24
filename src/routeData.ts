// Middleware de route Starlight, exécuté au rendu de chaque page :
// 1. garde-fou : vérifie la cohérence des exercices (frontmatter, numéros) et fait
//    échouer le build en cas d'erreur (en dev, l'erreur s'affiche dans la page) ;
// 2. ajoute le bloc d'exercices au sommaire « Sur cette page ». Son titre
//    (« Exercices 8.5 à 8.7 ») est rendu par un composant, donc absent des titres
//    Markdown utilisés par Starlight : on le retrouve dans la source MDX.
import { getCollection } from 'astro:content';
import { defineRouteMiddleware } from '@astrojs/starlight/route-data';
import { verifierDoublons, verifierPage } from './verifierExercices';

const BLOC = /<Exercices\b([^>]*)>/g;
const attribut = (attrs: string, nom: string) =>
	Number(new RegExp(`\\b${nom}=\\{(\\d+)\\}`).exec(attrs)?.[1]);

// Doublons entre pages : calculé une fois pour tout le site.
let doublons: Promise<string[]> | undefined;
const doublonsDuSite = () =>
	(doublons ??= getCollection('docs').then((pages) =>
		verifierDoublons(pages.map((p) => ({ id: p.id, body: p.body ?? '', exercices: p.data.exercices }))),
	));

export const onRequest = defineRouteMiddleware(async (context) => {
	const { toc, entry } = context.locals.starlightRoute;
	const body = entry.body ?? '';

	const erreurs = [
		...verifierPage({ id: entry.id, body, exercices: entry.data.exercices }),
		...(await doublonsDuSite()).filter((e) => e.includes(`dans ${entry.id} `) || e.endsWith(`dans ${entry.id}.`)),
	];
	if (erreurs.length > 0) {
		throw new Error(
			`Exercices incohérents dans src/content/docs/${entry.id} :\n` +
				erreurs.map((e) => `  - ${e}`).join('\n'),
		);
	}

	if (!toc) return;
	for (const [, attrs] of body.matchAll(BLOC)) {
		const partie = attribut(attrs ?? '', 'partie');
		const de = attribut(attrs ?? '', 'de');
		const a = attribut(attrs ?? '', 'a');
		if ([partie, de, a].some(Number.isNaN)) continue;
		const text = context.locals.t('exercices.titre', {
			count: a - de + 1,
			de: `${partie}.${de}`,
			a: `${partie}.${a}`,
		});
		// Même id que dans src/components/Exercices.astro.
		toc.items.push({ depth: 2, slug: `exercices-${partie}-${de}`, text, children: [] });
	}
});
