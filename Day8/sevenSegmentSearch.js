import { readFileSync } from "fs"

var parseFourDigitOutputsValues = filePath => {
  var data = readFileSync(filePath, 'utf8')
  var outputData = data.split("\n").map(line => {
    line = line.split(" | ")
    return line[1].split(" ")
  })
  return outputData
}

var countEasyDigits = (outputData) => {
  var count = 0
  var easyDigitLength = [2, 3, 4, 7]
  outputData.forEach(output => {
    output.forEach(digit => {
      if (easyDigitLength.includes(digit.length)) {
        count++
      }
    })
  })
  return count
}

var findNumOfEasyDigitsOutput = filePath => {
  var outputData = parseFourDigitOutputsValues(filePath)
  return countEasyDigits(outputData)
}

console.log(findNumOfEasyDigitsOutput('./input.txt'))

// gcadb ad agd deacfg      -> 2
// acdeg efbcag agfcde fagceb     -> 0
// edafcg fa ecagfd acdbg     -> 1
// dgcae ceadf cga abdfce     -> 1
// dfecbg dg defgcb gfcea     -> 1
// cdbega begfda gfcad gbedf      -> 0
// caegfb cfd efgabc cgfbe      -> 1
// bfg bf bf edcgaf     -> 3
// fgcbe gbcdef cbgdf dbeg      -> 1
// ebfad aefbd abecgf gcefadb     -> 1

// totla 11