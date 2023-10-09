<!-- routes/login/+page.svelte -->
<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<div class="container">
	<div class="widget">
		<form method="post" use:enhance>
			<h1 class="title">Sign in</h1>

			<label for="email">Email</label>
			<input type="email" name="email" id="email" value={form?.data?.email ?? ''} /><br />

			<label for="password">Password</label>
			<input type="password" name="password" id="password" /><br />

			<button type="submit">Sign in</button>
			{#if form?.messeage}
				<div class="error">
					<p>{form?.messeage}</p>
				</div>
			{/if}
		</form>
		<div class="link">
			<p>First time here?</p>
			<a href="/register">Create an account</a>
		</div>
	</div>
</div>

<style>
	.error {
		color: var(--cancel);
		text-shadow: var(--shadow);
		display: flex;
		justify-content: center;
		margin-top: 10px;
	}

	.container {
		width: 100%;
		height: 100vh;
		display: flex;
		justify-content: center;
		padding: 10vh;
		background-image: url('/mesh.png');
		background-repeat: no-repeat;
		background-size: cover;
		background-position: center;
	}

	.widget {
		width: 30%;
		padding: 5vh;
		min-width: 400px;
	}

	.link {
		width: 100%;
		padding-top: 4vh;
		display: flex;
		justify-self: center;
		justify-content: center;
		gap: 1rem;
	}

	.widget a {
		text-decoration: none;
		color: var(--active);
		font-weight: bold;
		&:hover {
			transform: scale(1.1);
			color: var(--secondary1);
			text-shadow: var(--shadowlight);
			transition: 0.2s;
		}
	}

	.title {
		margin-bottom: 5vh;
		font-size: 6vh;
		color: var(--main1);
		text-shadow: var(--shadow);
	}

	form input {
		margin-bottom: 25px;
		font-size: larger;
		border-radius: 10px;
		padding: 10px;
		border: 1px solid #ccc;
		box-shadow: var(--shadow);
		display: inline-block;
		box-sizing: border-box;
		width: 100%;
		margin-top: 5px;
	}

	form button {
		margin-top: 5px;
		padding: 20px;
		width: 100%;
		border-radius: 12px;
		border: none;
		box-shadow: var(--shadow);
		background-color: var(--secondary1);
		color: var(--main1);
		font-size: x-large;
		font-weight: 600;

		&:hover {
			transform: scale(1.03);
			transition: 0.2s;
		}
	}

	form label {
		text-shadow: var(--shadow);
	}
</style>
