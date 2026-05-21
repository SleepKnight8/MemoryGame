let solve = [];
let playerIndex = 0;

let roundRunning = false;
let canPlay = false;

let score = 0;
let bestScore = 0;

/* ---------------- LOAD ---------------- */

loadGame();
updateUI();

/* ---------------- START GAME ---------------- */

function play() {

    if (roundRunning) return;

    roundRunning = true;
    canPlay = false;
    playerIndex = 0;

    CreateSolve();
    ShowSolve();
}

/* ---------------- GENERATE SEQUENCE ---------------- */

function CreateSolve() {
    solve = [];

    let len = Math.floor(Math.random() * 5) + 3;

    for (let i = 0; i < len; i++) {
        solve.push(Math.floor(Math.random() * 9) + 1);
    }
}

/* ---------------- SHOW SEQUENCE ---------------- */

function ShowSolve() {

    let time = 0;

    solve.forEach((num) => {

        setTimeout(() => {

            let cell = document.querySelector(".c" + num);

            cell.classList.add("active");

            setTimeout(() => {
                cell.classList.remove("active");
            }, 400);

        }, time);

        time += 700;
    });

    setTimeout(() => {
        canPlay = true;
        showMessage("Your turn 🎮");
    }, time);
}

/* ---------------- PLAYER INPUT ---------------- */

document.querySelectorAll("td").forEach(cell => {
    cell.addEventListener("click", () => {

        if (!canPlay) return;

        let value = Number(cell.dataset.value);

        checkMove(value);
    });
});

function checkMove(value) {

    let cell = document.querySelector(".c" + value);

    if (value === solve[playerIndex]) {

        cell.classList.add("correct");
        setTimeout(() => cell.classList.remove("correct"), 300);

        playerIndex++;

        if (playerIndex === solve.length) {
            endRound(true);
        }

    } else {

        cell.classList.add("wrong");
        setTimeout(() => cell.classList.remove("wrong"), 300);

        endRound(false);
    }
}

/* ---------------- ROUND END ---------------- */

function endRound(won) {

    canPlay = false;
    roundRunning = false;

    if (won) {

        score++;

        showMessage("🟢 Correct!");

        if (score > bestScore) {
            bestScore = score;
            saveGame();
        }

        updateUI();

    } else {

        showMessage("💀 Wrong!");

        saveGame();

        setTimeout(() => {
            alert("You Lost 💀 Final Score: " + score);
            restartGame();
        }, 300);
    }

    setTimeout(() => {
        if (won) showMessage("Press Start ▶");
    }, 800);
}

/* ---------------- RESTART ---------------- */

function restartGame() {

    solve = [];
    playerIndex = 0;

    roundRunning = false;
    canPlay = false;

    score = 0;

    document.querySelectorAll("td").forEach(cell => {
        cell.classList.remove("active", "correct", "wrong");
    });

    updateUI();
    showMessage("Game restarted. Press Start ▶");

    saveGame();
}

/* ---------------- UI ---------------- */

function updateUI() {

    document.getElementById("WinStatus").innerText = "Score: " + score;
    document.getElementById("LoseStatus").innerText = "Best: " + bestScore;
}

function showMessage(text) {
    document.getElementById("GameMessage").innerText = text;
}

/* ---------------- SAVE / LOAD ---------------- */

function saveGame() {
    localStorage.setItem("score", score);
    localStorage.setItem("bestScore", bestScore);
}

function loadGame() {
    score = Number(localStorage.getItem("score")) || 0;
    bestScore = Number(localStorage.getItem("bestScore")) || 0;
}
