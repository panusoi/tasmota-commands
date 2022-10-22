import { isNotNullOrUndefined } from './null';

describe('Null utils', () => {
  describe('isNotNullOrUndefined', () => {
    test('should pass', () => {
      expect(isNotNullOrUndefined({})).toBe(true);
      expect(isNotNullOrUndefined(0)).toBe(true);
      expect(isNotNullOrUndefined('')).toBe(true);
      expect(isNotNullOrUndefined([])).toBe(true);
      expect(isNotNullOrUndefined({})).toBe(true);
      expect(isNotNullOrUndefined({ a: 0 })).toBe(true);
      expect(isNotNullOrUndefined('a')).toBe(true);
      expect(isNotNullOrUndefined(undefined)).toBe(false);
      expect(isNotNullOrUndefined(null)).toBe(false);
    });

    test('should not make linter errors', () => {
      const getValue = (value: number): string | null => (value > 0 ? 'value' : null);

      const val = getValue(10);

      if (isNotNullOrUndefined(val)) {
        expect(val.replace).toBeDefined();
      }
    });
  });
});
