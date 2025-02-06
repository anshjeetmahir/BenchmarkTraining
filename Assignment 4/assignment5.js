
const filterOdd = (numbers) => numbers.filter(num => num % 2 !== 0);


const doubleNumbers = (numbers) => numbers.map(num => num * 2);


const calculateSum = (numbers) => numbers.reduce((accumulator, current) => accumulator + current, 0);


const findMax = (numbers) => numbers.reduce((max, num) => (num > max ? num : max), numbers[0]);


const processData = (numbers, callback) => callback(numbers);


const numbersArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];

console.log("Filtered Odd Numbers:", processData(numbersArray, filterOdd));

// Filtered Odd Numbers: (5) [1, 3, 5, 7, 9]

console.log("Doubled Numbers:", processData(numbersArray, doubleNumbers));

// Doubled Numbers: (9) [2, 4, 6, 8, 10, 12, 14, 16, 18]

console.log("Sum of Numbers:", processData(numbersArray, calculateSum));

// Sum of Numbers: 45

console.log("Maximum Number:", processData(numbersArray, findMax));

// Maximum Number: 9