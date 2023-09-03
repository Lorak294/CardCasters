<script lang="ts">
	export let deckStats: DeckStats[];
</script>

<div class="container">
	<div class="header">
		<h1>Browse decks</h1>
	</div>
	<div class="filters">
		<h3>Do filters in the future</h3>
	</div>
	<div class="decks">
		{#each deckStats as deckstat (deckstat.id)}
			<div>
				<p>
					{JSON.stringify(deckstat, null, 2)}
				</p>
			</div>
		{/each}
	</div>
</div>

<style>
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
	}
</style>
