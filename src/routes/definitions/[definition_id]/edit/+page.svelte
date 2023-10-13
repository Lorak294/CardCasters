<script lang="ts">
	import DefinitionData from '$lib/components/DefinitionData.svelte';
	import type { PageData } from './$types';
	export let data: PageData;

	let voteForm: HTMLFormElement;
	let { definition } = data;
	// $: ({ current_vote, definition, author } = data);
</script>

<h1>Defintion Edit page:</h1>

<form method="post" action="?/update">
	<DefinitionData {definition} editable={true} />
	<button type="submit">Save</button>
</form>

<style>
</style>
