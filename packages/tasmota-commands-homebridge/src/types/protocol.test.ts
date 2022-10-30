import { isHttpProtocolConfig } from './protocol';

describe('types/protocol', () => {
  test('isHttpProtocolConfig', () => {
    expect(
      isHttpProtocolConfig({
        protocol: 'http',
        address: '127.0.0.1',
      }),
    ).toMatchInlineSnapshot(`true`);
    expect(
      isHttpProtocolConfig({
        protocol: 'http',
        address: '127.0.0.1',
        username: 'username',
        password: 'pasword',
      }),
    ).toMatchInlineSnapshot(`true`);
    expect(
      isHttpProtocolConfig({
        protocol: 'http',
        address: '127.0.0.1',
        username: 'username',
      }),
    ).toMatchInlineSnapshot(`true`);
    expect(
      isHttpProtocolConfig({
        protocol: 'http',
        address: '127.0.0.1',
        password: 'pasword',
      }),
    ).toMatchInlineSnapshot(`true`);

    expect(
      isHttpProtocolConfig({
        protocol: 'invalid',
        address: '127.0.0.1',
      }),
    ).toMatchInlineSnapshot(`false`);
    expect(
      isHttpProtocolConfig({
        protocol: 'http',
        address: 1,
      }),
    ).toMatchInlineSnapshot(`false`);
    expect(
      isHttpProtocolConfig({
        protocol: 'https',
        address: '127.0.0.1',
        username: true,
      }),
    ).toMatchInlineSnapshot(`false`);
  });
});
