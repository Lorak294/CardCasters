<script lang="ts">
	import OwnCardListWindow from "$lib/Room/OwnCardListWindow.svelte";
	import PlayerCard from "$lib/Room/PlayerCard.svelte";
	import PlayerListWindow from "$lib/Room/PlayerListWindow.svelte";
	import Room from "$lib/Room/Room.svelte";
	import { mockLoggedPlayer } from "../mockdata";
    import { roomState } from "../roomStore";

    roomState.newRound()
</script>   

<div class="container">
    <!-- <OwnCardListWindow windowSize={3}/> -->
    <!-- <PlayerCard player={mockLoggedPlayer}/> -->
    <!-- <PlayerListWindow windowSize={4}/> -->
    <Room/>
</div>
<style>
    .container{
        width: 100vw;
        height: 100vh;
        max-width: 100%;
    }

    :global(body) { /* this will apply to <body> */ margin: 0; padding: 0;}
</style>
