import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

//import db from '$lib/database';

// function getDeckCountFromQuery(deckId: string, queryRes: any[]): number {
// 	let record = queryRes.find((r) => r.id === deckId);
// 	if (record) {
// 		let strCount = String(record.count);
// 		return +strCount;
// 	} else return 0;
// }

// export const GET: RequestHandler = async () => {
// 	const questonsCountRes: any[] = await db.$queryRaw`
// 	SELECT COUNT(card.id) AS 'count', deck.id
// 	FROM deck
// 	JOIN card ON card.deckId = deck.id
// 	WHERE card.isAnswer = 0
// 	GROUP BY deck.id `;

// 	const answersCountRes: any[] = await db.$queryRaw`
// 	SELECT COUNT(card.id) AS 'count', deck.id
// 	FROM deck
// 	JOIN card ON card.deckId = deck.id
// 	WHERE card.isAnswer = 1
// 	GROUP BY deck.id `;

// 	const decks = await db.deck.findMany({
// 		include: {
// 			author: true
// 		}
// 	});

// 	let summaries = decks.map((deck) => {
// 		return {
// 			id: deck.id,
// 			creator: deck.author satisfies User,
// 			name: deck.name,
// 			answerCardsCount: getDeckCountFromQuery(deck.id, answersCountRes),
// 			questionCardsCount: getDeckCountFromQuery(deck.id, questonsCountRes),
// 			code: deck.id
// 		} satisfies DeckSummary;
// 	});

// 	return json(summaries);
// };
