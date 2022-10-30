import { isPreset } from './preset';
import { isHttpProtocolConfig } from './protocol';
import { isAccessoryConfig, TasmotaCommandsAccessoryConfig } from './config';

describe('types/config', () => {
  test('check type guards work', () => {
    const unknownConfig: unknown = {
      accessory: 'tasmota-commands',
      name: 'test',
      protocol: 'http',
      address: '127.0.0.1',
      preset: 'lightbulb-on-off',
    };

    const config: TasmotaCommandsAccessoryConfig | null =
      isAccessoryConfig(unknownConfig) &&
      isPreset(unknownConfig) &&
      isHttpProtocolConfig(unknownConfig)
        ? unknownConfig
        : null;

    expect(config).toMatchInlineSnapshot(`
      {
        "accessory": "tasmota-commands",
        "address": "127.0.0.1",
        "name": "test",
        "preset": "lightbulb-on-off",
        "protocol": "http",
      }
    `);
  });
});
