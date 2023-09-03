import { writable, get, type Writable } from 'svelte/store';
import { mockAnswerCards, mockQuestionCards, mockUser } from '../lib/mockdata';
import { CardType } from '../common';

class DeckStateStore {
	creator: Writable<User>;
	answers: Writable<Card[]>;
	questions: Writable<Card[]>;
	name: Writable<string>;
	selectedCard: Writable<Card | undefined>;
	newCard: Writable<Card | undefined>;

	constructor(user: User) {
		this.creator = writable(user);
		this.answers = writable([]);
		this.questions = writable([]);
		this.name = writable('new deck');
		this.selectedCard = writable();
		this.newCard = writable();
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

	updateOrAddCard(card: Card) {
		let arrayToUpdate: Writable<Card[]>;

		switch (card.type) {
			case CardType.Answer:
				arrayToUpdate = this.answers;
				break;
			case CardType.Question:
				arrayToUpdate = this.questions;
				break;
			default:
				console.error('unrecognized card type.');
				return;
		}

		let currentNewCard = get(this.newCard);

		if (currentNewCard?.id === card.id) {
			arrayToUpdate.update((prev) => {
				prev.push(card);
				return prev;
			});
			return;
		}

		arrayToUpdate.update((prev) => {
			prev.map((c) => {
				if (c.id === card.id) return card;
				else return c;
			});
			return prev;
		});
	}

	deselectCard() {
		this.selectedCard.set(undefined);
		this.newCard.set(undefined);
	}

	createNewCard(type: CardType) {
		let newCard = {
			id: 1001,
			text: 'new card',
			type
		};
		this.newCard.set(newCard);
	}

	deleteCard(card: Card) {
		let currentNewCard = get(this.newCard);

		if (!currentNewCard || currentNewCard.id !== card.id) {
			// not a new card
			let arrayToUpdate: Writable<Card[]>;

			// get card type
			switch (card.type) {
				case CardType.Answer:
					arrayToUpdate = this.answers;
					break;
				case CardType.Question:
					arrayToUpdate = this.questions;
					break;
				default:
					console.error('unrecognized card type.');
					return;
			}

			// delete cards with corresponding id
			arrayToUpdate.update((prev) => {
				return prev.filter((c) => {
					return c.id !== card.id;
				});
			});
		}
		// cleanup selected and new cards
		this.deselectCard();
	}
}

export const deckState = new DeckStateStore(mockUser);
