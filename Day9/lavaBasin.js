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

var findRiskLevels = (filePath) => {
    var heightMap = parseInput(filePath)
    var risks = []
    for (var i = 0; i < heightMap.length; i++) {
        var lowsInRow = findLowInRow(heightMap[i])
        for (var j = 0; j < lowsInRow.length; j++) {
            var potentialBasin = heightMap[i][lowsInRow[j]]
            if (i == 0) {
                if (potentialBasin < heightMap[i + 1][lowsInRow[j]]) {
                    risks.push(heightMap[i][lowsInRow[j]] + 1)
                }
            } else if (i == heightMap.length - 1) {
                if (potentialBasin < heightMap[i - 1][lowsInRow[j]]) {
                    risks.push(heightMap[i][lowsInRow[j]] + 1)
                }
            } else if (potentialBasin < heightMap[i - 1][lowsInRow[j]] && potentialBasin < heightMap[i + 1][lowsInRow[j]]) {
                risks.push(heightMap[i][lowsInRow[j]] + 1)
            }
        }
    }
    return risks
}

var sumRiskLevel = (basins) => {
    return basins.reduce((acc, val) => acc + val)
}

// console.log(sumRiskLevel(findRiskLevels('./testInput.txt')))
console.log(sumRiskLevel(findRiskLevels('./input.txt')))