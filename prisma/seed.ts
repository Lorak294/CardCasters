import { PrismaClient } from '@prisma/client';
import { mockCardData } from './mockdata';

const db = new PrismaClient();

async function main() {
	console.log('Initializing seeding...');

	for (const c of mockCardData) {
		const card = await db.card.create({
			data: {
				text: c.text,
				isAnswer: c.isAnswer,
				deck: {
					create: {
						name: c.deck.name,
						author: {
							create: {
								name: c.deck.author.name,
								email: c.deck.author.email
							}
						}
					}
				}
			}
		});
		console.log(`created card with id: ${card.id} in deck ${card.deckId}`);
	}
	console.log('Seeding completed!');
}

main();
