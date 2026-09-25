// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { parties } from './src/parties.mjs';
import { GITHUB } from './src/site.mjs';

export default defineConfig({
	// GitHub Pages : https://bu7ch.github.io/nestjs-open/
	site: 'https://bu7ch.github.io',
	base: '/nestjs-open',
	integrations: [
		starlight({
			title: { fr: 'NestJS Open', en: 'NestJS Open' },
			description: 'Apprendre le développement backend avec NestJS, de zéro.',
			// Croissant de lune : accent jour sur fond clair, accent nuit sur fond sombre.
			logo: { light: './src/assets/logo.svg', dark: './src/assets/logo-nuit.svg', alt: '' },
			// Français à la racine (/), anglais sous /en/.
			defaultLocale: 'root',
			locales: {
				root: { label: 'Français', lang: 'fr' },
				en: { label: 'English', lang: 'en' },
			},
			social: [{ icon: 'github', label: 'GitHub', href: GITHUB }],
			editLink: { baseUrl: `${GITHUB}/edit/main/` },
			customCss: [
				'@fontsource-variable/bricolage-grotesque',
				'@fontsource/atkinson-hyperlegible/400.css',
				'@fontsource/atkinson-hyperlegible/700.css',
				'@fontsource/jetbrains-mono/400.css',
				'@fontsource/jetbrains-mono/600.css',
				'./src/styles/custom.css',
			],
			// Ajoute « Exercices N.x à N.y » au sommaire « Sur cette page ».
			routeMiddleware: './src/routeData.ts',
			components: {
				// Bascule jour/nuit au lieu du <select> Clair/Sombre/Auto.
				ThemeSelect: './src/components/ThemeSelect.astro',
				// Hero de l'accueil à deux colonnes (texte + panneau de réponse d'API).
				Hero: './src/components/accueil/Hero.astro',
				// Leçons : badges et prérequis sous le titre, barre de lecture sur mobile.
				PageTitle: './src/components/PageTitle.astro',
				// Progression et pastilles par partie.
				Sidebar: './src/components/Sidebar.astro',
				// Précédent / Suivant : cartes, ou barre fixe en bas sur mobile.
				Pagination: './src/components/Pagination.astro',
				// Sur mobile, « Partie 8, section c » à côté du logo.
				SiteTitle: './src/components/SiteTitle.astro',
				// En-tête des maquettes (liens sur l'accueil, bouton FR/EN, pas de <select>).
				Header: './src/components/Header.astro',
				MobileMenuFooter: './src/components/MobileMenuFooter.astro',
			},
			sidebar: [
				{
					label: 'Le cours',
					translations: { en: 'The course' },
					items: [{ slug: 'a-propos' }],
				},
				// Le numéro de partie est affiché dans une pastille (src/components/SidebarListe.astro).
				...parties.map(([dir, fr, en]) => ({
					label: fr,
					translations: { en },
					collapsed: true,
					items: [{ autogenerate: { directory: dir } }],
				})),
			],
		}),
	],
});
