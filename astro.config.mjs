// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// Chaque partie du cours : dossier dans src/content/docs/ + libellés FR/EN.
const parties = [
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

export default defineConfig({
	integrations: [
		starlight({
			title: { fr: 'NestJS Open', en: 'NestJS Open' },
			description: 'Apprendre le développement backend avec NestJS, de zéro.',
			// Français à la racine (/), anglais sous /en/.
			defaultLocale: 'root',
			locales: {
				root: { label: 'Français', lang: 'fr' },
				en: { label: 'English', lang: 'en' },
			},
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/TON-COMPTE/nestjs-open' }],
			editLink: { baseUrl: 'https://github.com/TON-COMPTE/nestjs-open/edit/main/' },
			customCss: ['./src/styles/custom.css'],
			sidebar: [
				{
					label: 'Le cours',
					translations: { en: 'The course' },
					items: [{ slug: 'a-propos' }],
				},
				...parties.map(([dir, fr, en], i) => ({
					label: `${i} · ${fr}`,
					translations: { en: `${i} · ${en}` },
					collapsed: true,
					items: [{ autogenerate: { directory: dir } }],
				})),
			],
		}),
	],
});
