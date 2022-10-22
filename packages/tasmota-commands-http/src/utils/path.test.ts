import { getCommandPath } from './path';

describe('Path utils', () => {
  describe('getCommandPath', () => {
    test('encodes path correctly', () => {
      expect(
        getCommandPath({
          cmnd: 'Power0',
        }),
      ).toMatchInlineSnapshot(`"/cm?cmnd=Power0"`);
    });

    test('encodes path correctly with space', () => {
      expect(
        getCommandPath({
          cmnd: 'Power0 TOGGLE',
        }),
      ).toMatchInlineSnapshot(`"/cm?cmnd=Power0%20TOGGLE"`);
    });

    test('encodes path correctly with numbers', () => {
      expect(
        getCommandPath({
          limit: 1,
          sleep: 0,
          cmnd: 'Power TOGGLE',
        }),
      ).toMatchInlineSnapshot(`"/cm?limit=1&sleep=0&cmnd=Power%20TOGGLE"`);
    });

    test('encodes path correctly with undefined', () => {
      expect(
        getCommandPath({
          username: undefined,
          password: undefined,
          cmnd: 'Power0 TOGGLE',
        }),
      ).toMatchInlineSnapshot(`"/cm?cmnd=Power0%20TOGGLE"`);
    });

    test('encodes path correctly with special characters', () => {
      expect(
        getCommandPath({
          cmnd: 'Power0=TOGGLE&value=2',
          value: 2,
        }),
      ).toMatchInlineSnapshot(`"/cm?cmnd=Power0%3DTOGGLE%26value%3D2&value=2"`);
    });
  });
});
