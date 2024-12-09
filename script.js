
let board = [];
let rows = 8;
let columns = 8;

let minesCount = 10 
let minesLocation = [] 
let treasure = -1; 
let attempts = 10;
let tilesClicked = 0;
let flagEnabled = false;
let gameOver = false;

let playerName = localStorage.getItem('playerName');
let level = localStorage.getItem('level');

window.onload = function() {
    document.getElementById('player-display').textContent = playerName;
    minesCount = (level === 'hard') ? 20 : 10;
    attempts = 10;

    startGame();
};

function startGame() {
    setMines();
    setTreasure();
    renderBoard();
}

function setMines() {
    let minesLeft = minesCount;
    while (minesLeft > 0) {
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * columns);
        let id = r.toString() + "-" + c.toString();

        if (!minesLocation.includes(id) && id !== treasure) {
            minesLocation.push(id);
            minesLeft--;
        }
    }
}

function setTreasure() {
    let r = Math.floor(Math.random() * rows);
    let c = Math.floor(Math.random() * columns);
    treasure = r.toString() + "-" + c.toString();
}

function renderBoard() {
    const boardDiv = document.getElementById('board');
    boardDiv.innerHTML = '';

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement('button');
            tile.id = r.toString() + "-" + c.toString();
            tile.addEventListener('click', clickTile);
            boardDiv.appendChild(tile);
        }
    }
}

function clickTile() {
    if (gameOver || this.classList.contains('tile-clicked')) return;

    let tile = this;
    if (flagEnabled) {
        toggleFlag(tile);
        return;
    }

    if (minesLocation.includes(tile.id)) {
        tile.innerText = "💣";
        gameOver = true;
        revealMines();
        document.getElementById('game-message').textContent = "Game Over! You hit a mine!";
    } else if (tile.id === treasure) {
        tile.innerText = "🏆";
        document.getElementById('game-message').textContent = "You Win! The treasure is: \"You are a winner!\"";
        gameOver = true;
    } else {
        tile.innerText = "";
        tile.classList.add('tile-clicked');
        tilesClicked++;

        if (tilesClicked === rows * columns - minesCount) {
            document.getElementById('game-message').textContent = "Congrats! You cleared the grid!";
            gameOver = true;
        }
    }
}

function toggleFlag(tile) {
    if (tile.innerText === "") {
        tile.innerText = "🚩";
    } else if (tile.innerText === "🚩") {
        tile.innerText = "";
    }
}

function revealMines() {
    for (let i = 0; i < minesLocation.length; i++) {
        let mineTile = document.getElementById(minesLocation[i]);
        mineTile.innerText = "💣";
        mineTile.style.backgroundColor = "#D2B9D3";
    }
}

function resetGame() {
    window.location.reload(); 
}
