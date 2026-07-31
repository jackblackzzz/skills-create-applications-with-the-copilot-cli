// Pure calculator core for use by CLI and unit tests
// Exports compute(op, a, b) which returns a number or throws an Error

function compute(op, a, b) {
  const aNum = Number(a);
  const bNum = typeof b === 'undefined' ? undefined : Number(b);

  // Unary operations that only require a single operand
  const unaryOps = new Set(['squareroot', 'sqrt']);

  if (unaryOps.has(op)) {
    if (!Number.isFinite(aNum)) {
      const e = new Error('operand must be a valid number');
      e.code = 'EINVALID';
      throw e;
    }
  } else {
    // Binary operations require both operands
    if (!Number.isFinite(aNum) || !Number.isFinite(bNum)) {
      const e = new Error('both operands must be valid numbers');
      e.code = 'EINVALID';
      throw e;
    }
  }

  switch (op) {
    case 'add':
    case '+':
      return aNum + bNum;
    case 'subtract':
    case '-':
      return aNum - bNum;
    case 'multiply':
    case '*':
    case 'x':
    case 'X':
      return aNum * bNum;
    case 'divide':
    case '/':
      if (bNum === 0) {
        const e = new Error('division by zero');
        e.code = 'EDIVZERO';
        throw e;
      }
      return aNum / bNum;
    case 'modulo':
    case 'mod':
    case '%':
      if (bNum === 0) {
        const e = new Error('modulo by zero');
        e.code = 'EDIVZERO';
        throw e;
      }
      return aNum % bNum;
    case 'power':
    case 'pow':
    case '^':
      return Math.pow(aNum, bNum);
    case 'squareroot':
    case 'sqrt':
      if (aNum < 0) {
        const e = new Error('square root of negative number');
        e.code = 'EINVALID';
        throw e;
      }
      return Math.sqrt(aNum);
    default: {
      const e = new Error(`Unknown operation: ${op}`);
      e.code = 'EUNKNOWN';
      throw e;
    }
  }
}

module.exports = { compute };
