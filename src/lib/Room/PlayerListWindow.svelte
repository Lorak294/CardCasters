<script lang="ts">
	import PlayerCard from './PlayerCard.svelte';
	import { roomState } from '../../stores/roomStore';

	let players = roomState.playersStore;
</script>

<div class="container">
	<div class="contents">
		{#each $players as player, i}
			<PlayerCard {player} />
		{/each}
	</div>
</div>

<style>
	.container {
		display: grid;
		grid-template-rows: 70px 1fr 70px;
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		overflow-y: scroll;
	}
	.contents {
		padding: 10px;
		display: flex;
		flex-direction: column;
		gap: 10px;
	}
</style>
