console.log("Client connected");
const socket = io("http://localhost:8000");

// Sounds
const clickSound = new Audio("Sounds/click.mp3");
const winSound = new Audio("Sounds/win.mp3");
const loseSound = new Audio("Sounds/lose.mp3");
const drawSound = new Audio("Sounds/draw.mp3");

// Elements
const loginDiv = document.getElementById("login");
const gameDiv = document.getElementById("game");
const usernameInput = document.getElementById("username");
const joinBtn = document.getElementById("joinBtn");
const statusText = document.getElementById("status");
const resultDiv = document.getElementById("result");
const scoreBoard = document.getElementById("scoreBoard");
const overlay = document.getElementById("overlay");

let roundCount = 0;

// Join game
joinBtn.addEventListener("click", () => {
    const username = usernameInput.value.trim();
    if (username) {
        socket.emit("setUsername", username);
        loginDiv.style.display = "none";
        gameDiv.style.display = "block";
        statusText.textContent = "Waiting for opponent...";
    }
});

// Choice buttons
document.querySelectorAll(".choiceBtn").forEach((btn) => {
    btn.addEventListener("click", () => {
        const choice = btn.dataset.choice;
        clickSound.play();
        socket.emit("playerChoice", choice);
        statusText.textContent = "Waiting for opponent's move...";
    });
});

// Game start
socket.on("startGame", (players) => {
    statusText.textContent = "Game started!";
});

// Round result
socket.on("roundResult", (data) => {
    const resultColor = {
        win: 'lightgreen',
        lose: '#ff7b7b',
        draw: 'lightgray'
    };

    resultDiv.style.backgroundColor = resultColor[data.result];
    resultDiv.innerHTML = `
        <p>You chose: <strong>${data.yourChoice}</strong></p>
        <p>${data.opponent} chose: <strong>${data.opponentChoice}</strong></p>
        <p>Result: <strong>${data.result.toUpperCase()}</strong></p>
    `;

    const scores = data.scores.map(p => `<li>${p.username}: ${p.score}</li>`).join("");
    scoreBoard.innerHTML = `<ul>${scores}</ul>`;

    // Play result sound
    if (data.result === 'win') {
        winSound.play();
        overlay.innerText = "🎉 YOU WIN! 🎉";
        overlay.style.display = "block";
        setTimeout(() => overlay.style.display = "none", 1500);
    } else if (data.result === 'lose') {
        loseSound.play();
    } else {
        drawSound.play();
    }

    // Auto-reset after 5 rounds
    roundCount++;
    if (roundCount >= 5) {
        setTimeout(() => {
            alert("5 rounds completed. Game will reset.");
            location.reload();
        }, 2000);
    }
});

// Opponent left
socket.on("playerLeft", () => {
    alert("Opponent left the game. The game will reset.");
    location.reload();
});
