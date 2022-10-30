import TasmotaCommands from './tasmota-commands';
import { commandHandlerMock } from './utils/mock.test';

describe('tasmota-commands', () => {
  test('should refresh state', async () => {
    const commands = new TasmotaCommands(commandHandlerMock, {});
    await commands.refreshState();
    expect(commands.getState()).toMatchInlineSnapshot(`
      {
        "CT": 400,
        "Dimmer": 53,
        "POWER": "ON",
        "Time": "2022-10-30T14:44:33",
        "Uptime": "0T06:09:37",
        "UptimeSec": 22177,
      }
    `);
  });

  test('should update state when command handler resolves', async () => {
    const commands = new TasmotaCommands(commandHandlerMock, {});
    expect(commands.getState()).toMatchInlineSnapshot(`{}`);

    await commands.Control.setPower0('on');
    expect(commands.getState()).toMatchInlineSnapshot(`
      {
        "POWER": "ON",
      }
    `);

    await commands.Light.setDimmer(63);
    expect(commands.getState()).toMatchInlineSnapshot(`
      {
        "CT": 63,
        "POWER": "ON",
      }
    `);

    await commands.Management.getState();
    expect(commands.getState()).toMatchInlineSnapshot(`
      {
        "CT": 400,
        "Dimmer": 53,
        "POWER": "ON",
        "Time": "2022-10-30T14:44:33",
        "Uptime": "0T06:09:37",
        "UptimeSec": 22177,
      }
    `);
  });
});
