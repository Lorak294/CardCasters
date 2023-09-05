<script lang="ts">
	import type { PageData } from './$types';

	import DeckView from '$lib/components/DeckView/DeckView.svelte';
	import { createStore } from '$lib/stores/NewDeckStore';

	export let data: PageData;

	createStore(data.deck);
</script>

<!-- <div>{JSON.stringify(data, null, 2)}</div> -->
<DeckView />
