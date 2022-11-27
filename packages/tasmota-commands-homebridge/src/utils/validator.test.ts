import { isBooleanOrUndefined, isNumberOrUndefined, isStringOrUndefined } from './validator';

describe('Validator utils', () => {
  test('isStringOrUndefined', () => {
    expect(isStringOrUndefined('string')).toBe(true);
    expect(isStringOrUndefined(undefined)).toBe(true);
    expect(isStringOrUndefined('')).toBe(true);

    expect(isStringOrUndefined(0)).toBe(false);
    expect(isStringOrUndefined(true)).toBe(false);
    expect(isStringOrUndefined(false)).toBe(false);
    expect(isStringOrUndefined({})).toBe(false);
    expect(isStringOrUndefined([])).toBe(false);
  });

  test('isNumberOrUndefined', () => {
    expect(isNumberOrUndefined(0)).toBe(true);
    expect(isNumberOrUndefined(undefined)).toBe(true);
    expect(isNumberOrUndefined(Infinity)).toBe(true);
    expect(isNumberOrUndefined(NaN)).toBe(true);

    expect(isNumberOrUndefined('0')).toBe(false);
    expect(isNumberOrUndefined('')).toBe(false);
    expect(isNumberOrUndefined(true)).toBe(false);
    expect(isNumberOrUndefined(false)).toBe(false);
    expect(isNumberOrUndefined({})).toBe(false);
    expect(isNumberOrUndefined([])).toBe(false);
  });

  test('isBooleanOrUndefined', () => {
    expect(isBooleanOrUndefined(true)).toBe(true);
    expect(isBooleanOrUndefined(false)).toBe(true);
    expect(isBooleanOrUndefined(undefined)).toBe(true);

    expect(isBooleanOrUndefined('')).toBe(false);
    expect(isBooleanOrUndefined(0)).toBe(false);
    expect(isBooleanOrUndefined('string')).toBe(false);
    expect(isBooleanOrUndefined({})).toBe(false);
    expect(isBooleanOrUndefined([])).toBe(false);
  });
});
