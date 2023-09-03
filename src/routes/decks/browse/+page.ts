import { mockDecksStats } from '../../../lib/mockdata';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	// later fetch call to api or smth

	const res = await fetch('/api/decks');
	const deckSummaries = (await res.json()) as DeckSummary[];

	return {
		deckSummaries
	};
};
