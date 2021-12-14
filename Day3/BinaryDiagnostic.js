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


import { readFile } from 'fs'

var parseFile = (filePath) => {

    readFile(filePath, 'utf8', (err, data) => {
        if (err) throw err
        data = data.split("\n")
        findGammaAndEpsilonBinary(data)
    })
}
parseFile("./Day3/input.txt")

var mostCommonBit = (index, data) => {
  var moreOnes = 0;

  data.forEach(bin => {
    bin[index] === "1" ? moreOnes++ : moreOnes--
  })

  if (moreOnes > 0 ) {
    return "1"
  }
  return "0"
}

var findGammaAndEpsilonBinary = (data) => {
    var binLength = data[0].length;
    var gammaBin = "";
    for (let i = 0; i < binLength; i++) {
      gammaBin += mostCommonBit(i, data)
    }
    var epsilonBin = invertBinary(gammaBin)
    console.log(`gamma: ${gammaBin} \nepsilon: ${epsilonBin}`)

    var gamma = parseInt(gammaBin, 2)
    var epsilon = parseInt(epsilonBin, 2) 
    console.log(`gamma: ${gamma} \nepsilon: ${epsilon}`)

    console.log(`product: ${epsilon * gamma}`)

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
