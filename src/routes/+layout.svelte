<script lang="ts">
	import '../app.css';
	import IconUser from '~icons/mdi/account';
	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	import { invalidate } from '$app/navigation';

	export let data: PageData;
	let { supabase, session } = data;
	$: ({ supabase, session } = data);

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => data.subscription.unsubscribe();
	});
</script>

<nav>
	<a href="/" class="logo">
		<h1>Slanga</h1>
	</a>

	{#if data.session?.user}
		<!-- logged user navigation -->
		<a href="/definitions/browse">Definitions</a>
		<a href="/">Home</a>
		<a href="/about">About</a>
		<a class="logged-user" href="/profile">
			<p>{data.session.user.user_metadata.username}</p>
			<IconUser style="font-size: 2em" />
		</a>
	{:else}
		<!-- annonymous user navigation -->
		<a href="/auth/login">Sign in</a>
		<a href="/auth/register">Register</a>
	{/if}
</nav>

<slot />

<style>
	nav {
		background-color: var(--secondary1);
		color: var(--main1);
		display: flex;
		justify-content: space-around;
		padding: 10px;
		z-index: 100;
		align-items: center;
		box-shadow: var(--shadow);
	}

	a {
		color: var(--main1);
		text-decoration: none;
		&:hover {
			transform: scale(1.1);
			color: var(--active);
			text-shadow: var(--shadowlight);
			transition: 0.2s;
		}
	}

	.logged-user {
		display: flex;
		align-items: center;
		gap: 0.5em;
	}
</style>
