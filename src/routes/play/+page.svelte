<script lang="ts">
	//import Room from '$lib/components/Room/Room.svelte';
	//import { createStore } from '$lib/stores/RoomStore';
	//import type { PageData } from './$types';
	import { onMount } from 'svelte';
	import * as Colyseus from 'colyseus.js';

	//export let data: PageData;
	//createStore(data.player);

	onMount(async () => {
		let client = new Colyseus.Client('ws://localhost:2567');
		client
			.joinOrCreate('cardcasters', { roomCode: 'ROOM1' })
			.then((room) => {
				console.log(room.sessionId, 'joined', room.name);
				room.send('introduce', { id: 'testId', username: 'testuser' });
			})
			.catch((err) => {
				console.log('error joining room', err);
			});
	});
</script>
