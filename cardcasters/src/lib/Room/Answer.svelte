<script lang="ts">
  import AnswerCard from "./AnswerCard.svelte";
  export let answer : Answer;

</script>

<div class="container">
    <p class="owner-name">{answer.submiter.name}</p>
    <AnswerCard card={answer.card}/>
</div>

<style>
  .container{
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    align-items: center;
  }

  .owner-name{
    padding: 10px;
  }
</style>