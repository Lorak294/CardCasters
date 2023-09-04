<script lang="ts">
	import AnswerCard from './AnswerCard.svelte';
	import { roomState } from '../../stores/roomStore';
	export let card: Card;

	let selectedCard = roomState.selectedCard;

	function handleSelection(event: any) {
		roomState.selectCard(card);
	}
</script>

<AnswerCard
	hidden={false}
	selected={$selectedCard?.id === card.id}
	{card}
	on:item-selected={handleSelection}
/>
