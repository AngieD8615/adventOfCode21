/**
The submarine has been making some odd creaking noises, so you ask it to 
produce a diagnostic report just in case.

The diagnostic report (your puzzle input) consists of a list of binary numbers 
which, when decoded properly, can tell you many useful things about the 
conditions of the submarine. The first parameter to check is the power 
consumption.

You need to use the binary numbers in the diagnostic report to generate two 
new binary numbers (called the gamma rate and the epsilon rate). The power 
consumption can then be found by multiplying the gamma rate by the epsilon rate.

Each bit in the gamma rate can be determined by finding the most common bit 
in the corresponding position of all numbers in the diagnostic report.
 */


import { readFileSync } from 'fs'

var parseFile = (filePath) => {
    var data = readFileSync(filePath, 'utf8')
    data = data.split("\n")
    return data
}

var mostCommonBitAtIndex = (index, data) => {
  var moreOnes = 0;
  data.forEach(bin => {
    bin[index] === "1" ? moreOnes++ : moreOnes--
  })

  if (moreOnes > 0 ) {
    return "1"
  } else if (moreOnes < 0) {
    return "0"
  } 
  return "tie"
}

var findBinaryMadeFromMostCommonBit = (data) => {
  var binary = "";
  var binLength = data[0].length;
  for (let i = 0; i < binLength; i++) {
    binary += mostCommonBitAtIndex(i, data)
  }
  return binary;
}

var invertBinary = (initialBinary) => {
  var invertedBinary = "";
  initialBinary.split("").forEach(char => {
    if (char === "1") {
      invertedBinary += "0"
    } else {
      invertedBinary += "1"
    }
  })
  return invertedBinary
}

var binaryDiagnosticA = (filePath) => {
  var binaries = parseFile(filePath)
  var gamma = findBinaryMadeFromMostCommonBit(binaries)
  var epsilon = invertBinary(gamma)
  return parseInt(gamma, 2) * parseInt(epsilon, 2)
}

console.log(binaryDiagnosticA("./Day3/input.txt"))

var binaryDiagnosticB = (filePath) => {
  var binaries = parseFile(filePath)
  var oxygen = findOxygen(binaries)
  var co2 = findCO2(binaries)
  console.log(`Oxygen: ${oxygen} co2: ${co2}`)
  return parseInt(oxygen, 2) * parseInt(co2, 2) 
}

var findOxygen = binaries => {
  var binaryLength = binaries[0].length
  for (var i = 0; i < binaryLength; i++) {
    var keepChar = mostCommonBitAtIndex(i, binaries)
    if (keepChar === "tie") keepChar = "1"
    var tempBinaries = binaries.filter(binary => binary[i] === keepChar)
    
    if (tempBinaries.length === 1) return tempBinaries
    binaries = tempBinaries
  }
  return binaries;
}

var findCO2 = binaries => {
  var binaryLength = binaries[0].length
  for (var i = 0; i < binaryLength; i++) {
    var removeChar = mostCommonBitAtIndex(i, binaries)
    if (removeChar === "tie") removeChar = "1"
    var tempBinaries = binaries.filter(binary => binary[i] !== removeChar)
    
    if (tempBinaries.length === 1) return tempBinaries
    binaries = tempBinaries
  }
  return binaries;
}

console.log(binaryDiagnosticB("./Day3/input.txt"))