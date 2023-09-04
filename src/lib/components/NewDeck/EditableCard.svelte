<script lang="ts">
	import { getContext } from 'svelte';
	import { CardType } from '../../common';
	import type { NewDeckStore } from '../../stores/NewDeckStore';

	export let card: Card;

	const newDeckStore: NewDeckStore = getContext('newDeckStore');

	let styling: string;

	$: {
		switch (card.type) {
			case CardType.Answer:
				styling = 'answer';
				break;
			case CardType.Question:
				styling = 'question';
				break;
			default:
				styling = '';
				break;
		}
	}

	function saveCard() {
		let newText = getCardText();
		if (!newText) return;
		card.text = newText;
		newDeckStore.updateOrAddCard(card);
		newDeckStore.deselectCard();
	}

	function deleteCard() {
		newDeckStore.deleteCard(card);
	}

	function updateText(e: FocusEvent) {
		let newText = (e.target as HTMLElement).innerText.trim();
		if (!newText) (e.target as HTMLElement).innerText = card.text;
	}

	function enterPressed(e: KeyboardEvent) {
		if (e.key === 'Enter') {
			(e.target as HTMLElement).blur();
		}
	}

	function deselectCard(e: MouseEvent) {
		newDeckStore.deselectCard();
	}

	function getCardText() {
		return document.getElementById('cardTextInput')?.innerText;
	}
</script>

{#if card}
	<div class="container">
		<h2>Edit card</h2>
		<div class="card-container {styling}">
			<h2
				contenteditable="true"
				spellcheck="false"
				id="cardTextInput"
				on:keypress={enterPressed}
				on:blur={updateText}
			>
				{card.text}
			</h2>
		</div>
		<div class="buttons-container">
			<button class="delete-btn" on:click={deleteCard}>Delete</button>
			<button class="cancel-btn" on:click={deselectCard}>Cancel</button>
			<button class="save-btn" on:click={saveCard}>Save</button>
		</div>
	</div>
{/if}

<style>
	.container {
		width: 100%;
		height: 100%;
		display: grid;
		grid-template-rows: 1em 1fr 10vh;
		grid-template-columns: 1fr;
		grid-gap: 5vh;
		padding: 0 6vw;
		justify-items: center;
	}

	.card-container {
		width: 100%;
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

	.save-btn {
		background-color: var(--active);
	}

	.delete-btn {
		background-color: var(--cancel);
	}
	.cancel-btn {
		background-color: var(--disabled);
	}
</style>
