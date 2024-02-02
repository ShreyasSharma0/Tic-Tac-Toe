
const status = document.querySelector('.game-board');
let currentPlayer = "X";
let gameOngoing = true;
const currentTurn = () => `it is ${currentPlayer}s turn`;
let gameState = ["", "", "", "", "", "", "", "", ""];
const reset = document.getElementById("resetButton");

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

    checkGameWin();
    announcements();


    setTimeout(playerTurn, 2);
}



function update() {
    for (let i = 0; i < cells.length; i++) {
        cells[i].innerText = gameState[i];
    }
}


function checkGameWin() {
    let gameWin = false;

    for (let i = 0; i < winConditions.length; i++) {
        const [x, y, z] = winConditions[i];
        if (gameState[x - 1] && gameState[x - 1] === gameState[y - 1] && gameState[y - 1] === gameState[z - 1]) {
            gameWin = true;
            console.log(`Winning condition met: ${x}, ${y}, ${z}`);
            break;
        }
    }
    return gameWin;
}

function announcements() {
    if (checkGameWin()) {
        update();
        setTimeout(announceWin, 1);
        gameOngoing = false;
    }
    let gameDrawn = !gameState.includes("");
    if (gameDrawn) {
        update();
        setTimeout(announceDraw, 1)
        gameOngoing = false;
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
    gameState = ["", "", "", "", "", "", "", "", "", ""];
    alert("The Page will reload to start a new game");
    setTimeout(reloadPage, 10);
}

function reloadPage() {
    location.reload();
}






