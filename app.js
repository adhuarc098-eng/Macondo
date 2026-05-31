
document.getElementById("playBtn").addEventListener("click",()=>{

const name=document.getElementById("playerName").value.trim();

if(name===""){
alert("Enter Username");
return;
}

localStorage.setItem("playerName",name);

window.location.href="game.html";

});

document.getElementById("leaderboardBtn").addEventListener("click",()=>{
window.location.href="leaderboard.html";
});


