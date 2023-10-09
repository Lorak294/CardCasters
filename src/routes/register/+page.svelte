<script lang="ts">
	import { enhance } from '$app/forms';
	import { error } from '@sveltejs/kit';
	import type { ActionData, PageData } from './$types';

	export let form: ActionData;
</script>

<div class="container">
	<div class="widget">
		<form action="?/register" class="register-form" method="POST" use:enhance>
			<h1 class="title">Register</h1>

			<div class="input-with-labels">
				<label for="email">Email</label>
				<input
					type="email"
					name="email"
					value={form?.data?.email ?? ''}
					class:input-error={form?.errors?.email}
				/>
				{#if form?.errors?.email}
					<label for="email" class="error-label">
						{form.errors.email.join(', ')}
					</label>
				{/if}
			</div>

			<div class="input-with-labels">
				<label for="username">Username</label>
				<input
					type="text"
					name="username"
					value={form?.data?.username ?? ''}
					class:input-error={form?.errors?.username}
				/>
				{#if form?.errors?.username}
					<label for="username" class="error-label">
						{form.errors.username.join(', ')}
					</label>
				{/if}
			</div>

			<div class="input-with-labels">
				<label for="password">Password</label>
				<input type="password" name="password" class:input-error={form?.errors?.password} />
				{#if form?.errors?.password}
					<label for="password" class="error-label">
						{form.errors.password.join(', ')}
					</label>
				{/if}
			</div>

			<div class="input-with-labels">
				<label for="passwordConfirm">Confirm password</label>
				<input
					type="password"
					name="passwordConfirm"
					class:input-error={form?.errors?.passwordConfirm}
				/>
				{#if form?.errors?.passwordConfirm}
					<label for="passwordConfirm" class="error-label">
						{form.errors.passwordConfirm.join(', ')}
					</label>
				{/if}
			</div>

			<button type="submit">Register</button>
		</form>
		<div class="link">
			<p>Already have an account?</p>
			<a href="/login">Sign in</a>
		</div>
	</div>
</div>

<style>
	.error-label {
		color: var(--cancel);
		text-shadow: var(--shadow);
	}

	.register-form {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		height: 100%;
	}

	.container {
		width: 100%;
		display: flex;
		justify-content: center;
		padding: 5vh;
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

	.input-with-labels {
		margin-bottom: 10px;
		min-height: 6em;
	}
	.input-error {
		outline: 2px solid var(--cancel);
	}

	form input {
		font-size: larger;
		border-radius: 10px;
		padding: 10px;
		border: 1px solid #ccc;
		box-shadow: var(--shadow);
		display: inline-block;
		box-sizing: border-box;
		width: 100%;
		margin: 5px 0;

		&:focus {
			outline: none;
		}
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
</style>
