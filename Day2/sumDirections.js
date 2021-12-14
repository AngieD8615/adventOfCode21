/**

Now, you need to figure out how to pilot this thing.

It seems like the submarine can take a series of commands like forward 1, down 2, or up 3:

forward X increases the horizontal position by X units.
down X increases the depth by X units.
up X decreases the depth by X units.

Note that since you're on a submarine, down and up affect your depth, and so they have
the opposite result of what you might expect.

The submarine seems to already have a planned course (your puzzle input). You should
probably figure out where it's going.

**/

import { readFileSync } from 'fs'

var parseFile = (filePath) => {

    var data = readFileSync(filePath, 'utf8')
    data = data.split("\n").map(dir =>{
        var vector = dir.split(" ")
        vector[1] = parseInt(vector[1])
        return vector
    })
    return data;
}

var sumDirectionsA = directions => {
    var directionVector = {
        forward: 0,
        depth: 0,
    }

    directions.forEach(vector => {
        if (vector[0] == "forward") {
            directionVector.forward += vector[1]
        } else if (vector[0] == "up") {
            directionVector.depth -= vector[1]
        } else if (vector[0]  == "down") {
            directionVector.depth += vector[1]
        }
    })

    return directionVector;
}

var sumDirectionsB = directions => {
    var directionVector = {
        forward: 0,
        depth: 0,
        aim: 0
    }

    directions.forEach(vector => {
        if (vector[0] == "forward") {
            directionVector.forward += vector[1]
            directionVector.depth += (directionVector.aim * vector[1])
        } else if (vector[0] == "up") {
            directionVector.aim -= vector[1]
        } else if (vector[0]  == "down") {
            directionVector.aim += vector[1]
        }
    })
    return directionVector;
}

var displayResults = (directionVector) => {
    console.log(`distance forward: ${directionVector.forward}\ndepth ${directionVector.depth}\nproduct of forward and depth ${directionVector.forward * directionVector.depth}`)
}


function diveA (filePath) {
    var data = parseFile(filePath)
    var directionVector = sumDirectionsA(data)
    // displayResults(directionVector)
    return directionVector.forward * directionVector.depth
}

function diveB (filePath) {
    var data = parseFile(filePath)
    var directionVector = sumDirectionsB(data)
    // displayResults(directionVector)
    return directionVector.forward * directionVector.depth
}

console.log(`part A: ${diveA("./Day2/input.txt")}`)

console.log(`part B: ${diveB("./Day2/input.txt")}`)