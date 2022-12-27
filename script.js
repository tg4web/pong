import Ball from "./ball.js";
import Paddle from "./paddle.js";

const ball = new Ball(document.getElementById("ball"));
const playerPaddle = new Paddle(document.getElementById("player-paddle"));
const computerPaddle = new Paddle(document.getElementById("computer-paddle"));
const playerScoreElem = document.getElementById("player-score");
const computerScoreElem = document.getElementById("computer-score");

function isLose() {
    const rect = ball.rect();
    return rect.right >= window.innerWidth || rect.left <= 0;
}

function handleLose() {
    const rect = ball.rect();
    if (rect.right >= window.innerWidth) {
        playerScoreElem.innerText = parseInt(playerScoreElem.innerText) + 1;
    }
    if (rect.left <= 0) {
        computerScoreElem.innerText = parseInt(computerScoreElem.innerText) + 1;
    }
    ball.reset();
    playerPaddle.reset();
    computerPaddle.reset();
}

// Update Loop
let lastTime;
function update(time) {
  if (lastTime != null) {
    const delta = time - lastTime;
    const hue = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--hue"));
    //Update Code
    ball.update(delta, [playerPaddle.rect(), computerPaddle.rect()]);
    computerPaddle.update(delta, ball.y);
    document.addEventListener("mousemove", (e) => {
      playerPaddle.position = (e.y / window.innerHeight) * 100;
    });
     document.documentElement.style.setProperty("--hue", hue + delta * 0.025);

    if (isLose()) {
      handleLose();
    }
  }
  lastTime = time;
  window.requestAnimationFrame(update);
}



 window.requestAnimationFrame(update);