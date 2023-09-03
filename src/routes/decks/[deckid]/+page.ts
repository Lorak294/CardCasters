import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = (({ params }) => {
	// load data from api here

	if (params.deckid === '2137') {
		return {
			deckid: '2137',
			content: ['card1', 'card2']
		};
	}
	throw error(404, 'Not found');
}) satisfies PageLoad;
