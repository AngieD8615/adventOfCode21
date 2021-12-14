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

import { readFile } from 'fs'

var parseFile = (filePath) => {

    readFile(filePath, 'utf8', (err, data) => {
        if (err) throw err
        sumDirections(data)
    })
}
parseFile("./Day2/input.txt")

var sumDirections = directions => {
    var directionVector = {
        forward: 0,
        depth: 0,
        aim: 0
    }

    directions = directions.split("\n").map(dir =>{
        var vector = dir.split(" ")
        vector[1] = parseInt(vector[1])
        return vector
    })


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

    displayResults(directionVector)
}

var displayResults = (directionVector) => {
    console.log(`distance forward: ${directionVector.forward}\ndepth ${directionVector.depth}\nproduct of forward and depth ${directionVector.forward * directionVector.depth}`)
}
