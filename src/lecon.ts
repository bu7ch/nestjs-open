// Situe une page dans le cours : numéro et titre de la partie, lettre de section.
// Sert au fil d'Ariane (PageTitle) et au libellé mobile du header (SiteTitle).
import { parties } from './parties.mjs';

export interface Situation {
	partie: number;
	titrePartie: string;
	hrefPartie: string;
	/** Lettre de la section (« a » pour partie-0/a-le-web), absente sur l'introduction. */
	lettre?: string;
}

/** `id` : identifiant de l'entrée docs (« partie-8/c-interceptors » ou « en/partie-8/… »). */
export function situer(id: string, locale: string | undefined): Situation | undefined {
	const m = /^(?:en\/)?partie-(\d+)(?:\/(.*))?$/.exec(id);
	if (!m) return undefined;
	const partie = Number(m[1]);
	const infos = parties[partie];
	if (!infos) return undefined;
	const en = locale === 'en';
	const slug = m[2] ?? '';
	const lettre = /^([a-z])-/.exec(slug)?.[1];
	return {
		partie,
		titrePartie: en ? infos[2] : infos[1],
		hrefPartie: `${en ? '/en' : ''}/${infos[0]}/`,
		lettre,
	};
}
