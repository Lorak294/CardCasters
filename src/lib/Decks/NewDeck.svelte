<script lang="ts">
	import DeckInfo from './DeckInfo.svelte';
</script>

<div class="container">
	<div class="deck-info-area area-container">
		<DeckInfo />
	</div>
	<div class="save-area area-container">
		<button class="btn"> Save Deck</button>
	</div>
	<div class="questions-area area-container">Questions</div>
	<div class="card-edit-area area-container">Edit</div>
	<div class="answers-area area-container">Answers</div>
	<div class="add-question-area area-container">Add Question</div>
	<div class="add-answer-area area-container">Add answer</div>
</div>

<style>
	.container {
		display: grid;
		/* background-color: aqua; */
		width: 100%;
		height: 100%;
		grid-template-rows: 15vh 75vh 1fr;
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
		background-color: brown;
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
