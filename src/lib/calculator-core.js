// Pure calculator core for use by CLI and unit tests
// Exports compute(op, a, b) which returns a number or throws an Error

function compute(op, a, b) {
  const aNum = Number(a);
  const bNum = Number(b);
  if (!Number.isFinite(aNum) || !Number.isFinite(bNum)) {
    const e = new Error('both operands must be valid numbers');
    e.code = 'EINVALID';
    throw e;
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
    default: {
      const e = new Error(`Unknown operation: ${op}`);
      e.code = 'EUNKNOWN';
      throw e;
    }
  }
}

module.exports = { compute };
