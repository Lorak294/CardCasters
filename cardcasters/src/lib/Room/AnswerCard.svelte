<script lang="ts">
    import { fade } from 'svelte/transition';
    import { roomState } from '../../roomStore';
    import CheckIcon from '~icons/ic/round-check';

    export let card : Card;
    let selectedCard = roomState.selectedCard;

    $: fontSize = getFontSize(card.text.length);

    function getFontSize(textLength: number) {
        const maxSize = 26;
        const minSize = 12;

        const reductionStep = 4;

        let finalSize = Math.min(maxSize, Math.max(minSize, Math.round(maxSize - textLength / reductionStep)));
        return finalSize;
    }
</script>

<div transition:fade class ="wrapper">
    {#if $selectedCard?.id === card.id}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div class="selected-marker" on:click={() => roomState.selectCard(card)}></div>
    {/if}

    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div class="card-container" on:click={() => roomState.selectCard(card)}>
        <h2 class="card-text" style="font-size: {fontSize + 'px'}" >{card.text}</h2>
    </div>
</div>

<style>
    .wrapper{
        position: relative;
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

    .selected-marker{
        position: absolute;
        z-index: 2;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        border-radius: 15px;
        background-color: rgba(101, 252, 82, 0.5);
        box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
        display: flex;
        justify-content: center;
        align-items: center;
        /* box-shadow: rgba(0, 0, 0, 0.35) 0px -50px 36px -28px inset; */
    }

    .card-container {
        z-index: 1;
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        background-color: #fcfefe;
        border-radius: 15px;
        position: relative;
        color: black;
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