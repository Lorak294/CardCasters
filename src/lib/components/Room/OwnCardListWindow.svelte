<script lang="ts">
	import { getStore } from '$lib/stores/RoomStore';
	import OwnCard from './OwnCard.svelte';

	export let windowSize: number;

	const roomStore = getStore();
	let ownCards = roomStore.ownCardsStore;
	let startIdx = 0;

	function next_handler() {
		startIdx++;
	}

	function prev_handler() {
		startIdx--;
	}
</script>

<div class="container">
	<button class="btn" disabled={startIdx === 0} on:click={prev_handler}>P</button>
	<div class="contents">
		{#each $ownCards.slice(startIdx, startIdx + windowSize) as card, i}
			<OwnCard {card} />
		{/each}
	</div>
	<button class="btn" disabled={startIdx + windowSize >= $ownCards.length} on:click={next_handler}
		>N</button
	>
</div>

<style>
	.container {
		display: grid;
		grid-template-columns: 70px 1fr 70px;
		height: 100%;
		width: 100%;
	}
	.contents {
		padding: 10px;
		display: flex;
		gap: 10px;
		min-height: 300px;
	}

	.btn {
		background-color: #339989;
		border-radius: 10px;
		margin: 10px;
		padding: 10px;
		border: none;
		color: #fcfefe;
		&:enabled:hover {
			transform: scale(1.05);
			transition: 0.2s;
		}
		&:disabled {
			background-color: rgba(208, 204, 208, 0.7);
		}
	}
</style>
