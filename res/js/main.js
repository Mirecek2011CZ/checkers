window.addEventListener("load", leftCheckersCounter);

let board = document.querySelector("#checkerboard");
let player1 = "\u26C2";
let player2 = "\u26C0";
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
    let previousPlayerTotal = [...playerTotal];
    if (from && isLegalMove(target)) {
      const absDiff = Math.abs(index[0] - index[1]);
      const isDiagonalJump = absDiff / 9 === 2 || absDiff / 7 === 2;
      if (isDiagonalJump) {
        const jumpOverIndex = Math.floor((index[0] + index[1]) / 2);
        validatePlayer(jumpOverIndex);
      }
      target.innerHTML = selected;
      from.innerHTML = "";
      from = null;
      if (
        previousPlayerTotal[0] !== playerTotal[0] || previousPlayerTotal[1] !== playerTotal[1]
      ) {
        return;
      }
      currentPlayer = currentPlayer === player1 ? player2 : player1;
    }
  }
});

function isLegalMove() {
  const absDiff = Math.abs(index[0] - index[1]);
  const isDiagonalStep = absDiff / 9 === 1 || absDiff / 7 === 1;
  const isDiagonalJump = absDiff / 9 === 2 || absDiff / 7 === 2;
  const direction = index[1] - index[0];
  const isMovingForward = (currentPlayer === player1 && direction < 0) || (currentPlayer === player2 && direction > 0);

  let isJumpValid = false;
  if (isDiagonalJump) {
    const jumpOverIndex = (index[0] + index[1]) / 2;
    const middlePieceHtml = board.children[jumpOverIndex].innerHTML;
    if (middlePieceHtml !== "" && middlePieceHtml !== currentPlayer) {
      isJumpValid = true;
    }
  }

  const isTargetValid =
    target.innerHTML === "" && target.classList.contains("white");

  return (
    isMovingForward && isTargetValid && (isDiagonalStep || (isDiagonalJump && isJumpValid))
  );
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
    document.getElementById("winnerMsg").innerText = "Player 2 won the game!";
    document.getElementById("player1Count").style.display = "none";
    document.getElementById("player2Count").style.display = "none";
  } else if (playerTotal[1] <= 0) {
    document.getElementById("winnerMsg").innerText = "Player 1 won the game!";
    document.getElementById("player1Count").style.display = "none";
    document.getElementById("player2Count").style.display = "none";
  }
}

function leftCheckersCounter() {
  if (playerTotal[0] || playerTotal[1] >= 0) {
    document.getElementById("player1Count").innerText = `Máš ${playerTotal[0]} zbývajících figurek`;
    document.getElementById("player2Count").innerText = `Máš ${playerTotal[1]} zbývajících figurek`;
  }
}

function pages(shown, hidden) {
  document.getElementById(shown).style.display = "block";
  document.getElementById(hidden).style.display = "none";
}
