import TasmotaCommandsMqtt from './tasmota-commands-mqtt';

describe('', () => {
  test('Hello world', async () => {
    const commands = new TasmotaCommandsMqtt();
    await expect(commands.refreshState()).rejects.toThrowErrorMatchingInlineSnapshot(
      `"Not implemented yet"`,
    );
  });
});
