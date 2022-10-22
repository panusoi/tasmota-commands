import { HelloWorld } from 'tasmota-commands-core';

test('Hello world', () => {
  expect(HelloWorld).toMatchInlineSnapshot(`"Hello from http-core"`);
});
