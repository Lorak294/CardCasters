<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData, PageData } from './$types';

	export let data: PageData;
	export let form: ActionData;
</script>

<pre>
	{JSON.stringify(form, null, 2)}
</pre>

<div class="container">
	<form class="form" method="POST" action="?/createDeck" use:enhance>
		<h1>Create new deck</h1>
		<input type="hidden" name="authorId" value={data.user.id} />
		<div>
			<label for="deckName">Deck name</label>
			<input type="text" name="deckName" />
			{#if form?.missing}
				<p class="error">This field is required</p>
			{/if}
		</div>
		<button>Create</button>
	</form>
</div>

<style>
	.container {
		padding: 10vh;
		display: flex;
		flex-direction: column;
		width: 100%;
		align-items: center;
	}

	.form {
		width: 40vw;
		min-width: 300px;
		display: flex;
		flex-direction: column;
		gap: 3vh;
		background-color: var(--active);
		box-shadow: var(--shadow);
		padding: 40px;
		border-radius: 15px;
	}

	.form input {
		font-size: larger;
		border-radius: 10px;
		padding: 10px;
		border: 1px solid #ccc;
		box-shadow: inherit;
		display: inline-block;
		box-sizing: border-box;
		width: 100%;
		margin-top: 5px;
	}

	.form button {
		padding: 20px;
		border-radius: 12px;
		border: none;
		box-shadow: inherit;
		background-color: var(--secondary1);
		color: var(--main1);
		font-size: x-large;
		font-weight: 600;

		&:hover {
			transform: scale(1.03);
			transition: 0.2s;
		}
	}

	.error {
		color: var(--cancel);
	}
</style>
