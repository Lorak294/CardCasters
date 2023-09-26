<script lang="ts">
	import { PlayerState } from '../../../common';

	export let player: Player;

	function getStateString(state: PlayerState) {
		switch (state) {
			case PlayerState.Choosing:
				return 'Choosing';
			case PlayerState.Finished:
				return 'Finished';
			case PlayerState.Waiting:
				return 'Waiting';
		}
	}
</script>

<div class="card-container">
	<div class="profile-container" />
	<div class="info-container">
		<h3>{player.name}</h3>
		<p>{getStateString(player.state)}</p>
	</div>
	<div class="score-container">
		{player.score} pts
	</div>
</div>

<style>
	.card-container {
		scroll-snap-align: start;
		margin: 5px 5px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: var(--main1);
		color: var(--secondary1);
		padding: 10px;
		border-radius: 15px;
		gap: 10px;
		min-width: 300px;
		box-shadow: var(--shadow);

		&:hover {
			background-color: #e4e4e4;
		}
	}

	.profile-container {
		width: 50px;
		height: 50px;
		background-image: url('/images/avatar.jpg');
		background-repeat: no-repeat;
		background-size: cover;
		background-position: center;
		border-radius: 50%;
	}

	.info-container {
		/* flex-grow: 5; */
		/* background-color: aqua; */
		width: 60%;
		justify-self: left;
	}

	.score-container {
		/* flex-grow: 1; */
		width: 20%;
		/* background-color: brown; */
		display: flex;
		align-items: center;
	}
</style>
