<script lang="ts">
	import Definition from '$lib/components/Definition.svelte';
	import type { PageData } from './$types';
	export let data: PageData;

	console.log(data);
</script>

<h1>Defintions page:</h1>
<Definition
	author={data.author}
	definiton={data.definition}
	bind:current_vote={data.current_vote}
/>
