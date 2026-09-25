// Garde-fou : les renvois d'une page à une autre (« exercice 5.13 », « partie 7, section c »,
// « Section b » dans `prerequis`) doivent pointer vers quelque chose qui existe. Testé par
// tests/references.test.ts, qui l'applique aussi à tout le contenu français du cours.
import { numerosDExercices, sansBlocsDeCode } from './verifierExercices.ts';

export interface PageReference {
	/** Identifiant de l'entrée docs, par exemple « partie-8/c-les-guards-de-jeu ». */
	id: string;
	/** Source de la page (frontmatter compris ou non : seul le corps est analysé). */
	body: string;
	/** Valeur du champ `prerequis` du frontmatter, s'il existe. */
	prerequis?: string | undefined;
}

const dossier = /^partie-(\d+)\/(?:([a-z])-|index)/;

/** Erreurs de renvois d'un ensemble de pages (tableau vide si tout va bien). */
export function verifierReferences(pages: PageReference[]): string[] {
	const exercices = new Set<string>();
	const sections = new Set<string>();
	for (const page of pages) {
		for (const numero of numerosDExercices(page.body)) exercices.add(numero);
		const m = dossier.exec(page.id);
		if (m?.[2]) sections.add(`${m[1]}${m[2]}`);
	}

	const erreurs: string[] = [];
	for (const page of pages) {
		const texte = sansBlocsDeCode(page.body);
		const partie = dossier.exec(page.id)?.[1];

		for (const m of texte.matchAll(/[Ee]xercices? (\d+\.\d+)(?: (?:à|et|,) (\d+\.\d+))?/g)) {
			for (const numero of [m[1], m[2]]) {
				if (numero && !exercices.has(numero)) erreurs.push(`${page.id} : l'exercice ${numero} n'existe pas.`);
			}
		}
		for (const m of texte.matchAll(/partie (\d+),? section ([a-z])/g)) {
			if (!sections.has(`${m[1]}${m[2]}`)) erreurs.push(`${page.id} : « ${m[0]} » n'existe pas.`);
		}
		for (const m of texte.matchAll(/section ([a-z]) de la partie (\d+)/g)) {
			if (!sections.has(`${m[2]}${m[1]}`)) erreurs.push(`${page.id} : « ${m[0]} » n'existe pas.`);
		}
		if (page.prerequis && partie) {
			for (const m of page.prerequis.matchAll(/Sections? ([a-z])(?: et ([a-z]))?/g)) {
				for (const lettre of [m[1], m[2]]) {
					if (lettre && !sections.has(`${partie}${lettre}`)) {
						erreurs.push(`${page.id} : le prérequis cite la section ${lettre}, absente de la partie ${partie}.`);
					}
				}
			}
		}
	}
	return erreurs;
}
