
const leaderboard=
JSON.parse(localStorage.getItem("leaderboard")) || [];

const div=document.getElementById("leaderboard");

leaderboard.sort((a,b)=>b.score-a.score);

leaderboard.forEach((player,index)=>{

div.innerHTML += `
<div class="player">
#${index+1} • ${player.name} • ${player.score} points
</div>
`;

});
