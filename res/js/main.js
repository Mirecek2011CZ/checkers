window.addEventListener("load", leftCheckersCounter)


let board = document.querySelector(".checkerboard");

let player1 = "\u26C0"
let player2 = "\u26C2"
let selected;
let index1 = -1;
let index2 = -1;
let player1Total = 12;
let player2Total = 12;
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
    index1 = [...board.children].indexOf(target);
    target.classList.add("selected");
  } else {
    index2 = [...board.children].indexOf(target);
    if (from && isLegalMove(target)) {
      target.innerHTML = selected;
      from.innerHTML = "";
      from = null;
      index = [-1, -1];
      currentPlayer = currentPlayer === player1 ? player2 : player1;
    }
  }
});

function isLegalMove() {
  const absDiff = Math.abs(index1 - index2);
  const isDiagonalStep = absDiff/9 === 1 || absDiff/7 === 1;
  const isDiagonalJump = absDiff/9 === 2 || absDiff/7 === 2;

  let isJumpValid = false;
  if (isDiagonalJump) {
    const jumpOverIndex = (index1 + index2) / 2;
    const middlePieceHtml = board.children[jumpOverIndex].innerHTML;
    validatePlayer(jumpOverIndex);
    isJumpValid = currentPlayer === player1 ? middlePieceHtml === player2 : middlePieceHtml === player1;
  }

  const isTargetValid = target.innerHTML === "" && target.classList.contains("white");
  
  return isTargetValid && (isDiagonalStep || (isDiagonalJump && isJumpValid));
}

function validatePlayer(index) {
  if (currentPlayer === player1) {
      player2Total -= 1;
      board.children[index].innerHTML = "";
  } else {
    player1Total -= 1;
    board.children[index].innerHTML = "";
  }
  checkWinner();
  leftCheckersCounter();
}

function checkWinner() {
  if (player1Total <= 0) {
    document.getElementById("winnerMsg").innerText = "Player 1 won the game!";
  } else if (player2Total <= 0) {
    document.getElementById("winnerMsg").innerText = "Player 2 won the game!";
  }
}

function leftCheckersCounter() {
  if (player1Total || player2Total > 0) {
    document.getElementById("player1count").innerText = `Máš ${player1Total} zbývajících figurek`;
    document.getElementById("player2count").innerText = `Máš ${player2Total} zbývajících figurek`;
  }
}

function pages(shown, hidden) {
  document.getElementById(shown).style.display = "block";
  document.getElementById(hidden).style.display = "none";
}
