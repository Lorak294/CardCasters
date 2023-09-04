<script lang="ts">
	import { getContext } from 'svelte';
	import IconEdit from '~icons/ic/baseline-edit';
	import type { NewDeckStore } from '../../stores/NewDeckStore';

	const newDeckStore: NewDeckStore = getContext('newDeckStore');

	let deckName = newDeckStore.name;
	let creator = newDeckStore.creator;
	let inputText: string;

	function updateName(e: FocusEvent) {
		let newName = inputText.trim();
		if (newName) {
			newDeckStore.updateDeckName(newName);
		} else {
			//console.log('old input recovered.');
		}
		inputText = $deckName;
		//deckState.logState();
	}
	function enterPressed(e: KeyboardEvent) {
		if (e.key === 'Enter') {
			(e?.target as HTMLElement).blur();
		}
	}
</script>

<div class="container">
	<div class="name-container">
		<h1
			id="deckNameInput"
			contenteditable="true"
			spellcheck="false"
			bind:innerText={inputText}
			on:blur={updateName}
			on:keypress={enterPressed}
		>
			{$deckName}
		</h1>
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div class="icon-wrapper" on:click={(e) => document.getElementById('deckNameInput')?.focus()}>
			<IconEdit style="align-self: center; font-size: x-large;" />
		</div>
	</div>
	<p>Created by: {creator.name}</p>
</div>

<style>
	.container {
		padding: 10px;
		width: 100%;
		height: 100%;
		justify-self: left;
	}
	.name-container {
		display: flex;
		gap: 1rem;
	}
	.icon-wrapper {
		height: 100%;
		display: flex;
		align-self: center;
	}
</style>
