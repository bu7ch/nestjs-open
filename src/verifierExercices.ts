// Garde-fou : cohérence entre le frontmatter `exercices` et les <Exercice> d'une page.
// La sidebar compte les exercices par partie à partir du frontmatter, et les cases
// cochées à partir des numéros (« 8.5 » → partie 8) : une incohérence fausserait la
// progression sans rien signaler. Appelé par src/routeData.ts à chaque rendu de page
// (le build échoue), testé par tests/verifierExercices.test.ts.

export interface PageExercices {
	/** Identifiant de l'entrée docs, par exemple « partie-8/c-interceptors ». */
	id: string;
	/** Source MDX de la page. */
	body: string;
	/** Valeur du champ `exercices` du frontmatter. */
	exercices: number | undefined;
}

interface Bloc {
	partie: number;
	de: number;
	a: number;
	numeros: string[];
}

/** Retire les blocs de code (``` ou ~~~) pour ne pas compter les exemples qu'ils montrent. */
const sansBlocsDeCode = (body: string) => body.replace(/^(```|~~~)[^\n]*\n[\s\S]*?^\1[ \t]*$/gm, '');

const numerosDe = (source: string) =>
	[...source.matchAll(/<Exercice\b(?!s)[^>]*?\bnumero=["']([^"']*)["']/g)].map((m) => m[1] ?? '');

const nombreDExercices = (source: string) => source.match(/<Exercice\b(?!s)/g)?.length ?? 0;

function blocsDe(source: string): Bloc[] {
	return [...source.matchAll(/<Exercices\b([^>]*)>([\s\S]*?)<\/Exercices>/g)].map((m) => {
		const attrs = m[1] ?? '';
		const nombre = (nom: string) => Number(new RegExp(`\\b${nom}=\\{(\\d+)\\}`).exec(attrs)?.[1]);
		return { partie: nombre('partie'), de: nombre('de'), a: nombre('a'), numeros: numerosDe(m[2] ?? '') };
	});
}

/** Partie d'après le dossier : « partie-8/… » ou « en/partie-8/… » → 8. */
const partieDuDossier = (id: string) => {
	const m = /^(?:[a-z]{2}\/)?partie-(\d+)\//.exec(id);
	return m ? Number(m[1]) : undefined;
};

/** Langue d'après l'identifiant : « en/… » → « en », sinon la langue par défaut. */
const langueDe = (id: string) => /^([a-z]{2})\//.exec(id)?.[1] ?? 'fr';

/** Erreurs de cohérence d'une page (tableau vide si tout va bien). */
export function verifierPage({ id, body, exercices }: PageExercices): string[] {
	const source = sansBlocsDeCode(body);
	const erreurs: string[] = [];

	const presents = nombreDExercices(source);
	const declares = exercices ?? 0;
	if (presents !== declares) {
		erreurs.push(
			`le frontmatter indique « exercices: ${declares} » mais la page contient ${presents} <Exercice>.`,
		);
	}

	const dossier = partieDuDossier(id);
	for (const bloc of blocsDe(source)) {
		const { partie, de, a, numeros } = bloc;
		if ([partie, de, a].some(Number.isNaN)) {
			erreurs.push('un <Exercices> doit avoir partie={N}, de={N} et a={N}.');
			continue;
		}
		if (dossier !== undefined && partie !== dossier) {
			erreurs.push(`<Exercices partie={${partie}}> est dans le dossier partie-${dossier}.`);
		}
		const attendus = Array.from({ length: Math.max(0, a - de + 1) }, (_, i) => `${partie}.${de + i}`);
		if (numeros.length !== attendus.length) {
			erreurs.push(
				`le bloc « ${partie}.${de} à ${partie}.${a} » annonce ${attendus.length} exercices mais contient ${numeros.length} <Exercice>.`,
			);
		}
		numeros.forEach((numero, i) => {
			const attendu = attendus[i];
			if (attendu !== undefined && numero !== attendu) {
				erreurs.push(`<Exercice numero="${numero}"> : le numéro attendu à cette place est ${attendu}.`);
			}
		});
	}
	return erreurs;
}

/**
 * Erreurs de numéros en double entre pages d'une même langue : chaque numéro est une
 * clé de stockage des cases cochées, deux exercices ne peuvent pas la partager.
 */
export function verifierDoublons(pages: PageExercices[]): string[] {
	const vus = new Map<string, string>();
	const erreurs: string[] = [];
	for (const page of pages) {
		for (const numero of numerosDe(sansBlocsDeCode(page.body))) {
			const cle = `${langueDe(page.id)}:${numero}`;
			const deja = vus.get(cle);
			if (deja === undefined) vus.set(cle, page.id);
			else if (deja !== page.id) {
				erreurs.push(`l'exercice ${numero} existe dans ${deja} et dans ${page.id}.`);
			}
		}
	}
	return erreurs;
}
