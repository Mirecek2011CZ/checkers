let board = document.querySelector(".checkerboard");

let player1 = "\u26C0";
let player2 = "\u26C2";
let selected;
let index1 = -1;
let index2 = -1;
let player1Total = 12;
let player2Total = 12;
let currentPlayer = player1;

console.log(board.children[3].innerHTML);

board.addEventListener("click", function (e) {
  let target = e.target;

  let selectedPiece = document.querySelector(".selected");
  if (selectedPiece) {
    selectedPiece.classList.remove("selected");
  }

  if (target.innerHTML === currentPlayer) {
    selected = target.innerHTML;
    from = target;
    index1 = [...board.children].indexOf(target);
    target.classList.add("selected");
  } else if (from && legalMove(from, target)) {
    index2 = [...board.children].indexOf(target);
    if (playerRules(selected, index1, index2)) {
      let total = index1 - index2;

      target.innerHTML = selected;
      from.innerHTML = "";
      from = null;
      index1 = -1;
      index2 = -1;

      currentPlayer = currentPlayer === player1 ? player2 : player1;
    }
  }
});

function legalMove(from, to) {
  return (
    to.innerHTML !== player1 &&
    to.innerHTML !== player2 &&
    to.classList.contains("white")
  );
}

function playerRules(sel, from, to) {
  let moveDiff = from - to;
  let flag;

  if (sel == player1) {
    flag = to < from;
    if (flag) {
      console.log("horni");
    }
    if (flag && (moveDiff == 14 || moveDiff == 18)) {
      let dc = from - (moveDiff == 14 ? 7 : 9);
      flag = board.children[dc].innerHTML == player2;
      if (flag) {
        player2Total -= 1;
        board.children[dc].innerHTML = "";
        checkWinner(player1Total, player2Total);
        leftCheckersCounter();
      }
    }
  } else if (sel == player2) {
    flag = to > from;
    if (flag) {
      console.log("dolni");
    }

    if (flag && (moveDiff == -14 || moveDiff == -18)) {
      let dc = from + (moveDiff == -14 ? 7 : 9);
      flag = board.children[dc].innerHTML == player1;
      if (flag) {
        player1Total -= 1;
        board.children[dc].innerHTML = "";
        checkWinner(player1Total, player2Total);
        leftCheckersCounter();
      }
    }
  }
  return flag;
}

function checkWinner(p1count, p2count) {
  if (p1count <= 0) {
    document.getElementById("winnerMsg").innerText = "Player 1 won the game!";
  } else if (p2count <= 0) {
    document.getElementById("winnerMsg").innerText = "Player 2 won the game!";
  }
}

function pages(shown, hidden) {
  document.getElementById(shown).style.display = "block";
  document.getElementById(hidden).style.display = "none";
  return false;
}

window.addEventListener("load", leftCheckersCounter);

function leftCheckersCounter() {
  let player1Left = player1Total;
  let player2Left = player2Total;
  if (player1Left || player2Left > 0) {
    document.getElementById("player1count").innerText = `Máš ${player1Left} zbývajících figurek`;
    document.getElementById("player2count").innerText = `Máš ${player2Left} zbývajících figurek`;
    console.log(player2Total);
    console.log(player1Total);
  }
}
