<script lang="ts">
	import { getStore } from '$lib/stores/RoomStore';
	import AnswerCard from './AnswerCard.svelte';
	export let answer: Answer;

	const roomStore = getStore();

	let { selectedAnswer } = roomStore;

	function handleSelection(event: any) {
		roomStore.selectAnswer(answer);
	}
</script>

<div class="container">
	<p class="owner-name">
		{#if !roomStore.canSeeAnswerSubmiter(answer)}
			???
		{:else}
			{answer.submiter.name}
		{/if}
	</p>
	<AnswerCard
		hidden={!roomStore.canSeeAnswer(answer)}
		selected={$selectedAnswer?.card.id === answer.card.id}
		card={answer.card}
		on:item-selected={handleSelection}
	/>
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		align-items: center;
		position: relative;
	}
	.owner-name {
		padding: 10px;
	}
</style>
