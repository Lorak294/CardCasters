<script lang="ts">
	import DeckLibrary from '$lib/DeckLibrary/DeckLibrary.svelte';
	import { deckStatsState } from '../../../stores/deckStatsStore';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<DeckLibrary deckSummaries={data.deckSummaries} />
