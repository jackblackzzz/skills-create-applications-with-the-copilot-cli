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

  test('unknown operation throws EUNKNOWN', () => {
    expect(() => compute('pow', 2, 3)).toThrow(/Unknown operation/);
    try {
      compute('pow', 2, 3);
    } catch (e) {
      expect(e.code).toBe('EUNKNOWN');
    }
  });
});
