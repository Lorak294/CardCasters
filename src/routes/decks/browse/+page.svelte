<script lang="ts">
	import DeckLibrary from '$lib/components/DeckLibrary/DeckLibrary.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<DeckLibrary deckSummaries={data.deckSummaries} />
