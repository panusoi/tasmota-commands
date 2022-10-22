import { HelloWorld } from './index';

test('Hello world', () => {
  expect(HelloWorld).toMatchInlineSnapshot(`"Hello from http-core"`);
});
