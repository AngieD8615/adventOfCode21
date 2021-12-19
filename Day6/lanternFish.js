/**
 --- Day 6: Lanternfish ---
The sea floor is getting steeper. Maybe the sleigh keys got carried this way?

A massive school of glowing lanternfish swims past. They must spawn quickly 
to reach such large numbers - maybe exponentially quickly? You should model 
their growth rate to be sure.

Although you know nothing about this specific species of lanternfish, you make 
some guesses about their attributes. Surely, each lanternfish creates a new 
lanternfish once every 7 days.

However, this process isn't necessarily synchronized between every l
anternfish - one lanternfish might have 2 days left until it creates another 
lanternfish, while another might have 4. So, you can model each fish as a 
single number that represents the number of days until it creates a new 
lanternfish.

Furthermore, you reason, a new lanternfish would surely need slightly longer 
before it's capable of producing more lanternfish: two more days for its first 
cycle.

So, suppose you have a lanternfish with an internal timer value of 3:

After one day, its internal timer would become 2.
After another day, its internal timer would become 1.
After another day, its internal timer would become 0.
After another day, its internal timer would reset to 6, and it would create a 
new lanternfish with an internal timer of 8.
After another day, the first lanternfish would have an internal timer of 5, and 
the second lanternfish would have an internal timer of 7.
A lanternfish that creates a new fish resets its timer to 6, not 7 (because 0 is 
included as a valid timer value). The new lanternfish starts with an internal 
timer of 8 and does not start counting down until the next day.

Realizing what you're trying to do, the submarine automatically produces a list 
of the ages of several hundred nearby lanternfish (your puzzle input).

3,4,3,1,2
This list means that the first fish has an internal timer of 3, the second fish 
has an internal timer of 4, and so on until the fifth fish, which has an 
internal timer of 2. Simulating these fish over several days would proceed as follows:

Initial state: 3,4,3,1,2
After  1 day:  2,3,2,0,1
After  2 days: 1,2,1,6,0,8
After  3 days: 0,1,0,5,6,7,8
After  4 days: 6,0,6,4,5,6,7,8,8
After  5 days: 5,6,5,3,4,5,6,7,7,8

 */
import { readFileSync } from 'fs'

var memo = (totalDays) => {
  let memoCount = {} // {initialState: {daysLeft: count}}
  
  for (var days = 1; days <= totalDays; days++) {  
    if (days % 20 === 0) {
      console.log(`day: ${days}`)
    }
    for (var initialAge = 1; initialAge <=6; initialAge++) {
      var count = countAfterDaysMemo(initialAge, days, memoCount)
      memoCount[initialAge][days] = count
    }
  }
  return memoCount
}

var countAfterDaysMemo = (initialAge, days, memoCount) => {
  let count = 0

  var helper = (curAge, days) => {
    if (!memoCount[curAge]) {
      memoCount[curAge] = {}
    }
    if (memoCount[curAge][days] != undefined) {
      count += memoCount[curAge][days] 
      return 
    }
    if (days === 0) {
      count++
      return
    } 
    if (curAge === 0) {
      helper (6, days - 1)
      helper (8, days - 1)
    } if (curAge > 0) {
      helper(curAge - 1, days - 1)
    }
  }
  
  helper(initialAge, days)

  return count
}

var afterNDays = (initialAge, days) => {
  let count = 0

  var helper = (curAge, daysLeft) => {
    if (daysLeft === 0) {
      count++
      return
    } 
    if (curAge === 0) {
      helper (6, daysLeft - 1)
      helper (8, daysLeft - 1)
    } if (curAge > 0) {
      helper(curAge - 1, daysLeft - 1)
    }
  }
  
  helper(initialAge, days)

  return count
}


var parseAndCountInput = (filePath) => {
  var countInitialState = {}
  var data = readFileSync(filePath, 'utf8')
  data = data.split(",")
  data.forEach(initialState => {
    if (!countInitialState[initialState]) {
      countInitialState[initialState] = 1
    } else {
      countInitialState[initialState]++
    }
  })

  return countInitialState
}

var calcNUmOfFishTotal = (filePath) => {
  var totalCount = 0
  var countInitialState = parseAndCountInput(filePath)
  var initailStates = Object.keys(countInitialState)

  initailStates.forEach(initState => {
    var initStateInt = parseInt(initState)
    var count = afterNDays(initStateInt,  80)
    totalCount += (count * countInitialState[initState])
  })
  return totalCount
}

var calcNUmOfFishTotalB = (filePath) => {
  var days = 256
  var totalCount = 0
  var countOfInitialState = parseAndCountInput(filePath)
  var initailStates = Object.keys(countOfInitialState)
  var numOfDecendants = memo(days) 

  initailStates.forEach(initState => {
    totalCount += (numOfDecendants[initState][days] * countOfInitialState[initState])
  })
  return totalCount
}

// console.log(`init: 1, days: 99, count: ${afterNDays(1, 99)}, ${afterNDays(2, 99)}, ${afterNDays(3, 99)}, ${afterNDays(4, 99)}, ${afterNDays(5, 99)}`)
console.log(calcNUmOfFishTotalB('./input.txt'))
// console.log(calcNUmOfFishTotal('./input.txt'))

// Init  -> 1
//  0 -> 1
//  1 -> 0 
//  2 -> 6 8
//  3 -> 5 7
//  4 -> 4 6
//  5 -> 3 5
//  6 -> 2 4
//  7 -> 1 3
//  8 -> 0 2 
//  9 -> 6 1 8
// 10 -> 5 0 7 