/**
You're already almost 1.5km (almost a mile) below the surface of the ocean, already so deep that 
you can't see any sunlight. What you can see, however, is a giant squid that has attached itself 
to the outside of your submarine.

Maybe it wants to play bingo?

Bingo is played on a set of boards each consisting of a 5x5 grid of numbers. Numbers are chosen 
at random, and the chosen number is marked on all boards on which it appears. (Numbers may not 
  appear on all boards.) If all numbers in any row or any column of a board are marked, that board 
  wins. (Diagonals don't count.)

The submarine has a bingo subsystem to help passengers (currently, you and the giant squid) pass 
the time. It automatically generates a random order in which to draw numbers and a random set of 
boards  

The score of the winning board can now be calculated. Start by finding the sum of all unmarked 
numbers on that board; in this case, the sum is 188. Then, multiply that sum by the number that 
was just called when the board won, 24, to get the final score, 188 * 24 = 4512.

To guarantee victory against the giant squid, figure out which board will win first. What will 
your final score be if you choose that board?
 */

import { readFileSync,  } from 'fs'

var parseInput = (filePath) => {
  var gameData = {}
  var input = readFileSync(filePath, 'utf8')
  var data = input.split("\n\n")

  var pickedNums = data[0].split(",")
  gameData.pickedNums = pickedNums.map(el => parseInt(el))
  
  var boards = data.slice(1)
  boards = boards.map(board => {
    board = board.split("  ").join(" ").split("\n")
    board = board.map(row => {
      if (row[0] === " ") {
        row = row.substring(1)
      }
      row = row.split(" ").map(el => {
        return parseInt(el)
      })
      return row
    })
    return board
  })
  gameData.boards = boards

  return gameData;
}

var markANumber = (val, board) => {
  var hasBeenMarked = false;
  for (var row = 0; row < board.length; row++) {
    for (var col = 0; col < board[row].length; col++) {
      if (board[row][col] === val) {
        board[row][col] = -1
        hasBeenMarked = true
        return { hasBeenMarked, board, row, col }
      }
    }
  } 
  return { hasBeenMarked, board }
}

var hasWon = (board, row, col) => {
  var rowSum = board[row].reduce((accu, val) => accu + val)
  if (rowSum === -5) return true

  var colSum = 0
  for (var curRow = 0; curRow < board.length; curRow++) {
    colSum += board[curRow][col]
  }
  if (colSum == -5) return true

  return false
}

var findWhenBoardWins = (board, pickedNums) => {
  var winningIndex = pickedNums.length + 1;
  for (var i = 0; i < pickedNums.length; i++) {
    var updatedBoardData = markANumber(pickedNums[i], board)
    board = updatedBoardData.board;
    if (updatedBoardData.hasBeenMarked) {
      var justWon = hasWon(board, updatedBoardData.row, updatedBoardData.col)
      if (justWon) {
        winningIndex = i
        break;
      }
    }
  }
  return winningIndex
}

var findFirstWinningBoard = (filePath) => {
  var {pickedNums, boards} =  parseInput(filePath)
  var winningIndex = pickedNums.length
  var winningBoardIndex;
  for (var board = 0; board < boards.length; board++) {
    var curWinningIndex = findWhenBoardWins (boards[board], pickedNums)
    if (winningIndex > curWinningIndex) {
      winningIndex = curWinningIndex
      winningBoardIndex = board
    }
  }

  return {winningBoard: boards[winningBoardIndex], lastCalled: pickedNums[winningIndex]}
}

var findLastWinningBoard = (filePath) => {
  var {pickedNums, boards} =  parseInput(filePath)
  var winningIndex = -1
  var winningBoardIndex = -1;
  for (var board = 0; board < boards.length; board++) {
    var curWinningIndex = findWhenBoardWins (boards[board], pickedNums)
    if (winningIndex < curWinningIndex) {
      console.log(board, curWinningIndex)
      winningIndex = curWinningIndex
      winningBoardIndex = board
    }
  }

  return {winningBoard: boards[winningBoardIndex], lastCalled: pickedNums[winningIndex]}
}

