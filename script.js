const cells = document.querySelectorAll('[data-cell]');
const gameStatus = document.getElementById('game-status');
const restartButton = document.getElementById('restart-button');
let currentPlayer = 'X';
let gameFinished = false;

function handleCellClick(event) {
  const cell = event.target;
  if (cell.textContent || gameFinished) {
    return;
  }
  cell.textContent = currentPlayer;
  if (checkWin()) {
    gameStatus.textContent = `Player ${currentPlayer} wins!`;
    gameFinished = true;
  } else if (checkDraw()) {
    gameStatus.textContent = 'The game is a draw.';
    gameFinished = true;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    gameStatus.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function checkWin() {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  return winningCombinations.some(combination => {
    return combination.every(index => {
      return cells[index].textContent === currentPlayer;
    });
  });
}

function checkDraw() {
  return [...cells].every(cell => {
    return cell.textContent;
  });
}

function restartGame() {
  cells.forEach(cell => {
    cell.textContent = '';
  });
  gameStatus.textContent = '';
  currentPlayer = 'X';
  gameFinished = false;
}

cells.forEach(cell => {
  cell.addEventListener('click', handleCellClick);
});

restartButton.addEventListener('click', restartGame);
