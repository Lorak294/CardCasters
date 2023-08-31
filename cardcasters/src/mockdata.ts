import { PlayerState, CardType, PlayerRole } from './common';

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

export let mockQuestionCard: Card = {
	id: 2137,
	text: 'Question card, give answer ___.',
	type: CardType.Question
};