var calculateSolutionA = (filePath) => {
  var { winningBoard, lastCalled} = findFirstWinningBoard (filePath)
  var sum = winningBoard.map(row => row.reduce((accu, val) => {
    if (val !== -1) return accu + val
    return accu
  }, 0))
  sum = sum.reduce((accu, val) => accu + val, 0)
  return sum * lastCalled
}

var calculateSolutionB = (filePath) => {
  var { winningBoard, lastCalled} = findLastWinningBoard (filePath)
  console.log("cal sol b:", winningBoard, lastCalled )
  var sum = winningBoard.map(row => row.reduce((accu, val) => {
    if (val !== -1) return accu + val
    return accu
  }, 0))
  sum = sum.reduce((accu, val) => accu + val, 0)
  return sum * lastCalled
}

// tests

var runTests = () => {
  parsedFileShouldMakeArrayOfNumbsPicked()
  parsedFileShouldMakeArrayOfBoards()
  shouldMarkAValAndReturnLocation()
  shouldNotChangeBoardIfValIsNotOnBoard()
  shouldHaveWonRow()
  shouldHaveWonCol()
  shouldNotHaveWon()
  shouldFindIndexWhenBoardWins()
}

var shouldFindIndexWhenBoardWins = () => {
  var pickedNums = [
    91, 12, 17, 64, 25, 45,  8,
    26, 59, 13, 47, 19, 52, 68,
    72, 63, 76
  ]
  var board = [
    [ 83, 40, 67, 98, 4 ],
    [ 50, 74, 31, 30, 3 ],
    [ 75, 64, 79, 61, 5 ],
    [ 12, 59, 26, 25, 72 ],
    [ 36, 33, 18, 54, 10 ]
  ]
  var expected = 14
  var actual = findWhenBoardWins(board, pickedNums)
  if (expected !== actual) {
    console.log(`expected: ${expected} where actual: ${actual}`)
  }

}

var shouldHaveWonRow = () => {
  var row = 3;
  var col = 4;
  var board = [
    [ 83, 40, 67, 98, 4 ],
    [ 50, 74, 31, 30, 3 ],
    [ 75, 64, 79, 61, 5 ],
    [ -1, -1, -1, -1, -1 ],
    [ 36, 33, 18, 54, 10 ]
  ]

  var expected = true
  var actual = hasWon(board, row, col)
  if (expected !== actual) {
    console.log(`expect to have won`)
  }

}

var shouldHaveWonCol = () => {
  var row = 3;
  var col = 4;
  var board = [
    [ 83, 40, 67, 98, -1 ],
    [ 50, 74, 31, 30, -1 ],
    [ 75, 64, 79, 61, -1 ],
    [ 12, 59, 26, 25, -1 ],
    [ 36, 33, 18, 54, -1 ]
  ]

  var expected = true
  var actual = hasWon(board, row, col)
  if (expected !== actual) {
    console.log(`expect to have won`)
  }
}

var shouldNotHaveWon = () => {
  var row = 3;
  var col = 4;
  var board = [
    [ 83, 40, -1, 98, -1 ],
    [ -1, 74, 31, 30, -1 ],
    [ 75, -1, 79, -1, 52 ],
    [ 12, 59, -1, 25, -1 ],
    [ 36, 33, 18, 54, -1 ]
  ]

  var expected = false
  var actual = hasWon(board, row, col)
  if (expected !== actual) {
    console.log(`expect not to have won`)
  }
}


var shouldMarkAValAndReturnLocation = () => {
  var value = 64
  var board = [
    [ 83, 40, 67, 98, 4 ],
    [ 50, 74, 31, 30, 3 ],
    [ 75, 64, 79, 61, 5 ],
    [ 12, 59, 26, 25, 72 ],
    [ 36, 33, 18, 54, 10 ]
  ]

  var expected = {
    hasBeenMarked: true,
    board: 
      [
        [ 83, 40, 67, 98, 4 ],
        [ 50, 74, 31, 30, 3 ],
        [ 75, -1, 79, 61, 5 ],
        [ 12, 59, 26, 25, 72 ],
        [ 36, 33, 18, 54, 10 ]
      ],
    row: 2, 
    col: 1}
  var actual = markANumber(value, board)

  if (expected.row !== actual.row) {
    console.log(`expected row: ${expected.row} where actual row: ${actual.row}`)
  }
  if (expected.col !== actual.col) {
    console.log(`expected col: ${expected.col} where actual col: ${actual.col}`)
  }
  if (actual.board[actual.row][actual.col] !== -1) {
    console.log(`marked row col should be -1, it is: ${actual.board[row][col]}`)
  }
  if (!actual.hasBeenMarked) {
    console.log(`Should have have been marked`)
  }
}

