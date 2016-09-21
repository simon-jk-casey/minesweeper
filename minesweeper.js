document.addEventListener('DOMContentLoaded', startGame)

// Define your `board` object here!
var board = new Object()
board.cells = [];


function boardGenerator (row, col) {
  for (var i = 0; i < row; i++) {
    for (var j = 0; j < col; j++) {
      board.cells.push({
        row: i,
        col: j,
        isMine: true,
        isMarked: false,
        hidden: true
      })
      console.log(board.cells)
    }
  }
}





function startGame () {

  boardGenerator (4, 4);

  //Loop through cells and write result of countSurroundingMines to new property (surroundingMines) in each cell:
  for (var i = 0; i < board.cells.length; i++) {
    board.cells[i].surroundingMines = countSurroundingMines(board.cells[i])
  }
  document.addEventListener("click", checkForWin);
  document.addEventListener("contextmenu", checkForWin);
  // Don't remove this function call: it makes the game work!
  lib.initBoard()
}

// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?
function checkForWin () {
  for (var i = 0; i < board.cells.length; i++) {
    if (board.cells[i].isMine === true && board.cells[i].isMarked === false) {
      return "";
    }
    if (board.cells[i].isMine === false && board.cells[i].hidden === true) {
      return "";
    }
  }
  lib.displayMessage('You Win!')
}

  // You can use this function call to declare a winner (once you've
  // detected that they've won, that is!)
  //   lib.displayMessage('You win!')

// Define this function to count the number of mines around the cell
// (there could be as many as 8). You don't have to get the surrounding
// cells yourself! Just use `lib.getSurroundingCells`:
//
//   var surrounding = lib.getSurroundingCells(cell.row, cell.col)
//
// It will return cell objects in an array. You should loop through
// them, counting the number of times `cell.isMine` is true.
function countSurroundingMines (cell) {
  var count = 0;
  var surrounding = lib.getSurroundingCells(cell.row, cell.col);
  //Loop through [result] of getSurroundingCells and test if true, if true add to count, when complete, return count:
  for (var i = 0; i < surrounding.length; i++) {
    if (surrounding[i].isMine === true) {
      count ++;
    }
  }
  return count;
}
