const emojis = [
  "🍎",
  "🍎",
  "🚀",
  "🚀",
  "🎮",
  "🎮",
  "🐱",
  "🐱",
  "⚽",
  "⚽",
  "🎵",
  "🎵",
  "🔥",
  "🔥",
  "🌟",
  "🌟",
];

let firstCard = null;
let secondCard = null;
let lockBoard = false;

let score = 0;
let moves = 0;
let matches = 0;
let time = 60;
let timer;

const gameBoard = document.getElementById("gameBoard");

const playerName = localStorage.getItem("playerName");

document.getElementById("welcome").innerText = "Player: " + playerName;

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
}

function createBoard() {
  gameBoard.innerHTML = "";

  shuffle(emojis);

  emojis.forEach((emoji) => {
    const card = document.createElement("div");

    card.classList.add("card");

    card.dataset.emoji = emoji;

    card.innerHTML = "❓";

    card.addEventListener("click", flipCard);

    gameBoard.appendChild(card);
  });
}

function flipCard() {
  if (lockBoard) return;

  if (this === firstCard) return;

  this.classList.add("flipped");

  this.innerHTML = this.dataset.emoji;

  if (!firstCard) {
    firstCard = this;

    return;
  }

  secondCard = this;

  moves++;

  document.getElementById("moves").innerText = moves;

  checkMatch();
}

function checkMatch() {
  if (firstCard.dataset.emoji === secondCard.dataset.emoji) {
    firstCard.classList.add("matched");

    secondCard.classList.add("matched");

    score += 10;

    matches++;

    document.getElementById("score").innerText = score;

    resetCards();

    if (matches === 8) {
      winGame();
    }
  } else {
    lockBoard = true;

    setTimeout(() => {
      firstCard.classList.remove("flipped");

      secondCard.classList.remove("flipped");

      firstCard.innerHTML = "❓";

      secondCard.innerHTML = "❓";

      resetCards();
    }, 1000);
  }
}

function resetCards() {
  [firstCard, secondCard] = [null, null];

  lockBoard = false;
}

function startTimer() {
  clearInterval(timer);

  time = 60;

  document.getElementById("timer").innerText = time;

  timer = setInterval(() => {
    time--;

    document.getElementById("timer").innerText = time;

    if (time <= 0) {
      clearInterval(timer);

      alert("Time Over!");

      location.reload();
    }
  }, 1000);
}

function winGame() {
  clearInterval(timer);

  alert("You Won! Score: " + score);

  let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];

  leaderboard.push({
    name: playerName,

    score: score,
  });

  localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
}

createBoard();

startTimer();
