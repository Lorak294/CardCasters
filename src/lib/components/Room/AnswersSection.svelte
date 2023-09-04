<script>
	import { getStore } from '$lib/stores/RoomStore';
	import Answer from './Answer.svelte';

	const roomStore = getStore();

	let answers = roomStore.answersStore;
</script>

<div class="answers-container">
	<div class="answers-grid">
		{#each $answers as answer (answer.card.id)}
			<div class="item">
				<Answer {answer} />
			</div>
		{/each}
	</div>
</div>

<style>
	.answers-container {
		background-color: rgba(208, 204, 208, 0.7);
		border-radius: 15px;
		padding: 20px;
		height: 100%;
		width: 100%;
		box-sizing: border-box;
		max-height: 85vh;
		overflow-y: scroll;
	}

	.answers-grid {
		display: grid;
		grid-template-rows: repeat(2, 250px);
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		grid-gap: 2em;
	}

	.item {
		height: 250px;
		width: 200px;
		align-self: center;
		justify-self: center;
	}

	@media only screen and (max-width: 950px) {
		.answers-container {
			height: fit-content;
			width: 95vw;
		}

		.answers-grid {
			display: flex;
			grid-template-rows: none;
			grid-template-columns: none;
			grid-gap: none;
			overflow: scroll;
			overflow-y: hidden;
		}

		.item {
			display: inline-block;
			text-align: center;
			padding: 14px;
			text-decoration: none;
			min-width: 200px;
		}
	}
</style>
