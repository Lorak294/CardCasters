import { PrismaClient } from '@prisma/client';
import { mockCardData } from './mockData';

const db = new PrismaClient();

async function main() {
	console.log('Initializing seeding...');

	let i = 1;
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
								username: c.deck.author.username,
								email: c.deck.author.email
							}
						}
					}
				}
			}
		});
		console.log(`created card [id: ${card.id}] in deck [id:${card.deckId}]`);
	}
	console.log('Seeding completed!');
}

main();
