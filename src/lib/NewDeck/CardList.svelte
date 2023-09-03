<script lang="ts">
	import { deckState } from '../../stores/deckStore';
	import CardListing from './CardListing.svelte';

	export let cards: Card[];
</script>

<div class="container">
	<div class="contents">
		{#each cards as card, i}
			<CardListing {card} />
		{/each}
	</div>
</div>

<style>
	.container {
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		overflow-y: scroll;
	}
	.contents {
		padding: 10px;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 10px;
	}
</style>
