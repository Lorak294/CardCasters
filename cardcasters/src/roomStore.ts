import { writable, get, type Writable } from 'svelte/store';
import {
	mockAnswerCards,
	mockAnswers,
	mockLoggedPlayer,
	mockPlayers,
	mockQuestionCard
} from './mockdata';

class RoomStateStore {
	ownCardsStore: Writable<Card[]>;
	answersStore: Writable<Answer[]>;
	playersStore: Writable<Player[]>;
	cardSelectionConfirmed: Writable<boolean>;
	answerSelectionConfirmed: Writable<boolean>;
	selectedCard: Writable<Card | undefined>;
	questionCard: Writable<Card | undefined>;
	selectedAnswer: Writable<Answer>;

	loggedPlayer?: Player;

	MAX_PLAYERS = 10;
	MAX_CARDS = 10;

	constructor() {
		this.ownCardsStore = writable([]);
		this.answersStore = writable([]);
		this.playersStore = writable([]);
		this.cardSelectionConfirmed = writable(false);
		this.answerSelectionConfirmed = writable(false);
		this.selectedCard = writable();
		this.selectedAnswer = writable();
		this.questionCard = writable();
	}

	newRound(): void {
		console.log('initializing new round');
		// later this method will call APIs for data
		this.ownCardsStore.set(mockAnswerCards);
		this.loggedPlayer = mockLoggedPlayer;
		this.answersStore.set(mockAnswers);
		this.playersStore.set(mockPlayers);
		this.questionCard.set(mockQuestionCard);
	}

	selectCard(card: Card): void {
		let currentlySelectedCard = get(this.selectedCard);
		let selectionConfirmed = get(this.cardSelectionConfirmed);

		console.log(`selecting crad: ${JSON.stringify(card)}`);

		if (selectionConfirmed) return;
		if (card.id === currentlySelectedCard?.id) this.selectedCard.set(undefined);
		else this.selectedCard.set(card);
	}

	confirmCardSelection(): void {
		if (this.selectedCard === undefined) return;

		this.cardSelectionConfirmed.set(true);
	}
}

export const roomState = new RoomStateStore();
