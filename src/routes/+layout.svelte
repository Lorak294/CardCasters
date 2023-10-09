<script lang="ts">
	import '../app.css';
	import IconUser from '~icons/mdi/account';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<nav>
	<a href="/" class="logo">
		<h1>CardCasters</h1>
	</a>

	{#if data.user}
		<!-- logged user navigation -->
		<a href="/play">Play</a>
		<a href="/decks/browse">Decks</a>
		<a href="/decks/newdeck">New Deck</a>
		<a class="logged-user" href="/profile">
			<p>{data.user.username}</p>
			<IconUser style="font-size: 2em" />
		</a>
	{:else}
		<!-- annonymous user navigation -->
		<a href="/login">Sign in</a>
		<a href="/register">Register</a>
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
