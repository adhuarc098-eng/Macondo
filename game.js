
const emojis=[
'🍎','🍎','🚀','🚀','🎮','🎮','⚽','⚽',
'🔥','🔥','🌟','🌟','🐱','🐱','🍉','🍉',
'🎧','🎧','🧠','🧠','🎲','🎲','🚗','🚗',
'📚','📚','🦄','🦄','🎯','🎯','💎','💎'
];

let firstCard=null;
let secondCard=null;
let lockBoard=false;

let score=0;
let moves=0;
let matches=0;

const board=document.getElementById("board");

document.getElementById("player").innerText=
localStorage.getItem("playerName") || "Guest";

function shuffle(array){

for(let i=array.length-1;i>0;i--){

const j=Math.floor(Math.random()*(i+1));

[array[i],array[j]]=[array[j],array[i]];

}

return array;

}

shuffle(emojis);

emojis.forEach(emoji=>{

const card=document.createElement("div");

card.classList.add("card");

card.innerHTML="❓";

card.dataset.emoji=emoji;

card.addEventListener("click",flipCard);

board.appendChild(card);

});

function flipCard(){

if(lockBoard) return;

if(this===firstCard) return;

this.classList.add("flipped");

this.innerHTML=this.dataset.emoji;

if(!firstCard){

firstCard=this;

return;

}

secondCard=this;

moves++;

document.getElementById("moves").innerText=moves;

checkMatch();

}

function checkMatch(){

if(firstCard.dataset.emoji===secondCard.dataset.emoji){

firstCard.classList.add("matched");
secondCard.classList.add("matched");

score+=10;
matches++;

document.getElementById("score").innerText=score;

resetCards();

if(matches===16){

saveScore();

setTimeout(()=>{
alert("You Won!");
window.location.href="leaderboard.html";
},500);

}

}else{

lockBoard=true;

setTimeout(()=>{

firstCard.innerHTML="❓";
secondCard.innerHTML="❓";

firstCard.classList.remove("flipped");
secondCard.classList.remove("flipped");

resetCards();

},800);

}

}

function resetCards(){

[firstCard,secondCard]=[null,null];

lockBoard=false;

}

function saveScore(){

const leaderboard=
JSON.parse(localStorage.getItem("leaderboard")) || [];

leaderboard.push({
name:localStorage.getItem("playerName"),
score:score
});

leaderboard.sort((a,b)=>b.score-a.score);

localStorage.setItem("leaderboard",JSON.stringify(leaderboard));

}
