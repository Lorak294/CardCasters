<script lang="ts">
	import DeckInfo from './DeckInfo.svelte';
	import { goto } from '$app/navigation';
	import CardList from './CardList.svelte';
	import EditableCard from './EditableCard.svelte';
	import AddCardBtn from './AddCardBtn.svelte';
	import { CardType } from '../../../common';
	import { getContext } from 'svelte';
	import type { NewDeckStore } from '../../../stores/NewDeckStore';
	function saveDeck() {
		goto('/');
	}

	const newDeckStore: NewDeckStore = getContext('newDeckStore');
	newDeckStore.initMockData();
	let { answers, questions, selectedCard, newCard } = newDeckStore;
</script>

<div class="container">
	<div class="deck-info-area area-container">
		<DeckInfo />
	</div>
	<div class="save-area area-container">
		<button class="btn" on:click={saveDeck}> Save Deck</button>
	</div>
	<div class="questions-area area-container">
		<h2>Questions</h2>
		<CardList cards={$questions} />
	</div>
	<div class="card-edit-area area-container">
		{#if $selectedCard}
			<EditableCard card={$selectedCard} />
		{:else if $newCard}
			<EditableCard card={$newCard} />
		{/if}
	</div>
	<div class="answers-area area-container">
		<h2>Answers</h2>
		<CardList cards={$answers} />
	</div>
	<div class="add-question-area area-container">
		<AddCardBtn type={CardType.Question} />
	</div>
	<div class="add-answer-area area-container">
		<AddCardBtn type={CardType.Answer} />
	</div>
</div>

<style>
	.container {
		display: grid;
		width: 100%;
		height: 100%;
		grid-template-rows: 15vh 65vh 10vh;
		grid-template-columns: 1fr 1fr 1fr;
		grid-gap: 0.5rem;
		grid-template-areas:
			'deck-info-area deck-info-area save-area'
			'questions-area card-edit-area answers-area'
			'add-question-area empty-area add-answer-area';
	}

	.area-container {
		display: flex;
		flex-direction: column;
		align-content: center;
		align-items: center;
		width: 100%;
		height: 100%;
		padding: 10px;
		box-sizing: border-box;
	}

	.btn {
		margin: auto;
		width: 50%;
		height: 60%;
		border: none;
		border-radius: 15px;
		font-size: 3vh;
		font-weight: 600;
		color: var(--main1);
		background-color: var(--active);
		box-shadow: var(--shadow);

		&:hover {
			transform: scale(1.2);
			transition: 0.3s;
		}
	}

	.deck-info-area {
		grid-area: deck-info-area;
	}

	.save-area {
		grid-area: save-area;
	}

	.questions-area {
		grid-area: questions-area;
	}

	.card-edit-area {
		grid-area: card-edit-area;
	}

	.answers-area {
		grid-area: answers-area;
	}

	.add-question-area {
		grid-area: add-question-area;
	}

	.add-answer-area {
		grid-area: add-answer-area;
	}
</style>
