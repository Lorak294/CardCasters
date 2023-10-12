<script lang="ts">
	import Definition from '$lib/components/Definition.svelte';
	import DefinitionData from '$lib/components/DefinitionData.svelte';
	import type { PageData } from './$types';
	export let data: PageData;

	let voteForm: HTMLFormElement;
	let { definition } = data;
	// $: ({ current_vote, definition, author } = data);
</script>

<h1>Defintion Edit page:</h1>

<form>
	<DefinitionData {definition} editable={true} />
</form>

<style>
</style>
