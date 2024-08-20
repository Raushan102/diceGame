"use strict";

const Dice = document.querySelector(".diceContainer");
const dices = document.querySelectorAll(".dice");
const playerOneCurrentScore = document.querySelector(".playerOneCurrentScore");
document.getElementById("holdContainer").addEventListener("click", handleHold);
const winner = document.querySelector(".WinnerName");
console.log(winner);

document.querySelector(".closeButton").addEventListener("click", closeModel);

const playerOneMainScore = document.querySelector(".PlayerOneMainScore");
const playerTwoCurrentScore = document.querySelector(".PlayerTwoCurrentScore");
const playerTwoMainScore = document.querySelector(".playerTwoMainScore");
const dialog = document.querySelector("dialog");

const players = document.querySelectorAll(".player");

document
  .querySelector(".newGamePosition")
  .addEventListener("click", Handle_reset);

Dice.addEventListener("click", RoleDice);

const active = {
  activePlayer: 1,
  times: 10,
};

const Player1Score = {
  player1Score: 0,
  MainScore: 0,
};
const Player2Score = {
  player2Score: 0,
  MainScore: 0,
};

// function to roll the rice
function RoleDice() {
  active.times--;
  console.log(active.times);

  changeActivePlayer();

  if (active.times === 0) {
    console.log("yes this funciton called and ", active.times);

    return handleResult();
  }

  let randomNumber = Math.floor(Math.random() * 7);
  if (randomNumber === 6) {
    changeActivePlayer();
    handleResetCurrentScore(active.activePlayer);
  }

  if (active.activePlayer === 1 && randomNumber !== 6) {
    handlePlayerOneCurrentScore(randomNumber + 1);
  } else if (active.activePlayer === 2 && randomNumber !== 6) {
    handlePlayerTwoCurrentScore(randomNumber + 1);
  }

  console.log(dices);
  handlePreviousDice();
  dices[randomNumber].classList.add("top");
}

function handlePlayerOneCurrentScore(score) {
  Player1Score.player1Score += score;
  const updatedPlayerCurrentScore = Player1Score.player1Score;
  playerOneCurrentScore.textContent = updatedPlayerCurrentScore;
}

function handlePlayerTwoCurrentScore(score) {
  Player2Score.player2Score += score;
  const updatedPlayerCurrentScore = Player2Score.player2Score;
  playerTwoCurrentScore.textContent = updatedPlayerCurrentScore;
}

function handleHold() {
  if (active.activePlayer === 1) {
    Player1Score.MainScore += Player1Score.player1Score;
    playerOneMainScore.textContent = Player1Score.MainScore;
    Player1Score.player1Score = 0; // Reset current score
    playerOneCurrentScore.textContent = 0;
    active.activePlayer = 2;
    changeActivePlayer();
  } else if (active.activePlayer === 2) {
    Player2Score.MainScore += Player2Score.player2Score;
    playerTwoMainScore.textContent = Player2Score.MainScore;
    Player2Score.player2Score = 0; // Reset current score
    playerTwoCurrentScore.textContent = 0;
    active.activePlayer = 1;
    changeActivePlayer();
  }
}

function handleResetCurrentScore(activePlayer) {
  if (activePlayer === 1) {
    Player1Score.player1Score = 0; // Reset current score
    playerOneCurrentScore.textContent = 0;
    active.activePlayer = 2;
  } else if (activePlayer === 2) {
    Player2Score.player2Score = 0; // Reset current score
    playerTwoCurrentScore.textContent = 0;
    active.activePlayer = 1;
  }
}

function Handle_reset() {
  Player1Score.MainScore = 0;
  Player1Score.player1Score = 0; // Reset current score
  playerOneMainScore.textContent = 0;
  playerOneCurrentScore.textContent = 0;

  Player2Score.player2Score = 0; // Reset current score
  Player2Score.MainScore = 0;
  playerTwoMainScore.textContent = 0;
  playerTwoCurrentScore.textContent = 0;
  active.activePlayer = active.activePlayer === 2 ? 1 : 2;
  changeActivePlayer()
  active.times = 10;
}

function handleResult() {
  dialog.showModal();
  if (Player1Score.MainScore > Player2Score.MainScore) {
    console.log("player 1 win the game");
    winner.textContent = "player 1";

    Handle_reset();
  } else if (Player1Score.MainScore < Player2Score.MainScore) {
    console.log("player 2 win the game");
    winner.textContent = "player 2";
    Handle_reset();
  } else if(Player1Score.MainScore === Player2Score.MainScore) {
       winner.textContent = "Draw";
    Handle_reset();
  }
}

function changeActivePlayer() {
  for (let i = 0; i < players.length; i++) {
    const index = players[i].classList.contains("activePlayerColor");
    if (index) {
      players[i].classList.remove("activePlayerColor");
    }
  }
  for (let i = 0; i < players.length; i++) {
    players[active.activePlayer - 1].classList.add("activePlayerColor");
  }
}

function handlePreviousDice() {
  for (let i = 0; i < dices.length; i++) {
    const index = dices[i].classList.contains("top");
    if (index) {
      dices[i].classList.remove("top");
    }
  }
}

function closeModel() {
  dialog.close();
}
