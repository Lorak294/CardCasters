<script lang="ts">
	import type { Defintion, Profile } from '$lib/database/types';

	export let definition: Defintion;
	export let editable: boolean;
</script>

<div class="def-section">
	{#if editable}
		<input type="text" name="expression" value={definition.expression} />
		<h2>Definition:</h2>
		<input type="text" name="definition" value={definition.definition} />

		<h2>Example usage:</h2>
		<input type="text" name="example" value={definition.example} />
	{:else}
		<h1>{definition.expression}</h1>
		<h2>Definition:</h2>
		<p>{definition.definition}</p>

		<h2>Example usage:</h2>
		<p class="example">{definition.example}</p>
	{/if}
</div>

<style>
	.def-section h2 {
		color: var(--highlight);
	}
	.def-section p {
		padding-left: 1em;
	}

	.example {
		font-style: italic;
	}
</style>
