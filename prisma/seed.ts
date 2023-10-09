import { Prisma, PrismaClient, User, Deck } from '@prisma/client';
const client = new PrismaClient();

const getUsers = (): Prisma.UserCreateInput[] => [
	{ email: 'test1@yopmail.com', username: 'Test User 1' },
	{ email: 'test2@yopmail.com', username: 'Test User 2' },
	{ email: 'test3@yopmail.com', username: 'Test User 3' },
	{ email: 'test4@yopmail.com', username: 'Test User 4' }
];

const getDecks = (users: User[]): Prisma.DeckCreateInput[] => [
	{ author: { connect: { id: users[0].id } }, name: 'Deck 1' },
	{ author: { connect: { id: users[1].id } }, name: 'Deck 2' },
	{ author: { connect: { id: users[2].id } }, name: 'Deck 3' },
	{ author: { connect: { id: users[3].id } }, name: 'Deck 4' }
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
	const users = await Promise.all(getUsers().map((u) => client.user.create({ data: u })));
	const decks = await Promise.all(getDecks(users).map((d) => client.deck.create({ data: d })));
	const cards = await Promise.all(getCards(decks).map((c) => client.card.create({ data: c })));
};

main();
