import { PlayerState, CardType, PlayerRole } from '../common';

export let mockPlayers: Player[] = [
	{
		id: 1,
		name: 'Player 1',
		state: PlayerState.Waiting,
		role: PlayerRole.Answerer,
		score: 13
	},
	{
		id: 2,
		name: 'Player 2',
		state: PlayerState.Waiting,
		role: PlayerRole.Answerer,
		score: 3
	},
	{
		id: 3,
		name: 'Player 3',
		state: PlayerState.Waiting,
		role: PlayerRole.Answerer,
		score: 32
	},
	{
		id: 4,
		name: 'Player 4',
		state: PlayerState.Waiting,
		role: PlayerRole.Answerer,
		score: 2
	},
	{
		id: 5,
		name: 'Player 5',
		state: PlayerState.Waiting,
		role: PlayerRole.Answerer,
		score: 12
	},
	{
		id: 6,
		name: 'Player 6',
		state: PlayerState.Choosing,
		role: PlayerRole.Answerer,
		score: 10
	},
	{
		id: 7,
		name: 'Player 7',
		state: PlayerState.Choosing,
		role: PlayerRole.Answerer,
		score: 7
	}
];

export let mockAnswerCards: Card[] = [
	{
		id: 1,
		text: 'carda 1',
		type: CardType.Answer
	},
	{
		id: 2,
		text: 'carda 2 - somethingloner here',
		type: CardType.Answer
	},
	{
		id: 3,
		text: 'carda 3 s a a sd  a sd',
		type: CardType.Answer
	},
	{
		id: 4,
		text: 'carda 4',
		type: CardType.Answer
	},
	{
		id: 5,
		text: 'carda 5 sdj ',
		type: CardType.Answer
	},
	{
		id: 6,
		text: 'card6',
		type: CardType.Answer
	},
	{
		id: 7,
		text: 'card6',
		type: CardType.Answer
	},
	{
		id: 8,
		text: 'card6',
		type: CardType.Answer
	},
	{
		id: 9,
		text: 'card6',
		type: CardType.Answer
	},
	{
		id: 10,
		text: 'card6',
		type: CardType.Answer
	}
];

export let mockAnswers: Answer[] = [
	{
		submiter: mockPlayers[0],
		card: {
			id: 10,
			text: 'answer of player 0',
			type: CardType.Answer
		}
	},
	{
		submiter: mockPlayers[1],
		card: {
			id: 11,
			text: 'answer of player 1',
			type: CardType.Answer
		}
	},
	{
		submiter: mockPlayers[2],
		card: {
			id: 12,
			text: 'answer of player 2',
			type: CardType.Answer
		}
	},
	{
		submiter: mockPlayers[3],
		card: {
			id: 13,
			text: 'answer of player 3',
			type: CardType.Answer
		}
	},
	{
		submiter: mockPlayers[4],
		card: {
			id: 14,
			text: 'answer of player 4',
			type: CardType.Answer
		}
	},
	{
		submiter: mockPlayers[5],
		card: {
			id: 15,
			text: 'answer of player 5',
			type: CardType.Answer
		}
	}
];

export let mockLoggedPlayer: Player = mockPlayers[6];

export let mockQuestionCards: Card[] = [
	{
		id: 100,
		text: 'Question card, give answer ___.',
		type: CardType.Question
	},
	{
		id: 102,
		text: 'question 2 - somethingloner here',
		type: CardType.Question
	},
	{
		id: 103,
		text: 'question 3 diosjdsodhsodh',
		type: CardType.Question
	},
	{
		id: 104,
		text: 'question 4',
		type: CardType.Question
	},
	{
		id: 105,
		text: 'question 5 sdj ',
		type: CardType.Question
	},
	{
		id: 106,
		text: 'question 6',
		type: CardType.Question
	},
	{
		id: 107,
		text: 'question 7',
		type: CardType.Question
	},
	{
		id: 108,
		text: 'question 8',
		type: CardType.Question
	},
	{
		id: 109,
		text: 'question 9',
		type: CardType.Question
	},
	{
		id: 110,
		text: 'question 10',
		type: CardType.Question
	}
];

export let mockQuestionCard: Card = mockQuestionCards[0];

export let mockUser: User = {
	id: 2137,
	name: 'mockUser'
};

export let mockDecksStats: DeckStats[] = [
	{
		id: 3001,
		name: 'deck1',
		code: '#d1',
		creator: mockUser,
		answerCardsCount: 30,
		questionCardsCount: 10
	},
	{
		id: 3002,
		name: 'deck2',
		code: '#d2',
		creator: mockUser,
		answerCardsCount: 30,
		questionCardsCount: 10
	},
	{
		id: 3003,
		name: 'deck3',
		code: '#d3',
		creator: mockUser,
		answerCardsCount: 30,
		questionCardsCount: 10
	},
	{
		id: 3004,
		name: 'deck4',
		code: '#d4',
		creator: mockUser,
		answerCardsCount: 30,
		questionCardsCount: 10
	},
	{
		id: 3005,
		name: 'deck5',
		code: '#d5',
		creator: mockUser,
		answerCardsCount: 30,
		questionCardsCount: 10
	}
];
