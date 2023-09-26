<script lang="ts">
	export let card: Card;
</script>

<div class="card-container">
	<h2 class="card-text">{card.text}</h2>
</div>

<style>
	.card-container {
		background-color: var(--secondary1);
		width: 20rem;
		min-width: 200px;
		height: 40vh;
		border-radius: 15px;
		position: relative;
		box-shadow: var(--shadow);
	}

	.card-text {
		margin: 0 auto;
		position: absolute;
		top: 50%;
		left: 50%;
		-ms-transform: translate(-50%, -50%);
		transform: translate(-50%, -50%);
		overflow-wrap: break-word;
		word-wrap: break-word;
		hyphens: auto;
		color: var(--main1);
	}
</style>
