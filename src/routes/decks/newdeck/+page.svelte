<script lang="ts">
	import NewDeck from '$lib/components/NewDeck/NewDeck.svelte';
	import { createStore } from '../../../lib/stores/NewDeckStore';
	import type { PageData } from './$types';

	export let data: PageData;

	// store to handle new deck creation passedb by context API
	createStore(data.user);
</script>

<NewDeck />
