
const status = document.querySelector('.game-board');
let currentPlayer = "X";
let gameOngoing = true;
const currentTurn = () => `it is ${currentPlayer}s turn`;
let gameState = ["", "", "", "", "", "", "", "", ""];
const reset = document.getElementById("resetButton");

var minsElement = document.getElementById("minutes");
var secondsElement = document.getElementById("seconds");
var miliSecondsElement = document.getElementById("miliSeconds");

let startBtn = document.getElementById("startButton");
let stopBtn = document.getElementById("stopButton");
let resetBtn = document.getElementById("resetButton");

let mins = 0;
let secs = 0;
let miliSeconds = 0;

let xWins = parseInt(localStorage.getItem('xWins') || 0);
let oWins = parseInt(localStorage.getItem('oWins') || 0);

document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('xCounter').textContent = `X: ${xWins}`
    document.getElementById('oCounter').textContent = `O: ${oWins}`
});


reset.addEventListener('click', resetGame);

const cells = document.querySelectorAll('.cell');
cells.forEach((cell, index) => {
    cell.addEventListener('click', () => handleCellClick(index), false);
})

const winConditions = [
    [1, 2, 3], // top row
    [4, 5, 6], // mid row
    [7, 8, 9], // bottom row    
    [1, 4, 7], // first col
    [2, 5, 8], // mid col 
    [3, 6, 9], // last col
    [3, 5, 7], // diagonal 1
    [1, 5, 9], // diagonal 2
];


function playerTurn() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
}

function handleCellClick(cellIndex) {

    const activeCell = cellIndex;

    if (!gameOngoing || gameState[activeCell] !== "") {
        return;
    }

    gameState[activeCell] = currentPlayer;
    console.log(`Clicked cell ${activeCell}, currentPlayer: ${currentPlayer}`);
    update();

    const gameWin = checkGameWin();
    announcements(gameWin);

    setTimeout(playerTurn, 2);

    timer();
}



function update() {
    for (let i = 0; i < cells.length; i++) {
        cells[i].innerText = gameState[i];
    }
}


function checkGameWin() {

    for (let i = 0; i < winConditions.length; i++) {
        const [x, y, z] = winConditions[i];
        if (gameState[x - 1] && gameState[x - 1] === gameState[y - 1] && gameState[y - 1] === gameState[z - 1]) {

            console.log(`Winning condition met: ${x}, ${y}, ${z}`);
            return true;
        }
    }
    return false;
}


function announcements(gameWin) {
    if (gameWin) {
        update();
        updateWinCounters();
        setTimeout(announceWin, 1);
        gameOngoing = false;
    } else {
        let gameDrawn = !gameState.includes("");
        if (gameDrawn) {
            update();
            setTimeout(announceDraw, 1)
            gameOngoing = false;
        }
    }
}

function announceWin() {
    alert(`${currentPlayer} has won the Game!`);
}

function announceDraw() {
    alert("The game has ended in a draw, better luck next time!");
}

function resetGame() {
    gameOngoing = true;
    gameState = ["", "", "", "", "", "", "", "", ""];
    alert("The Page will reload to start a new game");
    setTimeout(reloadPage, 10);
}

function reloadPage() {
    location.reload();
}


function updateXcounter() {
    xWins++;
    document.getElementById('xCounter').textContent = `X : ${xWins}`;
    localStorage.setItem('xWins', xWins.toString());
}

function updateOCounter() {
    oWins++;
    document.getElementById('oCounter').textContent = `O: ${oWins}`;
    localStorage.setItem('oWins', oWins.toString());

}

function updateWinCounters() {
    if (currentPlayer === 'X') {
        updateXcounter();
    } else if (currentPlayer === 'O') {
        updateOCounter();
    }
}

function timer() {
    if (gameOngoing) {
        miliSeconds++;

        if (miliSeconds == 100) {
            secs++;
            miliSeconds = 0;
        }
        if (secs == 60) {
            mins++;
            secs = 0;
        }

        let miliString = miliSeconds;
        let secString = secs;
        let minString = mins;


        if (mins < 10) {
            minString = "0" + minString;
        }

        if (secs < 10) {
            secString = "0" + secString;
        }

        if (miliSeconds < 10) {
            miliString = "0" + miliString;
        }


        document.getElementById("minutes").innerHTML = minString;
        document.getElementById("seconds").innerHTML = secString;
        document.getElementById("miliSeconds").innerHTML = miliString;
        setTimeout(timer, 10);
    }
}





