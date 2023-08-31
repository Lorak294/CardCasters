<script lang="ts">
    import { fade } from 'svelte/transition';
    import { createEventDispatcher } from 'svelte';

    export let card : Card;
    export let selected: boolean;
    export let hidden: boolean;

    const dispatch = createEventDispatcher();

    $: fontSize = getFontSize(card.text.length);

    function getFontSize(textLength: number) {
        const maxSize = 26;
        const minSize = 12;

        const reductionStep = 4;

        let finalSize = Math.min(maxSize, Math.max(minSize, Math.round(maxSize - textLength / reductionStep)));
        return finalSize;
    }

    function handle_click() {
        dispatch('item-selected');
    }
</script>

<div transition:fade class ="wrapper">
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div class="card-container" class:selected={!hidden && selected} class:hidden={hidden} on:click={handle_click}>
        <h2 class="card-text" style="font-size: {fontSize + 'px'}" >
            {#if hidden}
                 ?
            {:else}
                 {card.text}
            {/if}
        </h2>
    </div>
</div>

<style>
    .wrapper{
        height: 100%;
        /* min-height: 300px; */
        width: 100%;
        border-radius: 15px;
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
        &:hover{
            transform: translate(0, -10px);
            transition: 0.2s;
        }
    }

    .card-container {
        height: 100%;
        width: 100%;
        background-color: #fcfefe;
        border-radius: 15px;
        position: relative;
        color: black;
    }

    .selected {
        background-color: #339989;
        color: #fcfefe;
    }

    .hidden {
        background-color: #727272;
        color: #fcfefe;
    }

    .card-text {
        margin: 0 auto;
        position: absolute;
        top: 50%;
        left: 50%;
        -ms-transform: translate(-50%,-50%);
        transform: translate(-50%,-50%);
        overflow-wrap: break-word;
        word-wrap: break-word;
        hyphens: auto;
    }

</style>