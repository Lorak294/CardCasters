// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}
}

//export {};

interface Card {
	id: number;
	text: string;
	type: CardType;
}

interface Player {
	id: number;
	name: string;
	score: number;
	state: PlayerState;
	role: PlayerRole;
}

interface Answer {
	submiter: Player;
	card: Card;
}

// interface AnswersStoreState {
// 	answers: Answer[];
// 	selectedAnswe?: Answer;
// 	choiceConfirmed: boolean;
// }

// interface OwnCardsStoreState {
// 	cards: Card[];
// 	selectedCard?: Card;
// 	choiceConfirmed: boolean;
// }
