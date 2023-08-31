<script lang="ts">
  import AnswerCard from "./AnswerCard.svelte";
  import { roomState } from "../../roomStore";
  export let answer : Answer;

  let selectedAnswer = roomState.selectedAnswer;

  function handleSelection(event: any) {
    roomState.selectAnswer(answer);
  }

</script>
<div class="container">
    <p class="owner-name">
      {#if !roomState.canSeeAnswerSubmiter(answer)}
         ???
      {:else}
        {answer.submiter.name}
      {/if}
    </p>
    <AnswerCard hidden={!roomState.canSeeAnswer(answer)} selected={$selectedAnswer?.card.id === answer.card.id} card={answer.card} on:item-selected={handleSelection}/>
</div>

<style>
  .container{
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    align-items: center;
    position: relative;
  }
  .owner-name{
    padding: 10px;
  }
</style>