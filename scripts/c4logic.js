const game = document.getElementById('game');
const resetButton = document.getElementById('reset');
const rows = 6;
const cols = 7;
let board = Array.from({ length: rows }, () => Array(cols).fill(null));
let currentPlayer = 'red';
let gameActive = true;

function createBoard() {
    game.innerHTML = '';
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.col = c;
            cell.addEventListener('click', () => handleCellClick(c));
            game.appendChild(cell);
        }
    }
}

function handleCellClick(col) {
    if (!gameActive) return;

    for (let r = rows - 1; r >= 0; r--) {
        if (!board[r][col]) {
            board[r][col] = currentPlayer;
            const cell = game.children[r * cols + col];
            cell.classList.add(currentPlayer);
            if (checkWinner(r, col)) {
                alert(`${currentPlayer} ha ganado!`);
                gameActive = false;
            } else {
                currentPlayer = currentPlayer === 'red' ? 'yellow' : 'red';
            }
            return;
        }
    }
}

function checkWinner(row, col) {
    return (
        checkDirection(row, col, 0, 1) || // Horizontal
        checkDirection(row, col, 1, 0) || // Vertical
        checkDirection(row, col, 1, 1) || // Diagonal /
        checkDirection(row, col, 1, -1)   // Diagonal \
    );
}

function checkDirection(row, col, rowIncrement, colIncrement) {
    let count = 0;
    for (let i = -3; i <= 3; i++) {
        const r = row + i * rowIncrement;
        const c = col + i * colIncrement;
        if (r >= 0 && r < rows && c >= 0 && c < cols && board[r][c] === currentPlayer) {
            count++;
            if (count === 4) return true;
        } else {
            count = 0; // Reiniciar el conteo si no es el mismo jugador
        }
    }
    return false;
}

// Inicializar el juego
createBoard();
resetButton.addEventListener('click', () => {
    board = Array.from({ length: rows }, () => Array(cols).fill(null));
    currentPlayer = 'red';
    gameActive = true;
    createBoard();
});