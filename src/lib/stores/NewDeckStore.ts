import { writable, get, type Writable } from 'svelte/store';
import { mockAnswerCards, mockQuestionCards } from '../mockdata';
import { getContext, setContext } from 'svelte';

class NewDeckStore {
	deck: Writable<Deck>;
	selectedCard: Writable<Card | undefined>;
	newCard: Writable<Card | undefined>;

	constructor(deck: Deck) {
		this.deck = writable(deck);
		this.selectedCard = writable();
		this.newCard = writable();
	}

	updateDeckName(newName: string): void {
		this.deck.update((prev) => {
			return {
				...prev,
				name: newName
			};
		});
	}

	selectCard(card: Card) {
		let currentlySelectedCard = get(this.selectedCard);
		if (currentlySelectedCard?.id === card.id) this.selectedCard.set(undefined);
		else this.selectedCard.set(card);
	}

	// updateOrAddCard(card: Card) {
	// 	let arrayToUpdate = card.isAnswer ? this.answers : this.questions;
	// 	let currentNewCard = get(this.newCard);

	// 	if (currentNewCard?.id === card.id) {
	// 		arrayToUpdate.update((prev) => {
	// 			prev.push(card);
	// 			return prev;
	// 		});
	// 		return;
	// 	}

	// 	arrayToUpdate.update((prev) => {
	// 		prev.map((c) => {
	// 			if (c.id === card.id) return card;
	// 			else return c;
	// 		});
	// 		return prev;
	// 	});
	// }

	deselectCard() {
		this.selectedCard.set(undefined);
		this.newCard.set(undefined);
	}

	// createNewCard(isAnswer: boolean) {
	// 	let newCard = {
	// 		id: 1001,
	// 		text: 'new card',
	// 		isAnswer
	// 	};
	// 	this.newCard.set(newCard);
	// }

	// deleteCard(card: Card) {
	// 	let currentNewCard = get(this.newCard);

	// 	if (!currentNewCard || currentNewCard.id !== card.id) {
	// 		// not a new card
	// 		let arrayToUpdate = card.isAnswer ? this.answers : this.questions;

	// 		// delete cards with corresponding id
	// 		arrayToUpdate.update((prev) => {
	// 			return prev.filter((c) => {
	// 				return c.id !== card.id;
	// 			});
	// 		});
	// 	}
	// 	// cleanup selected and new cards
	// 	this.deselectCard();
	// }
}

export function createStore(deck: Deck) {
	const newDeckStore = new NewDeckStore(deck);
	// newDeckStore.initMockData();
	setContext<NewDeckStore>('newDeckStore', newDeckStore);
}

export function getStore(): NewDeckStore {
	return getContext<NewDeckStore>('newDeckStore');
}
