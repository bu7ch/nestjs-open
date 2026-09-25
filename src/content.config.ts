import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { docsLoader, i18nLoader } from '@astrojs/starlight/loaders';
import { docsSchema, i18nSchema } from '@astrojs/starlight/schema';

export const collections = {
	docs: defineCollection({
		loader: docsLoader(),
		schema: docsSchema({
			extend: z.object({
				/** Projet fil rouge de la leçon (badge sous le titre). */
				projet: z.enum(['loup-garou', 'marketplace']).optional(),
				/** Durée estimée, en minutes. */
				duree: z.number().int().positive().optional(),
				/** Ce qu'il faut avoir fait avant : encadré « Avant de commencer ». */
				prerequis: z.string().optional(),
				/** Nombre d'exercices de la section (sert aussi au calcul de la progression). */
				exercices: z.number().int().nonnegative().optional(),
				/** Section facultative : ses exercices ne comptent pas pour terminer la partie. */
				bonus: z.boolean().optional(),
			}),
		}),
	}),
	// Chaînes d'interface FR/EN (src/content/i18n/*.json), y compris nos clés maison.
	i18n: defineCollection({
		loader: i18nLoader(),
		schema: i18nSchema({
			extend: z.object({
				'theme.versNuit': z.string().optional(),
				'theme.versJour': z.string().optional(),
				'accueil.prerequis': z.string().optional(),
				'accueil.panneau.label': z.string().optional(),
				'accueil.panneau.connexion': z.string().optional(),
				'accueil.panneau.legende': z.string().optional(),
				'lecon.projet.loup-garou': z.string().optional(),
				'lecon.projet.marketplace': z.string().optional(),
				'lecon.duree': z.string().optional(),
				'lecon.exercices_one': z.string().optional(),
				'lecon.exercices_other': z.string().optional(),
				'lecon.avantDeCommencer': z.string().optional(),
				'lecon.filAriane': z.string().optional(),
				'lecon.partie': z.string().optional(),
				'lecon.section': z.string().optional(),
				'lecon.contexte': z.string().optional(),
				'exercices.titre_one': z.string().optional(),
				'exercices.titre_other': z.string().optional(),
				'exercices.verifier': z.string().optional(),
				'progression.titre': z.string().optional(),
				'progression.parties_one': z.string().optional(),
				'progression.parties_other': z.string().optional(),
				'progression.exercices_one': z.string().optional(),
				'progression.exercices_other': z.string().optional(),
				'progression.terminee': z.string().optional(),
				'progression.nav': z.string().optional(),
				'pagination.sectionSuivante': z.string().optional(),
				'pagination.nav': z.string().optional(),
				'entete.nav': z.string().optional(),
				'entete.parcours': z.string().optional(),
				'entete.commentCaMarche': z.string().optional(),
				'langue.vers': z.string().optional(),
			}),
		}),
	}),
};
