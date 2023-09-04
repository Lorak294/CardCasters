<script lang="ts">
	import IconEdit from '~icons/ic/baseline-edit';
	import { CardType } from '../../common';
	import { getContext } from 'svelte';
	import type { NewDeckStore } from '../../stores/NewDeckStore';
	export let card: Card;

	const newDeckStore: NewDeckStore = getContext('newDeckStore');

	let { selectedCard } = newDeckStore;

	let styling = '';

	$: {
		if ($selectedCard && $selectedCard === card) styling = 'selected';
		else {
			switch (card.type) {
				case CardType.Answer:
					styling = 'answer';
					break;
				case CardType.Question:
					styling = 'question';
					break;
			}
		}
	}
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="container {styling}" on:click={() => newDeckStore.selectCard(card)}>
	<p>{card.text}</p>
	<div class="icon-wrapper">
		<IconEdit style="align-self: center; font-size: large;" />
	</div>
</div>

<style>
	.container {
		border-radius: 10px;
		min-height: 30px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 10px 0 10px;
		width: 20vw;
		box-shadow: var(--shadow);

		&:hover {
			transform: scale(1.02);
			transition: 0.1s;
		}
	}
	.container p {
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		padding: 0 10px;
	}

	.question {
		background: var(--secondary1);
		color: var(--main1);
	}

	.answer {
		color: var(--secondary1);
		background: var(--main1);
	}

	.selected {
		color: var(--main1);
		background-color: var(--active);
	}

	.icon-wrapper {
		height: 100%;
		display: flex;
		align-self: center;
	}
</style>
