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

interface User {
	id: number;
	name: string;
}

interface Deck {
	id: number;
	creator: User;
	name: string;
	code: string;
	answerCards: Card[];
	questionCards: Card[];
}

interface DeckStats {
	id: number;
	creator: User;
	name: string;
	code: string;
	answerCardsCount: number;
	questionCardsCount: number;
}
