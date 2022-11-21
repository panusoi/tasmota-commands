import { getChangedKeys } from './object';

describe('Object utils', () => {
  test('getChangedKeys', () => {
    // Nothing is changed
    expect(
      getChangedKeys({ a: 'value-a', b: 'value-b' }, { a: 'value-a', b: 'value-b' }),
    ).toMatchInlineSnapshot(`[]`);

    // a has changed
    expect(getChangedKeys({ a: 'value-a', b: 'value-b' }, { a: 'changed-a', b: 'value-b' }))
      .toMatchInlineSnapshot(`
      [
        "a",
      ]
    `);

    // first object has a new key
    expect(
      getChangedKeys({ a: 'value-a', b: 'value-b', c: 'value-c' }, { a: 'value-a', b: 'value-b' }),
    ).toMatchInlineSnapshot(`
      [
        "c",
      ]
    `);

    // second object has only one common key, and its changed
    expect(getChangedKeys({ a: 'value-a', b: 'value-b', c: 'value-c' }, { b: 'changed-b' }))
      .toMatchInlineSnapshot(`
      [
        "a",
        "b",
        "c",
      ]
    `);

    // first object  has only one common key, and its changed
    expect(getChangedKeys({ b: 'changed-b' }, { a: 'value-a', b: 'value-b', c: 'value-c' }))
      .toMatchInlineSnapshot(`
      [
        "b",
      ]
    `);

    // nested object is changed
    expect(
      getChangedKeys(
        { a: 'value-a', b: 'value-b', c: { ca: 'value-ca' } },
        { a: 'value-a', b: 'value-b', c: { ca: 'changed-ca' } },
      ),
    ).toMatchInlineSnapshot(`
      [
        "c",
      ]
    `);
  });
});
