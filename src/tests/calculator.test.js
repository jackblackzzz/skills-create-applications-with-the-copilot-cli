const { compute } = require('../lib/calculator-core');

describe('calculator core compute()', () => {
  test('addition: 2 + 3 = 5', () => {
    expect(compute('add', 2, 3)).toBe(5);
    expect(compute('+', '2', '3')).toBe(5);
  });

  test('subtraction: 10 - 4 = 6', () => {
    expect(compute('subtract', 10, 4)).toBe(6);
    expect(compute('-', '10', '4')).toBe(6);
  });

  test('multiplication: 45 * 2 = 90', () => {
    expect(compute('multiply', 45, 2)).toBe(90);
    expect(compute('*', '45', '2')).toBe(90);
  });

  test('division: 20 / 5 = 4', () => {
    expect(compute('divide', 20, 5)).toBe(4);
    expect(compute('/', '20', '5')).toBe(4);
  });

  test('division by zero throws EDIVZERO', () => {
    expect(() => compute('divide', 1, 0)).toThrow(/division by zero/);
    try {
      compute('divide', 1, 0);
    } catch (e) {
      expect(e.code).toBe('EDIVZERO');
    }
  });

  test('invalid numeric input throws EINVALID', () => {
    expect(() => compute('add', 'a', 1)).toThrow(/both operands must be valid numbers/);
    try {
      compute('add', 'a', 1);
    } catch (e) {
      expect(e.code).toBe('EINVALID');
    }
  });

  test('modulo: 10 % 3 = 1', () => {
    expect(compute('mod', 10, 3)).toBe(1);
    expect(compute('%', '10', '3')).toBe(1);
  });

  test('power: 2 ^ 8 = 256', () => {
    expect(compute('power', 2, 8)).toBe(256);
    expect(compute('^', '2', '8')).toBe(256);
  });

  test('squareroot: sqrt 9 = 3', () => {
    expect(compute('squareroot', 9)).toBe(3);
    expect(compute('sqrt', '16')).toBe(4);
  });

  test('squareroot negative throws EINVALID', () => {
    expect(() => compute('sqrt', -1)).toThrow(/square root of negative number/);
    try {
      compute('sqrt', -1);
    } catch (e) {
      expect(e.code).toBe('EINVALID');
    }
  });

  test('unknown operation throws EUNKNOWN', () => {
    expect(() => compute('unknown_op', 2, 3)).toThrow(/Unknown operation/);
    try {
      compute('unknown_op', 2, 3);
    } catch (e) {
      expect(e.code).toBe('EUNKNOWN');
    }
  });
});
