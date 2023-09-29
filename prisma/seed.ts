import { Prisma, PrismaClient, Profile, Deck } from '@prisma/client';
const client = new PrismaClient();

const getProfiles = (): Prisma.ProfileCreateInput[] => [
	{ email: 'test1@yopmail.com', name: 'Test User 1' },
	{ email: 'test2@yopmail.com', name: 'Test User 2' },
	{ email: 'test3@yopmail.com', name: 'Test User 3' },
	{ email: 'test4@yopmail.com', name: 'Test User 4' }
];

const getDecks = (profiles: Profile[]): Prisma.DeckCreateInput[] => [
	{ author: { connect: { id: profiles[0].id } }, name: 'Deck 1' },
	{ author: { connect: { id: profiles[1].id } }, name: 'Deck 2' },
	{ author: { connect: { id: profiles[2].id } }, name: 'Deck 3' },
	{ author: { connect: { id: profiles[3].id } }, name: 'Deck 4' }
];

const getCards = (decks: Deck[]): Prisma.CardCreateInput[] => [
	{ deck: { connect: { id: decks[0].id } }, text: 'answer1', isAnswer: true },
	{ deck: { connect: { id: decks[0].id } }, text: 'answer2', isAnswer: true },
	{ deck: { connect: { id: decks[0].id } }, text: 'question1', isAnswer: false },
	{ deck: { connect: { id: decks[0].id } }, text: 'question2', isAnswer: false },
	{ deck: { connect: { id: decks[1].id } }, text: 'answer3', isAnswer: true },
	{ deck: { connect: { id: decks[1].id } }, text: 'question3', isAnswer: false },
	{ deck: { connect: { id: decks[2].id } }, text: 'answer4', isAnswer: true },
	{ deck: { connect: { id: decks[2].id } }, text: 'question4', isAnswer: false },
	{ deck: { connect: { id: decks[3].id } }, text: 'answer5', isAnswer: true },
	{ deck: { connect: { id: decks[3].id } }, text: 'question5', isAnswer: false }
];

const main = async () => {
	const profiles = await Promise.all(getProfiles().map((p) => client.profile.create({ data: p })));
	const decks = await Promise.all(getDecks(profiles).map((d) => client.deck.create({ data: d })));
	const cards = await Promise.all(getCards(decks).map((c) => client.card.create({ data: c })));
};

main();
