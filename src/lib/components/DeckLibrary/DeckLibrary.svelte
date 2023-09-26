<script lang="ts">
	import DeckWidget from './DeckWidget.svelte';

	export let deckSummaries: DeckSummary[];
</script>

<div class="container">
	<div class="header">
		<h1>Browse decks</h1>
	</div>
	<div class="filters">
		<h3>Do filters in the future</h3>
	</div>
	<div class="decks">
		{#each deckSummaries as deckSummary (deckSummary.id)}
			<a href="/decks/{deckSummary.id}">
				<DeckWidget {deckSummary} />
			</a>
		{/each}
	</div>
</div>

<style>
	a {
		text-decoration: none;
		color: inherit;

		&:visited {
			color: inherit;
			text-decoration: none;
		}
	}

	.container {
		display: flex;
		flex-direction: column;
		justify-items: center;
		align-items: center;
	}
	.header {
		width: 100%;
		padding: 5vh;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.filters {
		width: 100%;
		padding: 5vh;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.decks {
		width: 100%;
		padding: 5vh;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		grid-gap: 2em;
	}
</style>
