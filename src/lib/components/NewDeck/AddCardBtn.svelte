<script lang="ts">
	import { CardType } from '../../../common';
	import IconPlus from '~icons/ic/baseline-plus';
	import { getStore } from '../../stores/NewDeckStore';

	export let type: CardType;

	const newDeckStore = getStore();

	let cardTypeStr: string;

	switch (type) {
		case CardType.Answer:
			cardTypeStr = 'answer';
			break;
		case CardType.Question:
			cardTypeStr = 'question';
			break;
		default:
			cardTypeStr = '';
			break;
	}

	function addHandler() {
		newDeckStore.createNewCard(type);
	}
</script>

<button class="addBtn" on:click={addHandler}>
	<div>Add new {cardTypeStr}</div>
	<div class="icon-wrapper"><IconPlus /></div>
</button>

<style>
	.addBtn {
		width: 20vw;
		height: 100%;
		border: none;
		border-radius: 15px;
		font-size: 2vh;
		font-weight: 600;
		color: var(--main1);
		background-color: var(--active);
		box-shadow: var(--shadow);
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 5px;

		&:hover {
			transform: scale(1.2);
			transition: 0.3s;
		}
	}

	.icon-wrapper {
		display: flex;
		align-self: center;
		font-size: larger;
	}
</style>
