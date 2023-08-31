<script lang="ts">
	import Room from "$lib/Room/Room.svelte";
    import { roomState } from "../../roomStore";

    roomState.newRound()
</script>   

<Room/>