// Parties du cours : dossier dans src/content/docs/ + libellés FR/EN.
// Source unique partagée par la sidebar (astro.config.mjs) et l'accueil.
export const parties = [
	['partie-0', 'Les fondamentaux du web', 'Web fundamentals'],
	['partie-1', 'JavaScript et TypeScript', 'JavaScript and TypeScript'],
	['partie-2', 'Node.js et un premier serveur', 'Node.js and a first server'],
	['partie-3', 'Premiers pas avec NestJS', 'First steps with NestJS'],
	['partie-4', 'Valider les données', 'Validating data'],
	['partie-5', 'Base de données', 'Databases'],
	['partie-6', 'Tester son API', 'Testing your API'],
	['partie-7', 'Authentification', 'Authentication'],
	['partie-8', "Le cycle de vie d'une requête", 'The request lifecycle'],
	['partie-9', 'Concevoir une API propre', 'Designing a clean API'],
	['partie-10', 'Mise en production', 'Going to production'],
	['partie-11', 'Aller plus loin', 'Going further'],
	['partie-12', 'Projets de fin de parcours', 'Capstone projects'],
];

// Les trois étapes du parcours (page d'accueil) : indices de début et de fin inclus.
export const etapes = [
	{
		de: 0,
		a: 2,
		fr: { titre: 'Les bases', resume: 'Avant NestJS : le web, le langage, Node.' },
		en: { titre: 'The basics', resume: 'Before NestJS: the web, the language, Node.' },
	},
	{
		de: 3,
		a: 9,
		fr: { titre: 'NestJS', resume: 'Le cœur du cours, avec le Loup-Garou.' },
		en: { titre: 'NestJS', resume: 'The heart of the course, with the Werewolf game.' },
	},
	{
		de: 10,
		a: 12,
		fr: { titre: 'En production', resume: 'Déployer, puis passer à l’échelle.' },
		en: { titre: 'In production', resume: 'Deploy, then scale up.' },
	},
];
