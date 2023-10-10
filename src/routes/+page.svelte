<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

{#if data.session}
	<h1>Welcome {data.session.user.email}!</h1>
	<form action="/api/logout" method="post">
		<button type="submit">Logout</button>
	</form>
{:else}
	<div>Annonymous Home page</div>
{/if}
