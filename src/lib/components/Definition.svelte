<script lang="ts">
	import type { Defintion, Profile } from '$lib/database/types';
	import { createEventDispatcher } from 'svelte';

	export let definiton: Defintion;
	export let author: Profile;
	export let current_vote: number;

	const dispatch = createEventDispatcher();

	const vote = (value: number) => {
		console.log(`voting [${value}]`);
		current_vote = value;
		setTimeout(() => {
			dispatch('vote');
		}, 100);
	};
	const reoprt = () => {
		console.log(`reporting`);
		setTimeout(() => {
			dispatch('report');
		}, 100);
	};
</script>

<div class="container">
	<h1>{definiton.expression}</h1>
	<div class="sections-container">
		<div class="def-section">
			<h2>Definition:</h2>
			<p>{definiton.definition}</p>

			<h2>Example usage:</h2>
			<p class="example">{definiton.example}</p>

			<h2>Created by:</h2>
			<p>{author.username}</p>
		</div>
		<div class="control-section">
			<div class="score">
				<button
					on:click={() => vote(current_vote <= 0 ? 1 : 0)}
					class="vote-button up-vote"
					class:unactive={current_vote === 1}
				>
					Vote-Up
				</button>
				<h1>31</h1>
				<button
					on:click={() => vote(current_vote >= 0 ? -1 : 0)}
					class="vote-button down-vote"
					class:unactive={current_vote === -1}
				>
					Vote-Down
				</button>
			</div>
			<button on:click={reoprt}>Report</button>
		</div>
	</div>
</div>

<style>
	.container {
		background-color: rgb(82, 82, 82);
		padding: 2em;
	}
	.sections-container {
		margin-top: 1em;
		display: flex;
		justify-content: space-between;
		gap: 2em;
	}
	.def-section h2 {
		color: var(--highlight);
	}
	.def-section p {
		padding-left: 1em;
	}

	.example {
		font-style: italic;
	}

	.vote-button {
		border-radius: 30px;
		padding: 10px;
		border-width: 0;
		margin: 1em 0;
	}
	.up-vote {
		background-color: var(--highlight);
		color: var(--main1);
	}
	.down-vote {
		background-color: var(--cancel);
		color: var(--main1);
	}
	.unactive {
		background-color: var(--disabled);
		color: var(--background);
	}
</style>
