import { mockDecksStats } from '../../../lib/mockdata';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	// later fetch call to api or smth

	const res = await fetch('/api/decks');
	const deckStats = (await res.json()) as DeckStats[];

	return {
		deckStats
	};
};
