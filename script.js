// Deklarasi Variabel

// canvas
const canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
// Box Property
let boxWidth = 100;
let boxHeight = 20;
// Player 1
let boxX = (canvas.width - boxWidth) / 2;
let boxY = canvas.height - boxHeight;
// Player 2
let box2X = (canvas.width - boxWidth) / 2;
let box2Y = 0;
// Ball
let speedBallX = 2;
let speedBallY = -2;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballRadius = 10;
let ballWidth = 10;
// Control Box
let rightPressed = false;
let leftPressed = false;
let a = false;
let d = false;
// Score
let score1 = 0;
let score2 = 0;
let score1Element = document.getElementById("score1");
let score2Element = document.getElementById("score2");
const winScore = 5;
// Sound
let borderXSound;
let pointSound;
let hitSound;
let winSound;
let gameStart;
hitSound = new Audio("assets/tennis-ball-hit-151257.mp3");
pointSound = new Audio("assets/collect-ring-15982.mp3");
borderXSound = new Audio("assets/soccer-ball-kick-37625.mp3");
winSound = new Audio("assets/goodresult-82807.mp3");
gameStart = new Audio("assets/game-start-6104.mp3");
musicLobby = new Audio("assets/game-music-loop-3-144252.mp3");
musicBacksound = new Audio("assets/cyber-town-simcity-style-music-22907.mp3");
// Background
let backgroundImage;
// Button start game dan level
let isGameRunning = false;
const divStartGame = document.getElementById("start-game");
const divSelectLevel = document.getElementById("level");
const divGameContainer = document.getElementById("game-container");
const btnMulai = document.getElementById("btn-start");
const btnEasy = document.getElementById("btn-easy");
const btnMedium = document.getElementById("btn-medium");
const btnHard = document.getElementById("btn-hard");
const btnExpert = document.getElementById("btn-expert");
// interval
var interval;

// Key Handler
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
  if (e.key == "Right" || e.key == "ArrowRight") {
    rightPressed = true;
  } else if (e.key == "Left" || e.key == "ArrowLeft") {
    leftPressed = true;
  } else if (e.key == "a") {
    a = true;
  } else if (e.key == "d") {
    d = true;
  }
}

function keyUpHandler(e) {
  if (e.key == "Right" || e.key == "ArrowRight") {
    rightPressed = false;
  } else if (e.key == "Left" || e.key == "ArrowLeft") {
    leftPressed = false;
  } else if (e.key == "a") {
    a = false;
  } else if (e.key == "d") {
    d = false;
  }
}

// Draw Box Player 1
function drawBox() {
  ctx.beginPath();
  ctx.rect(boxX, boxY, boxWidth, boxHeight);
  ctx.fillStyle = "yellow";
  ctx.fill();
  ctx.closePath();
}
// Draw Box Player 2
function drawBox2() {
  ctx.beginPath();
  ctx.rect(box2X, box2Y, boxWidth, boxHeight);
  ctx.fillStyle = "yellow";
  ctx.fill();
  ctx.closePath();
}
// Draw Ball
function drawBall() {
  ctx.beginPath();
  ctx.arc(ballX, ballY, 10, 0, Math.PI * 2);
  ctx.fillStyle = "white";
  ctx.fill();
  ctx.closePath();
}
// Draw background field
function drawBackground() {
  backgroundImage = new Image();
  backgroundImage.src = "assets/background-images.jpg";
  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
}

//   Control Player 1
function controlPlayer1() {
  if (rightPressed && boxX < canvas.width - boxWidth) {
    boxX += 7;
  } else if (leftPressed && boxX > 0) {
    boxX -= 7;
  }
}

