import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

import db from '$lib/database';

function getDeckCountFromQuery(deckId: string, queryRes: any[]): number {
	let record = queryRes.find((r) => r.id === deckId);
	if (record) {
		let strCount = String(record.count);
		return +strCount;
	} else return 0;
}

export const GET: RequestHandler = async () => {
	const questonsCountRes: any[] = await db.$queryRaw`
	SELECT COUNT("Card"."id") AS count, "Deck"."id" 
	FROM "Deck"
	JOIN "Card" ON "Card"."deckId" = "Deck"."id"
	WHERE "Card"."isAnswer" = false
	GROUP BY "Deck"."id" `;

	const answersCountRes: any[] = await db.$queryRaw`
	SELECT COUNT("Card"."id") AS count, "Deck"."id" 
	FROM "Deck"
	JOIN "Card" ON "Card"."deckId" = "Deck"."id"
	WHERE "Card"."isAnswer" = true
	GROUP BY "Deck"."id" `;

	const decks = await db.deck.findMany({
		include: {
			author: true
		}
	});

	let summaries = decks.map((deck) => {
		return {
			id: deck.id,
			creator: deck.author,
			name: deck.name,
			answerCardsCount: getDeckCountFromQuery(deck.id, answersCountRes),
			questionCardsCount: getDeckCountFromQuery(deck.id, questonsCountRes),
			code: deck.id
		};
	});

	return json(summaries);
};
