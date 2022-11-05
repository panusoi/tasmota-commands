import TasmotaCommandsMqtt from './tasmota-commands-mqtt';

describe('TasmotaMqtt', () => {
  const options = {
    host: 'tcp://127.0.0.1',
    port: 1883,
    topic: 'tasmota_living_room',
    topicFormat: '%prefix%/%topic%/<command>',
    username: 'user',
    password: 'password',
    connectOnInit: false,
  };

  test('should create TasmotaCommandsMqtt instance', () => {
    const commands = new TasmotaCommandsMqtt(options);

    expect(commands).not.toBeNull();
  });

  test('Invalid topicFormat error is thrown', () => {
    expect(
      () => new TasmotaCommandsMqtt({ ...options, topicFormat: '%prefix%/%topic%' }),
    ).toThrowErrorMatchingInlineSnapshot(`"Invalid topicFormat, '<command>' is not included"`);
    expect(
      () => new TasmotaCommandsMqtt({ ...options, topicFormat: '%prefix%/<command>' }),
    ).toThrowErrorMatchingInlineSnapshot(`"Invalid topicFormat, '%topic%' is not included"`);
    expect(
      () => new TasmotaCommandsMqtt({ ...options, topicFormat: '%topic%/<command>' }),
    ).toThrowErrorMatchingInlineSnapshot(`"Invalid topicFormat, '%prefix%' is not included"`);
  });
});
