/**
This report indicates that, scanning outward from the submarine, the sonar sweep found depths of
199, 200, 208, 210, and so on.

The first order of business is to figure out how quickly the depth increases, just so you know what
you're dealing with - you never know if the keys will get carried into deeper water by an ocean
current or a fish or something.

To do this, count the number of times a depth measurement increases from the previous measurement.
(There is no measurement before the first measurement.)

**/

import { readFileSync } from 'fs'

var parseFile = (filePath) => {
    var data = readFileSync(filePath, 'utf8');
    data = data.split('\n').map(val => parseInt(val))
    return data;
}

var countIncreases = (depths, slidingWindow = 0,) => {
    if (slidingWindow > 0) {
        for (var i = 0; i < depths.length - 2; i++) {
            depths[i] = depths[i] + depths[i + 1] + depths[i + 2]
        }
        depths.pop()
        depths.pop()
    }
    var numOfIncreases = 0
    for (var i = 1; i < depths.length; i++) {
        if (depths[i] > depths[i - 1]) {
            numOfIncreases++
        }
    }
    return numOfIncreases;
}

var sonarSweepA = (filePath) => {
    var depths = parseFile(filePath)
    return countIncreases(depths)
}

var sonarSweepB = (filePath) => {
    var depths = parseFile(filePath)
    return countIncreases(depths, 3)
}

console.log(sonarSweepA("./Day1/input.txt"))
console.log(sonarSweepB("./Day1/input.txt"))