window.addEventListener("load", leftCheckersCounter);

let board = document.querySelector("#checkerboard");

let player1 = "\u26C0";
let player2 = "\u26C2";
let selected;
let index = [-1, -1];
let playerTotal = [12, 12];
let currentPlayer = player1;
let from;
let target;

board.addEventListener("click", function (e) {
  target = e.target;

  let selectedPiece = document.querySelector(".selected");
  if (selectedPiece) {
    selectedPiece.classList.remove("selected");
  }

  if (target.innerHTML === currentPlayer) {
    selected = target.innerHTML;
    from = target;
    index[0] = [...board.children].indexOf(target);
    target.classList.add("selected");
  } else {
    index[1] = [...board.children].indexOf(target);
    if (from && isLegalMove(target)) {
      target.innerHTML = selected;
      from.innerHTML = "";
      from = null;
      currentPlayer = currentPlayer === player1 ? player2 : player1;
    }
  }
});

function isLegalMove() {
  const absDiff = Math.abs(index[0] - index[1]);
  const isDiagonalStep = absDiff / 9 === 1 || absDiff / 7 === 1;
  const isDiagonalJump = absDiff / 9 === 2 || absDiff / 7 === 2;

  let isJumpValid = false;
  if (isDiagonalJump) {
    const jumpOverIndex = (index[0] + index[1]) / 2;
    const middlePieceHtml = board.children[jumpOverIndex].innerHTML;
    validatePlayer(jumpOverIndex);
    isJumpValid =
      currentPlayer === player1
        ? middlePieceHtml === player2
        : middlePieceHtml === player1;
  }

  const isTargetValid =
    target.innerHTML === "" && target.classList.contains("white");

  return isTargetValid && (isDiagonalStep || (isDiagonalJump && isJumpValid));
}

function validatePlayer(index) {
  if (currentPlayer === player1) {
    playerTotal[1] -= 1;
    board.children[index].innerHTML = "";
  } else {
    playerTotal[0] -= 1;
    board.children[index].innerHTML = "";
  }
  checkWinner();
  leftCheckersCounter();
}

function checkWinner() {
  if (playerTotal[0] <= 0) {
    document.getElementById("winnerMsg").innerText = "Player 1 won the game!";
  } else if (playerTotal[1] <= 0) {
    document.getElementById("winnerMsg").innerText = "Player 2 won the game!";
  }
}

function leftCheckersCounter() {
  if (playerTotal[0] || playerTotal[1] > 0) {
    document.getElementById(
      "player1count"
    ).innerText = `Máš ${playerTotal[0]} zbývajících figurek`;
    document.getElementById(
      "player2count"
    ).innerText = `Máš ${playerTotal[1]} zbývajících figurek`;
  }
}

function pages(shown, hidden) {
  document.getElementById(shown).style.display = "block";
  document.getElementById(hidden).style.display = "none";
}
