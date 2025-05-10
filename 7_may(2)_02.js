const crypto = require('crypto');

const args = process.argv.slice(2);
const operation = args[0];
let num1, num2, length;

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    return "Cannot divide by zero";
  }
  return a / b;
}

function sine(x) {
  return Math.sin(x);
}

function cosine(x) {
  return Math.cos(x);
}

function tangent(x) {
  return Math.tan(x);
}

function generateRandom(len) {
    if (len === undefined) {
        return "Provide length for random number generation.";
    }
    try{
        const randomBytes = crypto.randomBytes(len);
        return randomBytes.toString('hex').slice(0,len);
    }
    catch(error){
        return "Error: Length must be a non-negative integer";
    }

}
switch (operation) {
  case 'add':
  case 'sub':
  case 'mult':
  case 'divide':
    if (args.length !== 3) {
      console.log(`Error: ${operation} requires two numbers.  Example: node index.js ${operation} 10 5`);
      return;
    }
    num1 = Number(args[1]);
    num2 = Number(args[2]);
     if (isNaN(num1) || isNaN(num2)) {
        console.log(`Error: Invalid number provided.  Example: node index.js ${operation} 10 5`);
        return;
    }
    break;
  case 'sin':
  case 'cos':
  case 'tan':
    if (args.length !== 2) {
      console.log(`Error: ${operation} requires one number. Example: node index.js ${operation} 1`);
      return;
    }
     num1 = Number(args[1]);
     if (isNaN(num1)) {
        console.log(`Error: Invalid number provided.  Example: node index.js ${operation} 1`);
        return;
    }
    break;
  case 'random':
        if(args.length > 2){
            length = parseInt(args[1]);
            if(isNaN(length)){
                 console.log(`Error: Invalid length provided.  Example: node index.js random 10`);
                 return;
            }
        }
        else if (args.length === 1){
            length = undefined;
        }
        else{
            console.log(`Error: random operation requires length or no arguments.  Example: node index.js random 10`);
            return;
        }
    break;
  default:
    console.log('Invalid operation.  Supported operations are: add, sub, mult, divide, sin, cos, tan, random');
    return;
}

let result;
switch (operation) {
  case 'add':
    result = add(num1, num2);
    console.log(`Result of ${num1} + ${num2} = ${result}`);
    break;
  case 'sub':
    result = subtract(num1, num2);
    console.log(`Result of ${num1} - ${num2} = ${result}`);
    break;
  case 'mult':
    result = multiply(num1, num2);
    console.log(`Result of ${num1} * ${num2} = ${result}`);
    break;
  case 'divide':
    result = divide(num1, num2);
    console.log(`Result of ${num1} / ${num2} = ${result}`);
    break;
  case 'sin':
    result = sine(num1);
    console.log(`Result of sin(${num1}) = ${result}`);
    break;
  case 'cos':
    result = cosine(num1);
    console.log(`Result of cos(${num1}) = ${result}`);
    break;
  case 'tan':
    result = tangent(num1);
    console.log(`Result of tan(${num1}) = ${result}`);
    break;
  case 'random':
    result = generateRandom(length);
    console.log(`Random number: ${result}`);
    break;
  default:
    break;
}