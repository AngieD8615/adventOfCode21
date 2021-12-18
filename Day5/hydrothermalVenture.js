/**
 You come across a field of hydrothermal vents on the ocean floor! These vents constantly 
 produce large, opaque clouds, so it would be best to avoid them if possible.

They tend to form in lines; the submarine helpfully produces a list of nearby lines of 
vents (your puzzle input) for you to review.

0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2

Each line of vents is given as a line segment in the format x1,y1 -> x2,y2 where x1,y1 are 
the coordinates of one end the line segment and x2,y2 are the coordinates of the other end. 
These line segments include the points at both ends. In other words:

An entry like 1,1 -> 1,3 covers points 1,1, 1,2, and 1,3.
An entry like 9,7 -> 7,7 covers points 9,7, 8,7, and 7,7.
For now, only consider horizontal and vertical lines: lines where either x1 = x2 or y1 = y2.

To avoid the most dangerous areas, you need to determine the number of points where at least 
two lines overlap. In the above example, this is anywhere in the diagram with a 2 or larger 
- a total of 5 points.

Consider only horizontal and vertical lines. At how many points do at least two lines overlap?
*/

import { readFileSync } from 'fs'

var boardSize = 1000

var pasreInput = (filePath) => {
  var data = readFileSync(filePath, 'utf8')
  data = data.split("\n").map(line => {
    line = line.split(" -> ").map(point => {
      point = point.split(",").map(el => parseInt(el))
      return point
    })
    return line
  })

  return data
}

var buildBoard = () => {
  return Array(boardSize).fill(0).map(x => Array(boardSize).fill(0))
}

var isHorizontal = (coordinates) => {
  return coordinates[0][1] === coordinates[1][1]
}

var isVertical = (coordinates) => {
  return coordinates[0][0] === coordinates[1][0]
}

var increamentHorizotal = (board, coordinates) => {  // [[6, 4], [1,4]]
  var y = coordinates[0][1]
  var xInitial = (coordinates[0][0] < coordinates[1][0]) ? coordinates[0][0] : coordinates[1][0] 
  var xFinal = (coordinates[0][0] < coordinates[1][0]) ? coordinates[1][0] : coordinates[0][0]
  for (var x = xInitial; x <= xFinal; x++) {
    board[y][x] += 1
  }
  return board
}

var increamentveritcal = (board, coordinates) => {  // [[6, 72], [6,4]]
  var x = coordinates[0][0]
  var yInitial = (coordinates[0][1] < coordinates[1][1]) ? coordinates[0][1] : coordinates[1][1] 
  var yFinal = (coordinates[0][1] < coordinates[1][1]) ? coordinates[1][1] : coordinates[0][1]
  for (var y = yInitial; y <= yFinal; y++) {
    board[y][x]++
  }
  return board
}

var increamentDiagonol = (board, coordinates) => {
  var xInitial = (coordinates[0][0] < coordinates[1][0]) ? coordinates[0][0] : coordinates[1][0] 
  var yInitial = (coordinates[0][0] < coordinates[1][0]) ? coordinates[0][1] : coordinates[1][1]
  var xFinal = (coordinates[0][0] < coordinates[1][0]) ? coordinates[1][0] : coordinates[0][0] 
  var yFinal = (coordinates[0][0] < coordinates[1][0]) ? coordinates[1][1] : coordinates[0][1]

  var y = yInitial
  var yDelta = yFinal > yInitial ? 1 : -1

  for (var x = xInitial; x <= xFinal; x++){
    board[y][x]++
    y += yDelta
  }
  return board
}

var fillInBoardWithLines = (filePath) => {
  var lines = pasreInput(filePath)
  var board = buildBoard()
  lines.forEach(line => {
    if (isHorizontal(line)) {
      board = increamentHorizotal(board, line)
    } else if (isVertical(line)) {
      board = increamentveritcal(board, line)
    } else {
      board = increamentDiagonol(board, line)
    }
  })
  return board
}

var countOverlap = (filePath) => {
  var count = 0
  var board = fillInBoardWithLines(filePath)
  for (var row = 0; row < board.length; row++) {
    for (var col = 0; col < board[row].length; col++) {
      if (board[row][col] > 1) {
        count++
      }
    }
  }
  return count
}
// test

var runTest = () => {
  testParseInput()
  testOriginalBoard()
}

var testParseInput = () => {
  var filePath = "./testInput.txt"
  var expected = [
    [[223,805],[223,548]],
    [[609,164],[ 609,503]],
    [[46,552],[796,52]],
    [[207,361],[ 207,34]],
    [[503,879],[ 503,946]],
    [[937,52],[937,268]],
    [[560,652],[ 118,652]],
    [[771,103],[85,789]],
    [[119,156],[947,984]],
    [[356,634],[ 607,634]]
  ]

  var actual = pasreInput(filePath)

  if (expected.length != actual.length) {
    console.log(`expected: ${expected.length} but actual: ${actual.length}`)
  }

  for (var i = 0; i < expected.length; i++) {
    for (var j = 0; j < 2; j++) {
      for (var k = 0; k < 2; k++) {
        if (expected[i][j][k] != actual[i][j][k]) {
          console.log(`${i}, ${j}, ${k}, expected: ${expected[i][j][k]} but actual: ${actual[i][j][k]}`)
        }     
      }
    }
  }
}

var testOriginalBoard = () => {
  var board = buildBoard()
  if (board.length !== boardSize) {
    console.log(`board should have 1000 rows but had ${board.length}`)
  }
  if (board[5].length !== boardSize) {
    console.log(`board should have 1000 columns but had ${board[5].length}`)
  }
  if(board[2][6] !== 0) {
    console.log(`board should be filled with 0s but has ${board[2][6]}`)
  }
}

runTest()
console.log(countOverlap("./input.txt"))