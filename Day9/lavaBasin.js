import { readFileSync } from "fs"

var parseInput = (filePath) => {
    var rawInput = readFileSync(filePath, 'utf8')
    var data = rawInput.split("\n").map(row => row.split('').map(val => parseInt(val)))
    return data
}

var findLowInRow = (row)  => {
    var lowIndexs = []
    for (var i = 0; i < row.length; i++) {
        if (i === 0) {
            if (row[0] < row[i + 1]) {
                lowIndexs.push(i)
            }
        } else if (i === row.length - 1) {
            if (row[i] < row[i - 1]) {
                lowIndexs.push(i)
            }
        } else {
            if (row[i] < row[i - 1] && row[i] < row[i + 1]){
                lowIndexs.push(i)
            }
        }
    }
    return lowIndexs
}

var findBasinLocations = (heightMap) => {
    var basinLocations = []
    for (var i = 0; i < heightMap.length; i++) {
        var lowsInRow = findLowInRow(heightMap[i])
        for (var j = 0; j < lowsInRow.length; j++) {
            var potentialBasin = heightMap[i][lowsInRow[j]]
            if (i == 0) {
                if (potentialBasin < heightMap[i + 1][lowsInRow[j]]) {
                    basinLocations.push([i, lowsInRow[j]])
                }
            } else if (i == heightMap.length - 1) {
                if (potentialBasin < heightMap[i - 1][lowsInRow[j]]) {
                    basinLocations.push([i, lowsInRow[j]])
                }
            } else if (potentialBasin < heightMap[i - 1][lowsInRow[j]] && potentialBasin < heightMap[i + 1][lowsInRow[j]]) {
                basinLocations.push([i, lowsInRow[j]])
            }
        }
    }
    return basinLocations
}

var sumRiskLevel = (filePath) => {
    var heightMap = parseInput(filePath)
    var basinLocations = findBasinLocations(heightMap)
    // console.log(basinLocations)
    var riskLevels = []
    for (var location of basinLocations) {
        riskLevels.push(heightMap[location[0]][location[1]] + 1)
    }
    return riskLevels.reduce((acc, val) => acc + val)
}

var countBasinSize = (location, heightMap) => {
    var count = 0

    var helper = (location, heightMap) => {
        if (heightMap[location[0]][location[1]] !== 9) {
            var above = heightMap[location[0] - 1] ? [location[0] - 1, location[1]] : null
            var below = heightMap[location[0] + 1] ? [location[0] + 1, location[1]] : null
            var left = heightMap[location[0]][location[1] - 1] ?  [location[0], location[1] - 1] : null
            var right = heightMap[location[0]][location[1] + 1] ? [location[0], location[1] + 1] : null
            heightMap[location[0]][location[1]] = 9
            count++
            if (above) {helper (above, heightMap)}
            if (below) {helper (below, heightMap)}
            if (left) {helper (left, heightMap)}
            if (right) {helper (right, heightMap)}
        }
    }
    helper(location, heightMap)
    return count
}

var printBasinSizes = (filePath) => {
    var heightMap = parseInput(filePath)
    var basinLocations = findBasinLocations(heightMap)
    var largestBasins = []
    basinLocations.forEach(location => {
        // console.log(countBasinSize(location, heightMap))
        largestBasins.push(countBasinSize(location, heightMap))
    })
    largestBasins.sort((a, b) => b - a)
    return largestBasins[0] * largestBasins[1] * largestBasins[2]
}

// console.log(sumRiskLevel('./testInput.txt'))
// console.log(sumRiskLevel('./input.txt'))
console.log(printBasinSizes('./input.txt'))