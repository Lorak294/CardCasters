<script lang="ts">

    export let player: Player;
    let avatarimg = "images/avatar.jpg";
</script>

<div class="card-container">
    <div class="profile-container"/>
    <div class="info-container">
        <h3>{player.name}</h3>
        <p>{player.state}</p>
    </div>
    <div class="score-container">
        {player.score} pts
    </div>
</div>

<style>
    .card-container {
        scroll-snap-align: start;
        margin: 5px 5px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background:  #fcfefe;
        color: black;
        padding: 10px;
        border-radius: 15px;
        gap: 10px;
        min-width: 300px;
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

        &:hover{
            background-color: #e4e4e4;
        }
    }

    .profile-container {
        width: 50px;
        height: 50px;
        background-image: url("/images/avatar.jpg");
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        border-radius: 50%;
    }

    .info-container{
        /* flex-grow: 5; */
        /* background-color: aqua; */
        width: 60%;
        justify-self: left;
    }

    .score-container {
        /* flex-grow: 1; */
        width: 20%;
        /* background-color: brown; */
        display: flex;
        align-items: center;
    }
</style>