var shouldNotChangeBoardIfValIsNotOnBoard = () => {
  var value = 80
  var board = [
    [ 83, 40, 67, 98, 4 ],
    [ 50, 74, 31, 30, 3 ],
    [ 75, 64, 79, 61, 5 ],
    [ 12, 59, 26, 25, 72 ],
    [ 36, 33, 18, 54, 10 ]
  ]

  var expected = {
    hasBeenMarked: false,
    board: 
      [
        [ 83, 40, 67, 98, 4 ],
        [ 50, 74, 31, 30, 3 ],
        [ 75, 64, 79, 61, 5 ],
        [ 12, 59, 26, 25, 72 ],
        [ 36, 33, 18, 54, 10 ]
      ],
    }
  var actual = markANumber(value, board)

  if (actual.hasBeenMarked) {
    console.log(`Should not have have been marked`)
  }

  for (var i = 0; i < expected.length; i++){
    for (var j = 0; j < 5; j++){
        if (expected[i][j] !== actual[i][j]) {
          console.log(`at i, j: ${i}, ${j} expected : ${expected[i][j]} where actual is: ${actual[i][j]}`)
        } 
    }
  }
}

var parsedFileShouldMakeArrayOfNumbsPicked = () => {
  var filePath = "./testInput.txt"
  var expected = [91,54,17,64,61,45,8,13,30,47,19,52,68,63,76,98,25]
  var actual = parseInput(filePath)
  actual = actual.pickedNums;

  if (!Array.isArray(actual)) {
    console.log(`expected type to be Array`)
  }
  if (expected.length !== actual.length) {
    console.log(`expected length: ${expected.length} where actual length: ${actual.length}`)
  }
  if (typeof actual[0] !== "number") {
    console.log(`expected elements to be numbers`)
  }
  for (var i = 0; i < expected.length; i++){
    if (expected[i] !== actual[i]) {
      console.log(`at i: ${i} expected : ${expected[i]} where actual length: ${actual[i]}`)
    } 
  }
}

var parsedFileShouldMakeArrayOfBoards = () => {
  var filePath = "./testInput.txt"
  var expected = [
   [[83, 40, 67, 98,  4],
    [50, 74, 31, 30,  3],
    [75, 64, 79, 61,  5],
    [12, 59, 26, 25, 72],
    [36, 33, 18, 54, 10]],

   [[68, 56, 28, 57, 12],
    [4, 66, 20, 85, 51],
    [35, 23,  7, 99, 44],
    [6,  37,  8, 45, 49],
    [40, 77, 32,  6, 88]]
  ]
  var actual = parseInput(filePath)
  actual = actual.boards;

  if (!Array.isArray(actual)) {
    console.log(`expected type to be Array`)
  }
  if (expected.length !== actual.length) {
    console.log(`expected length: ${expected.length} where actual length: ${actual.length}`)
  }
  if (typeof actual[0][0][0] !== "number") {
    var type = typeof actual[0][0]
    console.log(`expected elements to be numbers, but type is: ${type} ${actual[0][0]}`)
  }
  for (var i = 0; i < expected.length; i++){
    for (var j = 0; j < 5; j++){
      for (var k = 0; k < 5; k++){
        if (expected[i][j][k] !== actual[i][j][k]) {
          console.log(`at j, k: ${i}, ${j}, ${k} expected : ${expected[i][j][k]} where actual is: ${actual[i][j][k]}`)
        } 
      }
    }
  }
}

console.log(calculateSolutionA("./input.txt"))
console.log(calculateSolutionB("./input.txt"))