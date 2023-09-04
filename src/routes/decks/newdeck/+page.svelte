<script lang="ts">
	import NewDeck from '$lib/components/NewDeck/NewDeck.svelte';
	import { setContext } from 'svelte';
	import { NewDeckStore } from '../../../stores/NewDeckStore';
	import type { PageData } from './$types';

	export let data: PageData;

	// store to handle new deck creation passedb by context API
	const newDeckStore = new NewDeckStore(data.user);
	setContext('newDeckStore', newDeckStore);
</script>

<NewDeck />
