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

var pasreInput = (filePath) => {
  var data = readFileSync(filePath, 'utf8')
  data = data.split("\n").map(line => {
    line = line.split(" -> ").map(point => {
      point = point.split(",").map(el => parseInt(el))
      return point
    })
    return line
  })
  
  data = data.filter(endpoints => isStriaght(endpoints[0], endpoints[1]))
  return data
}

var isStriaght = (inital, final) => {
  return (inital[0] === final[0] || inital[1] === final[1])
}

// test

var runTest = () => {
  testParseInput()
}

var testParseInput = () => {
  var filePath = "./testInput.txt"
  var expected = [
    [[223,805],[223,548]],
    [[609,164],[ 609,503]],
    [[207,361],[ 207,34]],
    [[503,879],[ 503,946]],
    [[937,52],[937,268]],
    [[560,652],[ 118,652]],
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

runTest()