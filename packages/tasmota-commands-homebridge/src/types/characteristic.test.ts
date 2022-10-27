import { isCharacteristicNamesArray } from './characteristic';

describe('types/characteristic', () => {
  test('isCharacteristicNamesArray', () => {
    expect(isCharacteristicNamesArray([])).toMatchInlineSnapshot(`true`);
    expect(isCharacteristicNamesArray(['On'])).toMatchInlineSnapshot(`true`);

    expect(isCharacteristicNamesArray(['on'])).toMatchInlineSnapshot(`false`);
    expect(isCharacteristicNamesArray([1, 2])).toMatchInlineSnapshot(`false`);
    expect(isCharacteristicNamesArray(['On', 'Something'])).toMatchInlineSnapshot(`false`);
    expect(isCharacteristicNamesArray(['On', true])).toMatchInlineSnapshot(`false`);
  });
});
