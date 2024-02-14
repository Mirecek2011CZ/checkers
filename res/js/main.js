let board = document.querySelector(".checkerboard");

let player1 = "\u2659"; 
let player2 = "\u2658"; 

let selected; 
let index1 = -1; 
let index2 = -1; 
let player1total = 12; 
let player2total = 12; 


console.log(board.children[3].innerHTML);

board.addEventListener("click", function (event) {
  let target = event.target;
  
  if (target.innerHTML === player1 || target.innerHTML === player2) {
    selected = target.innerHTML;
    from = target;
    index1 = [...board.children].indexOf(target);
  } 
  else if (from && legalMove(from, target)) {
    index2 = [...board.children].indexOf(target);
    if (playerRules(selected, index1, index2)) {
      let total = index1 - index2;
      console.log(`Player ${selected} from index ${index1} to index ${index2}, Difference: ${total}`);

      target.innerHTML = selected;
      from.innerHTML = "";
      from = null;
      index1 = -1;
      index2 = -1;
    }
  }
});

function legalMove(from, to) {
  return to.innerHTML !== player1 && to.innerHTML !== player2 &&
    to.classList.contains("white");
}


function playerRules(sel, from, to) {
  let moveDiff = from - to;
  let flag;

  if (sel == player1) {
    flag = to < from;
    if (flag) {
      console.log("Player 2's turn");
    }
    if (flag && (moveDiff == 14 || moveDiff == 18)) {
      let dc = from - (moveDiff == 14 ? 7 : 9);
      flag = board.children[dc].innerHTML == player2;
      if (flag) {
        player2total -= 1;
        console.log(`Player 2's piece captured. Remaining: ${player2total}`);
        board.children[dc].innerHTML = "";
        checkWinner(player1total, player2total);
      }
    }
  } 

  else if (sel == player2) {
    flag = to > from;
    if (flag) {
      console.log("Player 1's turn");
    }
    if (flag && (moveDiff == -14 || moveDiff == -18)) {
      let dc = from + (moveDiff == -14 ? 7 : 9);
      flag = board.children[dc].innerHTML == player1;
      if (flag) {
        player1total -= 1;
        console.log(`Player 1's piece captured. Remaining: ${player1total}`);
        board.children[dc].innerHTML = "";
        checkWinner(player1total, player2total);
      }
    }
  }
  return flag;
}

function checkWinner(p1count, p2count) {

  if (p1count <= 0) {
    if (confirm("Player 1 won the game! Do you want to restart the game?")) {
    }
  } 

  else if (p2count <= 0) {
    if (confirm("Player 2 won the game! Do you want to restart the game?")) {
    }
  }
}