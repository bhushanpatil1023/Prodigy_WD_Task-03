const cells = document.querySelectorAll('.cell');
const playerTurn = document.querySelector('.player-turn');
const resetBtn = document.querySelector('.reset-btn');

let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];
const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
];

function handleCellClick(e) {
    const cellIndex = e.target.getAttribute('data-index');
    if (gameState[cellIndex] !== '') return;

    gameState[cellIndex] = currentPlayer;
    e.target.textContent = currentPlayer;

    if (checkWin()) {
        playerTurn.textContent = `Player ${currentPlayer} wins!`;
        disableCells();
        return;
    }

    if (checkDraw()) {
        playerTurn.textContent = "It's a draw!";
        disableCells();
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    playerTurn.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWin() {
    return winningCombinations.some(combination => {
        return combination.every(index => gameState[index] === currentPlayer);
    });
}

function checkDraw() {
    return gameState.every(cell => cell !== '');
}

function disableCells() {
    cells.forEach(cell => cell.removeEventListener('click', handleCellClick));
}

function resetGame() {
    currentPlayer = 'X';
    gameState = ['', '', '', '', '', '', '', '', ''];
    playerTurn.textContent = "Player X's turn";
    cells.forEach(cell => {
        cell.textContent = '';
        cell.addEventListener('click', handleCellClick, { once: true });
    });
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick, { once: true }));
resetBtn.addEventListener('click', resetGame);