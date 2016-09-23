document.addEventListener('DOMContentLoaded', startGame)
// #### PRE-STRETCH CODE CAN BE FOUND AT BOTTOM ####
// Define your `board` object here!
var board = new Object()
board.cells = [];

// START GAME
function startGame () {

  var row = boardsize()
  var col = row

  boardGenerator (row, col);

  //Loop through cells and write result of countSurroundingMines to new property (surroundingMines) in each cell:
  for (var i = 0; i < board.cells.length; i++) {
    board.cells[i].surroundingMines = countSurroundingMines(board.cells[i])
  }
  document.addEventListener("click", checkForWin);
  document.addEventListener("contextmenu", checkForWin);
  // Don't remove this function call: it makes the game work!
  lib.initBoard()

  var reset = document.getElementById('resetButton');
  reset.addEventListener('click', function(evt) { location.reload() })

}

//SHARED FUNCTIONS

// USER INPUT FOR BOARD SIZE
var boardsize = function() {
  var check = prompt("Pick a whole number from 2 to 6 for the number of row/columns to form the game square");
  if (check < 2 || check > 6) {
    alert(check + " is outside of the game range.  Click OK to reload");
    location.reload();
  }
  if (check % 1 !== 0 || check === NaN) {
    alert(check + " was not a whole number.  Click OK to reload");
    location.reload();
  }
  else {
    return check;
  }
}

// GENERATE GAME BOARD
function boardGenerator (row, col) {
  for (var i = 0; i < row; i++) {
    for (var j = 0; j < col; j++) {
      board.cells.push({
        row: i,
        col: j,
        isMine: Boolean(Math.floor(Math.random()*2)),
        isMarked: false,
        hidden: true
      })
      console.log(board.cells)
    }
  }
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
  var audioWin = document.getElementById("win");
  audioWin.play();
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

/*      #### PRE-STRETCH (NON-AUTO) BOARD GENERATION ####
var board = {
cells : [
{
row: 0,
col: 0,
isMine: false,
isMarked: false,
hidden: true
},
{
row: 0,
col: 1,
isMine: false,
isMarked: false,
hidden: true
},
{
row: 0,
col: 2,
isMine: true,
isMarked: false,
hidden: true
},
{
row: 1,
col: 0,
isMine: false,
isMarked: false,
hidden: true
},
{
row: 1,
col: 1,
isMine: false,
isMarked: false,
hidden: true
},
{
row: 1,
col: 2,
isMine: true,
isMarked: false,
hidden: true
},
{
row: 2,
col: 0,
isMine: true,
isMarked: false,
hidden: true
},
{
row: 2,
col: 1,
isMine: false,
isMarked: false,
hidden: true
},
{
row: 2,
col: 2,
isMine: false,
isMarked: false,
hidden: true
}
]
}
*/
