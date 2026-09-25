// Tests du garde-fou « renvois entre pages » (lancer : npm test).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { verifierReferences, type PageReference } from '../src/verifierReferences.ts';

const exercice = (n: string) => `<Exercice numero="${n}" titre="T">x</Exercice>`;
const page = (id: string, body: string, prerequis?: string): PageReference => ({ id, body, prerequis });

const base = [
	page('partie-3/a-installer', exercice('3.1')),
	page('partie-3/d-injection', `${exercice('3.12')}`),
];

test('renvois valides : aucune erreur', () => {
	const pages = [...base, page('partie-4/a-dto', 'Voir l\'exercice 3.12 et la partie 3, section d.', 'Section a.')];
	assert.deepEqual(verifierReferences(pages), []);
});

test('exercice cité qui n\'existe pas', () => {
	const erreurs = verifierReferences([...base, page('partie-4/a-dto', 'Reprends l\'exercice 3.99.')]);
	assert.deepEqual(erreurs, ['partie-4/a-dto : l\'exercice 3.99 n\'existe pas.']);
});

test('plage d\'exercices : les deux bornes sont vérifiées', () => {
	const erreurs = verifierReferences([...base, page('partie-4/a-dto', 'Les exercices 3.1 à 3.50.')]);
	assert.equal(erreurs.length, 1);
	assert.match(erreurs[0]!, /3\.50/);
});

test('section citée qui n\'existe pas, dans les deux formulations', () => {
	const erreurs = verifierReferences([
		...base,
		page('partie-4/a-dto', 'Comme en partie 3, section z, puis la section q de la partie 3.'),
	]);
	assert.equal(erreurs.length, 2);
});

test('prérequis qui cite une section absente de la partie', () => {
	const erreurs = verifierReferences([...base, page('partie-4/a-dto', 'Texte', 'Sections a et c.')]);
	assert.deepEqual(erreurs, ['partie-4/a-dto : le prérequis cite la section c, absente de la partie 4.']);
});

test('les exemples dans des blocs de code sont ignorés', () => {
	const body = 'Texte\n\n```mdx\nVoir l\'exercice 9.9 et la partie 9, section z.\n```';
	assert.deepEqual(verifierReferences([...base, page('partie-4/a-dto', body)]), []);
});

test('tout le contenu français du cours a des renvois valides', () => {
	const racine = join(import.meta.dirname, '..', 'src', 'content', 'docs');
	const pages: PageReference[] = [];
	for (const nom of readdirSync(racine).filter((n) => /^partie-\d+$/.test(n))) {
		for (const fichier of readdirSync(join(racine, nom)).filter((f) => /\.mdx?$/.test(f))) {
			const source = readFileSync(join(racine, nom, fichier), 'utf8');
			const prerequis = /^prerequis: (.*)$/m.exec(source)?.[1];
			pages.push({ id: `${nom}/${fichier.replace(/\.mdx?$/, '')}`, body: source, prerequis });
		}
	}
	assert.ok(pages.length > 50, 'le contenu du cours doit être trouvé');
	assert.deepEqual(verifierReferences(pages), []);
});
