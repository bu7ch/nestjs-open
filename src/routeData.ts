// Ajoute le bloc d'exercices d'une leçon au sommaire « Sur cette page ».
// Le titre (« Exercices 8.5 à 8.7 ») est rendu par un composant, donc absent des
// titres Markdown que Starlight utilise : on le retrouve dans la source MDX.
import { defineRouteMiddleware } from '@astrojs/starlight/route-data';

const BLOC = /<Exercices\b([^>]*)>/g;
const attribut = (attrs: string, nom: string) =>
	Number(new RegExp(`\\b${nom}=\\{(\\d+)\\}`).exec(attrs)?.[1]);

export const onRequest = defineRouteMiddleware((context) => {
	const { toc, entry } = context.locals.starlightRoute;
	if (!toc || !entry.body) return;
	for (const [, attrs] of entry.body.matchAll(BLOC)) {
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
