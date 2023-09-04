import db from '$lib/database';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
	const deckId = Number(url.searchParams.get('id'));

	const dbDeck = await db.deck.findUnique({
		include: {
			author: true,
			cards: true
		},
		where: {
			id: deckId
		}
	});

	if (!dbDeck) throw error(404, 'deck not found.');

	const deck: Deck = {
		...dbDeck,
		answerCards: dbDeck?.cards.filter((c) => c.isAnswer) as Card[],
		questionCards: dbDeck?.cards.filter((c) => !c.isAnswer) as Card[],
		code: `#DCK${dbDeck?.id}`
	};

	return json(deck);
};
