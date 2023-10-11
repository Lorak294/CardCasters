<script lang="ts">
	import type { SubmitFunction } from '@sveltejs/kit';
	import type { ActionData, PageData } from './$types';
	import { enhance } from '$app/forms';
	import Avatar from '$lib/components/Avatar.svelte';

	export let data: PageData;
	export let form: ActionData;

	let { session, supabase, profile } = data;
	$: ({ session, supabase, profile } = data);
	let loading = false;
	let profileForm: HTMLFormElement;
	let avatarUrl = profile.avatar_url ?? '';

	const handleSubmit: SubmitFunction = () => {
		loading = true;
		return async () => {
			loading = false;
		};
	};
</script>

<div class="center-v">
	<h1>Profile page</h1>
	<form
		class="center-v"
		method="post"
		action="?/update"
		bind:this={profileForm}
		use:enhance={handleSubmit}
	>
		<div class="editable-section">
			<Avatar
				{supabase}
				on:upload={() => {
					profileForm.requestSubmit();
				}}
				bind:url={avatarUrl}
			/>

			<div class="text-inputs">
				<div class="single-input">
					<label for="email">Email</label>
					<input id="email" type="text" value={session?.user.email} disabled />
				</div>

				<div class="single-input">
					<label for="username">Username</label>
					<input id="username" name="username" type="text" value={profile.username} disabled />
				</div>

				<div class="single-input">
					<label for="profile_text">Caption</label>
					<input
						id="profile_text"
						name="profile_text"
						type="text"
						value={form?.profile_text ?? profile.profile_text}
					/>
				</div>
			</div>
		</div>

		<div>
			<input
				type="submit"
				class="button block primary"
				value={loading ? 'Loading...' : 'Update'}
				disabled={loading}
			/>
		</div>
	</form>
</div>

<style>
	.center-v {
		display: flex;
		flex-direction: column;
		width: 100%;
		align-items: center;
		padding: 1em;
	}

	.editable-section {
		display: flex;
		height: 100%;
	}

	.text-inputs {
		/* height: 100%; */
		display: flex;
		flex-direction: column;
		gap: 2em;
		padding: 1em;
	}

	.single-input {
		display: flex;
		justify-content: space-between;
		gap: 1em;
	}
</style>
