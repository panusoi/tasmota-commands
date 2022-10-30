import { isBetween } from './number';

describe('Number utils', () => {
  test('isBetween inclusive', () => {
    expect(isBetween(0, { min: 0, max: 10, inclusive: true })).toBe(true);
    expect(isBetween(5, { min: 0, max: 10, inclusive: true })).toBe(true);
    expect(isBetween(10, { min: 0, max: 10, inclusive: true })).toBe(true);
    expect(isBetween(-1, { min: 0, max: 10, inclusive: true })).toBe(false);
    expect(isBetween(11, { min: 0, max: 10, inclusive: true })).toBe(false);
  });

  test('isBetween exclusive', () => {
    expect(isBetween(1, { min: 0, max: 10, inclusive: false })).toBe(true);
    expect(isBetween(5, { min: 0, max: 10, inclusive: false })).toBe(true);
    expect(isBetween(9, { min: 0, max: 10, inclusive: false })).toBe(true);
    expect(isBetween(0, { min: 0, max: 10, inclusive: false })).toBe(false);
    expect(isBetween(10, { min: 0, max: 10, inclusive: false })).toBe(false);
    expect(isBetween(-1, { min: 0, max: 10, inclusive: false })).toBe(false);
    expect(isBetween(11, { min: 0, max: 10, inclusive: false })).toBe(false);
  });
});
