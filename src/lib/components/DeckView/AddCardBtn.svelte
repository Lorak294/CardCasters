<script lang="ts">
	import IconPlus from '~icons/ic/baseline-plus';
	import { getStore } from '../../stores/NewDeckStore';

	export let answer: boolean;

	const newDeckStore = getStore();

	function addHandler() {
		newDeckStore.createNewCard(answer);
	}
</script>

<button class="addBtn" on:click={addHandler}>
	<div>Add new {answer ? 'answer' : 'question'}</div>
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
