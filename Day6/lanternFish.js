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