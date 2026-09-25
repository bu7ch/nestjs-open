// Tests du garde-fou « nombre d'exercices » (lancer : npm test).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { verifierPage, verifierDoublons, numerosDExercices } from '../src/verifierExercices.ts';

const bloc = (partie: number, de: number, a: number, numeros: string[]) =>
	`<Exercices partie={${partie}} de={${de}} a={${a}}>\n` +
	numeros.map((n) => `\t<Exercice numero="${n}" titre="T">Consigne</Exercice>`).join('\n') +
	'\n</Exercices>';

test('page cohérente : aucune erreur', () => {
	const body = `Texte\n\n${bloc(0, 1, 2, ['0.1', '0.2'])}`;
	assert.deepEqual(verifierPage({ id: 'partie-0/a-le-web', body, exercices: 2 }), []);
});

test('page sans exercice ni frontmatter : aucune erreur', () => {
	assert.deepEqual(verifierPage({ id: 'partie-0/index', body: 'Texte', exercices: undefined }), []);
});

test('frontmatter différent du nombre de <Exercice>', () => {
	const body = bloc(0, 1, 2, ['0.1', '0.2']);
	const erreurs = verifierPage({ id: 'partie-0/a-le-web', body, exercices: 3 });
	assert.equal(erreurs.length, 1);
	assert.match(erreurs[0]!, /exercices: 3.*2 <Exercice>/);
});

test('des <Exercice> sans champ exercices dans le frontmatter', () => {
	const erreurs = verifierPage({ id: 'partie-0/a-le-web', body: bloc(0, 1, 1, ['0.1']), exercices: undefined });
	assert.equal(erreurs.length, 1);
	assert.match(erreurs[0]!, /exercices: 0.*1 <Exercice>/);
});

test('numéro qui ne suit pas la plage de <Exercices>', () => {
	const erreurs = verifierPage({ id: 'partie-0/a-le-web', body: bloc(0, 1, 2, ['0.1', '0.3']), exercices: 2 });
	assert.equal(erreurs.length, 1);
	assert.match(erreurs[0]!, /0\.3.*0\.2/);
});

test('plage de <Exercices> plus longue que les exercices présents', () => {
	const erreurs = verifierPage({ id: 'partie-0/a-le-web', body: bloc(0, 1, 3, ['0.1', '0.2']), exercices: 2 });
	assert.ok(erreurs.some((e) => /0\.1 à 0\.3.*2 <Exercice>/.test(e)));
});

test('bloc déclaré dans une autre partie que le dossier', () => {
	const erreurs = verifierPage({ id: 'partie-8/c-interceptors', body: bloc(7, 1, 1, ['7.1']), exercices: 1 });
	assert.ok(erreurs.some((e) => /partie=\{7\}.*partie-8/.test(e)));
});

test('les pages anglaises sont situées dans la même partie', () => {
	const body = bloc(8, 5, 5, ['8.5']);
	assert.deepEqual(verifierPage({ id: 'en/partie-8/c-interceptors', body, exercices: 1 }), []);
});

test('les exemples dans des blocs de code sont ignorés', () => {
	const body = '```mdx\n<Exercice numero="9.9" titre="Exemple">…</Exercice>\n```\n\nTexte';
	assert.deepEqual(verifierPage({ id: 'partie-0/a-le-web', body, exercices: undefined }), []);
});

test('doublons de numéro entre pages d’une même langue', () => {
	const pages = [
		{ id: 'partie-0/a-le-web', body: bloc(0, 1, 1, ['0.1']), exercices: 1 },
		{ id: 'partie-0/b-outils', body: bloc(0, 1, 1, ['0.1']), exercices: 1 },
		{ id: 'en/partie-0/a-le-web', body: bloc(0, 1, 1, ['0.1']), exercices: 1 },
	];
	const erreurs = verifierDoublons(pages);
	assert.equal(erreurs.length, 1);
	assert.match(erreurs[0]!, /0\.1.*partie-0\/a-le-web.*partie-0\/b-outils/);
});

test('numerosDExercices liste les numéros, sans ceux des exemples en blocs de code', () => {
	const body = `${bloc(5, 19, 20, ['5.19', '5.20'])}\n\n\`\`\`mdx\n<Exercice numero="9.9" titre="Exemple">x</Exercice>\n\`\`\``;
	assert.deepEqual(numerosDExercices(body), ['5.19', '5.20']);
});
