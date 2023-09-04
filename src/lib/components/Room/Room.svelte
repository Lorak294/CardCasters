<script lang="ts">
	import PlayerListWindow from './PlayerListWindow.svelte';
	import { roomState } from '../../stores/roomStore';
	import QuestionCard from './QuestionCard.svelte';
	import AnswersSection from './AnswersSection.svelte';
	import OwnCardListWindow from './OwnCardListWindow.svelte';

	let players = roomState.playersStore;
	let questionCard = roomState.questionCard;
	let cards = roomState.ownCardsStore;
	let selectedCard = roomState.selectedCard;
	let cardSelectionConfirmed = roomState.cardSelectionConfirmed;
	let answers = roomState.answersStore;

	//roomState.newRound();

	let screenHeight: number;
	let screenWidth: number;
	$: playerWindowSize = screenHeight / 175;
	$: cardWindowSize = screenWidth / 300;
</script>

<svelte:window bind:innerHeight={screenHeight} bind:innerWidth={screenWidth} />
<div class="room-container">
	<!-- Player list -->
	<div class="player-list section-container">
		<h1 class="header">Players {$players.length}/{roomState.MAX_PLAYERS}</h1>
		<PlayerListWindow />
	</div>
	<!-- Question card -->
	<div class="question-area section-container">
		<h1 class="header">Question</h1>
		{#if $questionCard !== undefined}
			<QuestionCard card={$questionCard} />
		{/if}
	</div>
	<!-- Answers -->
	<div class="answers-area section-container">
		<!-- <AnswersSection/> -->
		<h1 class="header">Answers ({$answers.length}/{$players.length})</h1>
		<AnswersSection />
	</div>
	<!-- Player cards -->
	<div class="player-cards section-container">
		<!-- <OwnCardsSection/> -->
		<div class="card-section-header">
			<h1>Your cards ({$cards.length})</h1>
			<button
				disabled={$selectedCard === undefined || $cardSelectionConfirmed}
				class="confirm-btn"
				class:ready-btn={$cardSelectionConfirmed}
				on:click={() => roomState.confirmCardSelection()}
			>
				<h2>
					{#if $cardSelectionConfirmed}
						Ready
					{:else}
						Confirm
					{/if}
				</h2>
			</button>
		</div>
		<OwnCardListWindow windowSize={cardWindowSize} />
	</div>
</div>

<style>
	.header {
		align-self: center;
		margin-bottom: 10px;
	}

	.card-section-header {
		display: flex;
		gap: 2rem;
		padding: 10px 30px;
	}

	.room-container {
		display: grid;
		/* background-color: aqua; */
		height: 100%;
		width: 100%;
		grid-template-rows: 85vh 1fr;
		grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
		/* justify-items: start; hotizontal, aligin-self on element overwrites it */
		/* align-items: end; vertical */
		grid-gap: 0.5rem;

		grid-template-areas:
			'player-list question-area answers-area answers-area answers-area '
			'player-cards player-cards player-cards player-cards player-cards';
	}

	.section-container {
		display: flex;
		flex-direction: column;
		align-content: center;
		align-items: center;
		width: 100%;
		height: 100%;
		padding: 10px;
		box-sizing: border-box;
	}

	.player-list {
		grid-area: player-list;
		justify-self: center;
		width: 100%;
	}
	.question-area {
		grid-area: question-area;
		width: 100%;
	}
	.answers-area {
		grid-area: answers-area;
	}
	.player-cards {
		grid-area: player-cards;
		width: 100%;
	}

	.confirm-btn {
		display: flex;
		align-items: center;
		justify-content: space-between;
		background-color: var(--active);
		border-radius: 10px;
		padding: 10px;
		border: none;
		color: var(--main1);
		&:enabled:hover {
			transform: scale(1.05);
			transition: 0.2s;
		}
		&:disabled {
			background-color: var(--disabled);
		}
	}

	.ready-btn {
		&:disabled {
			background-color: var(--success);
		}
	}

	@media only screen and (max-width: 950px) {
		.room-container {
			grid-template-columns: 1fr;
			grid-template-rows: 1fr 3fr 2fr 4fr;
			grid-template-areas:
				'question-area'
				'answers-area'
				'player-cards'
				'player-list';
		}

		.answers-area {
			width: 100%;
		}
	}
</style>
