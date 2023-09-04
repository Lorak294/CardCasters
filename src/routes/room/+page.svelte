<script lang="ts">
	import Room from '$lib/components/Room/Room.svelte';
	import { createStore } from '$lib/stores/RoomStore';
	import type { PageData } from './$types';

	export let data: PageData;

	createStore(data.player);
</script>

<Room />
