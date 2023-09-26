<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import IconEdit from '~icons/ic/baseline-edit';
	export let card: Card;
	export let selectedCard: Card | undefined;

	const dispatch = createEventDispatcher();

	let styling = '';

	$: {
		if (selectedCard && selectedCard === card) styling = 'selected';
		else {
			styling = card.isAnswer ? 'answer' : 'question';
		}
	}
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="container {styling}" on:click={() => dispatch('card-selection', card)}>
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