//  Control Player 2
function controlPlayer2() {
  if (d && box2X < canvas.width - boxWidth) {
    box2X += 7;
  } else if (a && box2X > 0) {
    box2X -= 7;
  }
}
function gerakBola() {
  // Untuk pantulan dinding pada sumbu X
  if (
    ballX + speedBallX > canvas.width - ballRadius ||
    ballX + speedBallX < ballRadius
  ) {
    speedBallX = -speedBallX;
    borderXSound.play();
  }

  // Untuk Pantulan dinding pada sumbu Y
  if (ballY + speedBallY > canvas.height - ballRadius) {
    // Player 2 scores if ball hits bottom border
    score2++;
    pointSound.play();
    speedBallY = -speedBallY;
  } else if (ballY + speedBallY < ballRadius) {
    // Player 1 scores if ball hits top border
    score1++;
    pointSound.play();
    speedBallY = -speedBallY;
  } else {
    // Tabrakan bola dengan masing masing box player
    if (ballY + speedBallY > canvas.height - boxHeight) {
      // Tabrakan player 1
      if (ballX > boxX && ballX < boxX + boxWidth) {
        hitSound.play();
        speedBallY = -speedBallY;
      }
    } else if (ballY + speedBallY < box2Y + boxHeight) {
      // Tabrakan player 2
      if (ballX > box2X && ballX < box2X + boxWidth) {
        hitSound.play();
        speedBallY = -speedBallY;
      }
    }
  }
  // Move Ball
  ballX += speedBallX;
  ballY += speedBallY;
}

// Deteksi Pemenang
function deteksiWinner() {
  if (score1 === winScore) {
    winSound.play();
    musicBacksound.pause();
    alert("SELAMAT PLAYER 1 MEMENANGKAN PERMAINAN!");
    clearInterval(interval); // Stop the game loop
  } else if (score2 === winScore) {
    winSound.play();
    musicBacksound.pause();
    alert("SELAMAT PLAYER 2 MEMENANGKAN PERMAINAN!");
    clearInterval(interval);
  }
}

// Update Score
function updateScoreboard() {
  score1Element.textContent = score1;
  score2Element.textContent = score2;
}

// Draw game
function drawGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // Draw Background
  drawBackground();
  // Draw Box
  drawBox();
  drawBox2();
  // Draw Ball
  drawBall();
  // Control
  controlPlayer1();
  controlPlayer2();
  // Pergerakan bola memantul dinding
  gerakBola();
  // Update Score
  updateScoreboard();
  // detectWinner
  deteksiWinner();
}

btnMulai.addEventListener("click", function () {
  gameStart.play();
  divStartGame.style.display = "none";
  divSelectLevel.style.display = "flex";
  musicLobby.play();
});

if (isGameRunning === false) {
  btnEasy.addEventListener("click", function () {
    gameStart.play();
    musicLobby.pause();
    musicBacksound.play();
    isGameRunning = true;
    divSelectLevel.style.display = "none";
    divGameContainer.style.display = "flex";
    interval = setInterval(drawGame, 10);
  });
  btnMedium.addEventListener("click", function () {
    gameStart.play();
    musicLobby.pause();
    musicBacksound.play();
    isGameRunning = true;
    divSelectLevel.style.display = "none";
    divGameContainer.style.display = "flex";
    speedBallX += 3;
    speedBallY -= 3;
    interval = setInterval(drawGame, 10);
  });
  btnHard.addEventListener("click", function () {
    gameStart.play();
    musicLobby.pause();
    musicBacksound.play();
    isGameRunning = true;
    divSelectLevel.style.display = "none";
    divGameContainer.style.display = "flex";
    speedBallX += 6;
    speedBallY -= 6;
    interval = setInterval(drawGame, 10);
  });
  btnExpert.addEventListener("click", function () {
    gameStart.play();
    musicLobby.pause();
    musicBacksound.play();
    isGameRunning = true;
    divSelectLevel.style.display = "none";
    divGameContainer.style.display = "flex";
    speedBallX += 9;
    speedBallY -= 9;
    interval = setInterval(drawGame, 10);
  });
} else {
  interval = setInterval(drawGame, 10);
}
