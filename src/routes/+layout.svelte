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
	<a href="/room">Room</a>
	<a href="/decks/browse">Decks</a>
	<a href="/decks/newdeck">New Deck</a>
	<div class="logged-user">
		<p>{data.user.name}</p>
		<IconUser style="font-size: 2em" />
	</div>
</nav>

<slot />

<style>
	nav {
		background-color: var(--active);
		color: var(--main1);
		display: flex;
		justify-content: space-around;
		padding: 10px;
		z-index: 100;
		align-items: center;
	}

	a {
		color: var(--main1);
		text-decoration: none;
	}

	.logged-user {
		display: flex;
		align-items: center;
		gap: 0.5em;
	}
</style>
