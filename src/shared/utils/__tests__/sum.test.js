import { suma } from '../sum.js';

test('adds 1 + 2 to equal 3', () => {
    expect(suma(1, 2)).toBe(3);
});


describe('sum function', () => {
    it('adds 1 + 2 to equal 3', () => {
      expect(suma(1, 2)).toBe(3);
    });
  
    it('adds -1 + 1 to equal 0', () => {
      expect(suma(-1, 1)).toBe(0);
    });
  });
  