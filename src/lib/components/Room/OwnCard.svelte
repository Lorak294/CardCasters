<script lang="ts">
	import { getStore } from '$lib/stores/RoomStore';
	import AnswerCard from './AnswerCard.svelte';
	export let card: Card;

	const roomStore = getStore();

	let { selectedCard } = roomStore;

	function handleSelection(event: any) {
		roomStore.selectCard(card);
	}
</script>

<AnswerCard
	hidden={false}
	selected={$selectedCard?.id === card.id}
	{card}
	on:item-selected={handleSelection}
/>
