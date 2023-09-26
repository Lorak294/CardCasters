import db from '$lib/database';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

// GET .../deck{deckid}
export const GET: RequestHandler = async ({ url }) => {
	const deckId = String(url.searchParams.get('id'));

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
		code: dbDeck?.id
	};

	return json(deck);
};

// POST .../deck
export const POST: RequestHandler = async ({ request }) => {
	const req: DeckCreationRequest = await request.json();
	console.log(req);

	return new Response('');
};

type DeckCreationRequest = {
	name: string;
	authorId: number;
};
