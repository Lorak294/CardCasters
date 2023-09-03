import { writable, get, type Writable } from 'svelte/store';
import {
	mockAnswerCards,
	mockAnswers,
	mockLoggedPlayer,
	mockPlayers,
	mockQuestionCard
} from '../lib/mockdata';
import { PlayerRole, PlayerState } from '../common';

class RoomStateStore {
	ownCardsStore: Writable<Card[]>;
	answersStore: Writable<Answer[]>;
	playersStore: Writable<Player[]>;
	cardSelectionConfirmed: Writable<boolean>;
	answerSelectionConfirmed: Writable<boolean>;
	selectedCard: Writable<Card | undefined>;
	questionCard: Writable<Card | undefined>;
	selectedAnswer: Writable<Answer | undefined>;
	loggedPlayer: Writable<Player>;

	MAX_PLAYERS = 10;
	MAX_CARDS = 10;

	constructor(player: Player) {
		this.ownCardsStore = writable([]);
		this.answersStore = writable([]);
		this.playersStore = writable([]);
		this.cardSelectionConfirmed = writable(false);
		this.answerSelectionConfirmed = writable(false);
		this.selectedCard = writable();
		this.selectedAnswer = writable();
		this.questionCard = writable();
		this.loggedPlayer = writable(player);
	}

	newRound(): void {
		console.log('initializing new round');
		// later this method will call APIs for data
		this.ownCardsStore.set(mockAnswerCards);
		this.answersStore.set(mockAnswers);
		this.playersStore.set(mockPlayers);
		this.questionCard.set(mockQuestionCard);
		// this.loggedPlayer.update((p) => {
		// 	p.state = PlayerState.ChoosingCard;
		// 	return p;
		// });
	}

	canSelectAnswer(): boolean {
		let player = get(this.loggedPlayer);

		return (
			player.role === PlayerRole.Chooser &&
			player.state === PlayerState.Choosing &&
			!get(this.answerSelectionConfirmed)
		);
	}

	canSelectOwnCard(): boolean {
		let player = get(this.loggedPlayer);

		return (
			player.role === PlayerRole.Answerer &&
			player.state === PlayerState.Choosing &&
			!get(this.cardSelectionConfirmed)
		);
	}

	canSeeAnswer(answer: Answer): boolean {
		let player = get(this.loggedPlayer);

		return (
			player.state === PlayerState.Finished ||
			(player.role === PlayerRole.Chooser && player.state === PlayerState.Choosing) ||
			(player.role === PlayerRole.Answerer &&
				player.state === PlayerState.Waiting &&
				answer.submiter.id === player.id)
		);
	}

	canSeeAnswerSubmiter(answer: Answer): boolean {
		let player = get(this.loggedPlayer);

		return (
			player.state === PlayerState.Finished ||
			(player.role === PlayerRole.Answerer &&
				player.state === PlayerState.Waiting &&
				answer.submiter.id === player.id)
		);
	}

	selectCard(card: Card): void {
		if (!this.canSelectOwnCard()) return;

		let currentlySelectedCard = get(this.selectedCard);
		console.log(`selecting crad: ${JSON.stringify(card)}`);

		if (card.id === currentlySelectedCard?.id) this.selectedCard.set(undefined);
		else this.selectedCard.set(card);
	}

	selectAnswer(answer: Answer): void {
		if (!this.canSelectAnswer()) return;
		let currentlySelectedAnswer = get(this.selectedAnswer);

		console.log(`selecting answer: ${JSON.stringify(answer)}`);
		if (answer.card.id === currentlySelectedAnswer?.card.id) this.selectedAnswer.set(undefined);
		else this.selectedAnswer.set(answer);
	}

	confirmCardSelection(): void {
		if (this.selectedCard === undefined) return;

		this.cardSelectionConfirmed.set(true);
		this.submitAnswer();
	}

	submitAnswer(): void {
		let submiter = get(this.loggedPlayer);
		let card = get(this.selectedCard);

		if (!submiter || !card) {
			console.error('cannot submit answer without selecte card and player!');
			return;
		}

		let newAnswer: Answer = { submiter, card };
		this.answersStore.update((answers) => {
			return [...answers, newAnswer];
		});

		this.ownCardsStore.update((ownCards) => {
			return ownCards.filter((c) => {
				return c != card;
			});
		});
		this.loggedPlayer.update((p) => {
			p.state = PlayerState.Waiting;
			return p;
		});
		//this.selectedCard.set(undefined);
	}
}

export const roomState = new RoomStateStore(mockLoggedPlayer);
