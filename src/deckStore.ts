import { writable, get, type Writable } from 'svelte/store';
import { mockAnswerCards, mockQuestionCard, mockQuestionCards, mockUser } from './mockdata';

class DeckStateStore {
	creator: Writable<User>;
	answers: Writable<Card[]>;
	questions: Writable<Card[]>;
	name: Writable<string>;
	selectedCard: Writable<Card | undefined>;

	constructor(user: User) {
		this.creator = writable(user);
		this.answers = writable([]);
		this.questions = writable([]);
		this.name = writable('new deck');
		this.selectedCard = writable();
	}

	initMockData(): void {
		this.answers.set(mockAnswerCards);
		this.questions.set(mockQuestionCards);
	}

	updateDeckName(newName: string): void {
		this.name.set(newName);
	}

	logState(): void {
		console.log('Creator:');
		console.log(get(this.creator));
		console.log('Answers:');
		console.log(get(this.answers));
		console.log('Questions:');
		console.log(get(this.questions));
		console.log('name:');
		console.log(get(this.name));
	}

	selectCard(card: Card) {
		let currentlySelectedCard = get(this.selectedCard);
		if (currentlySelectedCard?.id === card.id) this.selectedCard.set(undefined);
		else this.selectedCard.set(card);
	}
}

export const deckState = new DeckStateStore(mockUser);
