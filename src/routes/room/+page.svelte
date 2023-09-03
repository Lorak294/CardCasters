<script lang="ts">
	import Room from '$lib/Room/Room.svelte';
	import { roomState } from '../../stores/roomStore';

	roomState.newRound();
</script>

<Room />
