<script lang="ts">
	import type { ActionData, PageData, SubmitFunction } from './$types';
	import CardListing from '$lib/components/DeckView/CardListing.svelte';
	import { enhance } from '$app/forms';

	export let data: PageData;
	export let form: ActionData;

	$: answers = data.deck.answerCards;
	$: questions = data.deck.questionCards;

	let selectedCard: Card | undefined;
	let newCard: Card | undefined;

	function handleCardSelection(event: CustomEvent<Card>) {
		newCard = undefined;
		const newSelected = event.detail;

		if (newSelected.id === selectedCard?.id) selectedCard = undefined;
		else selectedCard = newSelected;
	}

	function createNewCard(isAnswer: boolean) {
		newCard = {
			id: 'newid',
			text: 'new card',
			isAnswer
		};
		selectedCard = newCard;
	}

	function reset() {
		selectedCard = undefined;
		newCard = undefined;
	}

	const submitCard: SubmitFunction = (input) => {
		// actions before form submits
		return async ({ update }) => {
			// actions after the form submits
			reset();
			await update();
		};
	};
</script>

<div class="container">
	<!-- Deck name form area -->
	<div class="deck-info-area">
		<div class="deck-name-form">
			<div class="deck-info">
				<input id="deckNameInput" type="text" name="deckName" value={data.deck.name} />
				<p>Author: {data.deck.author.username}</p>
				<p>Code: {data.deck.code}</p>
			</div>
			<div style="padding: 10px; height 100%">
				<button class="btn save-btn">Save changes</button>
			</div>
		</div>
	</div>

	<!-- cards editing area -->

	<!-- questions -->
	<div class="questions-area area-container">
		<h2>Questions</h2>
		{#if questions.length > 0}
			<div class="card-list">
				{#each questions as question, i}
					<CardListing card={question} bind:selectedCard on:card-selection={handleCardSelection} />
				{/each}
			</div>
		{:else}
			Currently there are no questions.
		{/if}
	</div>
	<!-- new/selected card edit -->
	<div class="card-edit-area area-container">
		{#if selectedCard}
			<form method="POST" action="?/updateCard" use:enhance={submitCard}>
				<!-- hidden inputs -->
				<input type="hidden" name="userId" value={data.user.id} required />
				<input type="hidden" name="deckId" value={data.deck.id} required />
				<input type="hidden" name="cardId" value={selectedCard?.id} required />
				<input type="hidden" name="isAnswerNum" value={selectedCard?.isAnswer ? 1 : 0} required />

				<h2>Edit card</h2>
				<div class="card-container {selectedCard.isAnswer ? 'answer' : 'question'}">
					<!-- card text input -->
					<input name="cardText" type="text" value={selectedCard.text} />
				</div>

				<div class="buttons-container">
					<!-- delete card button -->
					<button formaction="?/deleteCard" type="submit" class="delete-card-btn"> Delete </button>
					<button type="reset" class="cancel-card-btn" on:click={reset}>Cancel</button>
					<!-- update/create card button -->
					<button
						formaction={`?/${newCard ? 'addNewCard' : 'updateCard'}`}
						type="submit"
						class="save-card-btn"
					>
						Save
					</button>
				</div>
			</form>
		{/if}
	</div>
	<!-- canswers -->
	<div class="answers-area area-container">
		<h2>Answers</h2>
		{#if answers.length > 0}
			<div class="card-list">
				{#each answers as answer, i}
					<CardListing card={answer} bind:selectedCard on:card-selection={handleCardSelection} />
				{/each}
			</div>
		{:else}
			Currently there are no answers.
		{/if}
	</div>
	<!-- add question/answer buttons -->
	<div class="add-question-area area-container">
		<button
			class="btn"
			on:click={() => {
				createNewCard(false);
			}}
		>
			Add question</button
		>
	</div>
	<div class="add-answer-area area-container">
		<button
			class="btn"
			on:click={() => {
				createNewCard(true);
			}}
		>
			Add answer</button
		>
	</div>
</div>

<style>
	#deckNameInput {
		font-size: clamp(2em, 5vh, 3em);
		font-weight: 600;
		color: var(--main1);
		/* background-color: aqua; */
		size: 1;
		overflow: hidden;
		text-overflow: ellipsis;
		background-color: inherit;
		border: none;
		color: inherit;
	}

	.deck-name-form {
		display: flex;
		justify-content: space-between;
		/* padding: 0 4vw; */
		padding: 0 10px;
	}

	form input {
		background-color: inherit;
		border: none;
		color: inherit;
	}

	.container {
		display: grid;
		width: 100%;
		height: 100%;
		padding: 10px;
		justify-content: center;
		align-content: center;
		grid-template-rows: 15vh 65vh 10vh;
		grid-template-columns: 1fr 1fr 1fr;
		grid-gap: 0.5rem;
		grid-template-areas:
			'deck-info-area deck-info-area deck-info-area'
			'questions-area card-edit-area answers-area'
			'add-question-area empty-area add-answer-area';
	}

	.area-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		height: 100%;
		padding: 10px;
		box-sizing: border-box;
		/* background-color: brown; */
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

	.save-btn {
		width: clamp(150px, 10vw, 400px);
	}

	.deck-info-area {
		grid-area: deck-info-area;
		align-items: baseline;
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

	.card-container {
		width: 100%;
		height: 100%;
		border-radius: 25px;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: var(--shadow);
		padding: 2vw;
	}

	.buttons-container {
		width: 100%;
		display: flex;
		justify-content: space-between;
	}

	.question {
		background: var(--secondary1);
		color: var(--main1);
	}

	.answer {
		color: var(--secondary1);
		background: var(--main1);
	}

	.buttons-container button {
		width: 30%;
		border: none;
		border-radius: 15px;
		color: var(--main1);
		font-weight: bolder;
		font-size: large;
		box-shadow: var(--shadow);

		&:hover {
			transform: scale(1.2);
			transition: 0.3s;
		}
	}

	.save-card-btn {
		background-color: var(--active);
	}

	.delete-card-btn {
		background-color: var(--cancel);
	}
	.cancel-card-btn {
		background-color: var(--disabled);
	}
</style>
