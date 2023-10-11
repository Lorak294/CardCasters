<script lang="ts">
	import Definition from '$lib/components/Definition.svelte';
	import type { PageData } from './$types';
	export let data: PageData;

	let voteForm: HTMLFormElement;
	let { current_vote, definition, author } = data;
	// $: ({ current_vote, definition, author } = data);
	console.log('curr vote:', data.current_vote);
</script>

<form action="?/vote" method="post" bind:this={voteForm}>
	<input name="vote_score" hidden bind:value={current_vote} />
	<input name="definition_id" hidden bind:value={definition.id} />
</form>

<h1>Defintions page:</h1>
<Definition
	{author}
	definiton={definition}
	bind:current_vote
	on:report={() => {}}
	on:vote={() => {
		voteForm.requestSubmit();
	}}
/>
