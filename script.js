// Game variables
let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;
const statusDisplay = document.getElementById("status");
const cells = document.querySelectorAll(".cell");

// Winning combinations
const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

// Handle cell click
function handleCellClick(event) {
  const clickedCell = event.target;
  const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

  // Ignore if the cell is already filled or the game is over
  if (board[clickedCellIndex] !== "" || !gameActive) {
    return;
  }

  // Update board state
  board[clickedCellIndex] = currentPlayer;
  clickedCell.textContent = currentPlayer;

  // Check for winner
  checkForWinner();
}

// Check for winning conditions
function checkForWinner() {
  let roundWon = false;

  for (let i = 0; i < winningConditions.length; i++) {
    const winCondition = winningConditions[i];
    let a = board[winCondition[0]];
    let b = board[winCondition[1]];
    let c = board[winCondition[2]];

    if (a === "" || b === "" || c === "") {
      continue;
    }
    if (a === b && b === c) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    statusDisplay.textContent = `Player ${currentPlayer} has won!`;
    gameActive = false;
    return;
  }

  // Check for a draw
  let roundDraw = !board.includes("");
  if (roundDraw) {
    statusDisplay.textContent = "It's a draw!";
    gameActive = false;
    return;
  }

  // Switch player
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusDisplay.textContent = `It's ${currentPlayer}'s turn`;
}

// Reset the game
function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;
  currentPlayer = "X";
  statusDisplay.textContent = `It's ${currentPlayer}'s turn`;
  cells.forEach(cell => (cell.textContent = ""));
}

// Attach event listeners to cells and reset button
cells.forEach(cell => cell.addEventListener("click", handleCellClick));
document.getElementById("resetButton").addEventListener("click", resetGame);

// Initial status
statusDisplay.textContent = `It's ${currentPlayer}'s turn`;


//check for winner
if (currentPlayer === "O" && gameActive) {
  setTimeout(computerMove, 500); // Delay for realism
}

function computerMove() {
  let availableCells = board.map((cell, index) => cell === "" ? index : null).filter(index => index !== null);
  let randomCell = availableCells[Math.floor(Math.random() * availableCells.length)];
  board[randomCell] = "O";
  document.querySelector(`[data-index="${randomCell}"]`).textContent = "O";
  checkForWinner();
}