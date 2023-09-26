type User = {
	email: string;
	username: string;
};

type Deck = {
	name: string;
	author: User;
};

type Card = {
	text: string;
	isAnswer: boolean;
	deck: Deck;
};

export let mockUserData: User[] = [
	{
		email: 'user1@yopmail.com',
		username: 'user1'
	},
	{
		email: 'user2@yopmail.com',
		username: 'user2'
	},
	{
		email: 'user3@yopmail.com',
		username: 'user3'
	}
];

export let mockDeckData: Deck[] = [
	{
		name: 'Deck1',
		author: mockUserData[0]
	},
	{
		name: 'Deck2',
		author: mockUserData[1]
	},
	{
		name: 'Deck3',
		author: mockUserData[2]
	}
];

export let mockCardData: Card[] = [
	{
		text: 'd1 answer1',
		isAnswer: true,
		deck: mockDeckData[0]
	},
	{
		text: 'd2 answer1',
		isAnswer: true,
		deck: mockDeckData[1]
	},
	{
		text: 'd3 question1',
		isAnswer: false,
		deck: mockDeckData[2]
	}
];
