<script lang="ts">
	export let deckSummary: DeckSummary;
	import IconCardsOutnline from '~icons/mdi/cards-outline';
	import IconCards from '~icons/mdi/cards';
	import IconUser from '~icons/mdi/account';
</script>

<div class="container">
	<h1>{deckSummary.name}</h1>
	<p>author: {deckSummary.creator.name}</p>
	<p>deck code: {deckSummary.code}</p>
	<div class="stats">
		<div class="stat answers">
			<IconCards font-size="25px" />
			<p>{deckSummary.answerCardsCount}</p>
		</div>
		<div class="stat">
			<IconCardsOutnline font-size="25px" />
			<p>{deckSummary.questionCardsCount}</p>
		</div>
		<div class="stat">
			<IconUser font-size="25px" />
			<p>0</p>
		</div>
	</div>
</div>

<style>
	.container {
		padding: 20px;
		border-radius: 15px;
		display: flex;
		gap: 0.3em;
		flex-direction: column;
		background-color: var(--active);
		color: var(--main1);
		box-shadow: var(--shadow);

		&:hover {
			transform: scale(1.05);
			transition: 0.2s;
		}
	}

	.container p {
		color: var(--main1);
	}

	.stats {
		padding: 10px 20px;
		display: flex;
		justify-content: space-around;
		font-weight: 600;
		color: var(--main1);
	}

	.stat {
		display: flex;
		gap: 5px;
	}

	/* .answers {
		color: var(--secondary1);
	} */
</style>
