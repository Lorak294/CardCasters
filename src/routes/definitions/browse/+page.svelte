<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div>
	<h1>All definiions:</h1>

	{#each data.def_summaries as def_summary}
		<a href={`/definitions/${def_summary.id}`}>
			<div class="summary-container">
				<h3>{def_summary.expression}</h3>
				<p>Author: {def_summary.profiles?.username}</p>
			</div>
		</a>
	{/each}
</div>

<style>
	a {
		color: var(--main1);
		text-decoration: none;
	}
	.summary-container {
		margin: 1em;
		padding: 1em;
		background-color: var(--disabled);
	}
</style>
