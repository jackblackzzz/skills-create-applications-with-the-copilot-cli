#!/usr/bin/env node

// Simple Node.js CLI Calculator
// Supported operations:
//  - add (addition, +)
//  - subtract (subtraction, -)
//  - multiply (multiplication, *)
//  - divide (division, /)
// The script accepts command-line arguments or reads a single line from STDIN.
// Usage examples:
//   node src/calculator.js add 2 3
//   node src/calculator.js subtract 5 2
//   node src/calculator.js multiply 4 6
//   node src/calculator.js divide 10 2
// Also supports short operator forms as the first argument: "+", "-", "*", "/"

const fs = require('fs');

function printHelp() {
  console.log(`Usage:
  calculator.js <operation> <number1> <number2>

Operations:
  add, +        Addition
  subtract, -   Subtraction
  multiply, *   Multiplication
  divide, /     Division

Examples:
  node src/calculator.js add 2 3       # 5
  node src/calculator.js multiply 4 5  # 20
  echo "add 1 2" | node src/calculator.js  # reads from STDIN
`);
}

const { compute } = require('./lib/calculator-core');

function exitWithError(msg, code = 1) {
  console.error(msg);
  process.exit(code);
}

// Wrapper used by the CLI that delegates to the pure compute function.
function parseAndCompute(op, aStr, bStr) {
  try {
    return compute(op, aStr, bStr);
  } catch (err) {
    // Map known error codes to appropriate exit behavior
    if (err && err.code === 'EDIVZERO') {
      exitWithError(`Error: ${err.message}`, 2);
    }
    exitWithError(`Error: ${err.message || err}`, 1);
  }
}

function handleArgs(args) {
  if (args.length === 0) {
    printHelp();
    process.exit(0);
  }

  const op = args[0];
  if (op === '-h' || op === '--help') {
    printHelp();
    process.exit(0);
  }

  if (args.length < 3) {
    exitWithError('Error: expected operation and two numeric operands. See --help');
  }

  const result = parseAndCompute(op, args[1], args[2]);
  if (typeof result === 'number') {
    // For integer results, print without trailing .0 when appropriate
    if (Number.isInteger(result)) console.log(result);
    else console.log(result);
  }
}

function readStdinThen(fn) {
  let data = '';
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', chunk => data += chunk);
  process.stdin.on('end', () => fn(data.trim()));
}

// Entry point
const cliArgs = process.argv.slice(2);
if (cliArgs.length > 0) {
  handleArgs(cliArgs);
} else if (!process.stdin.isTTY) {
  // Read from STDIN (expect a single-line like: "add 1 2")
  readStdinThen(input => {
    if (!input) {
      printHelp();
      process.exit(0);
    }
    const parts = input.split(/\s+/);
    handleArgs(parts);
  });
} else {
  printHelp();
  process.exit(0);
}
