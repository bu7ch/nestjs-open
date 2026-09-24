// Progression dans les exercices, stockée dans localStorage (une clé par exercice).
// Toutes les lectures/écritures sont protégées : sans stockage, tout reste décoché
// et la page fonctionne normalement.

const PREFIXE = 'nestjs-open:exercice:';
/** Événement émis sur window quand une case change (pour mettre la sidebar à jour). */
export const EVENEMENT = 'nj:progression';

export function estFait(numero: string): boolean {
	try {
		return localStorage.getItem(PREFIXE + numero) === '1';
	} catch {
		return false;
	}
}

export function marquer(numero: string, fait: boolean): void {
	try {
		if (fait) localStorage.setItem(PREFIXE + numero, '1');
		else localStorage.removeItem(PREFIXE + numero);
	} catch {
		// Stockage indisponible (navigation privée, quota…) : on ignore.
	}
	window.dispatchEvent(new CustomEvent(EVENEMENT));
}

/** Numéros des exercices cochés, par exemple ['0.1', '8.5']. */
export function exercicesFaits(): string[] {
	const faits: string[] = [];
	try {
		for (let i = 0; i < localStorage.length; i++) {
			const cle = localStorage.key(i);
			if (cle?.startsWith(PREFIXE) && localStorage.getItem(cle) === '1') {
				faits.push(cle.slice(PREFIXE.length));
			}
		}
	} catch {
		// Stockage indisponible : aucune progression.
	}
	return faits;
}

/** Nombre d'exercices cochés par numéro de partie (« 8.5 » compte pour la partie 8). */
export function faitsParPartie(): Map<number, number> {
	const compte = new Map<number, number>();
	for (const numero of exercicesFaits()) {
		const partie = Number.parseInt(numero.split('.')[0] ?? '', 10);
		if (Number.isInteger(partie)) compte.set(partie, (compte.get(partie) ?? 0) + 1);
	}
	return compte;
}
