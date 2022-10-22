import TasmotaCommandsHttp from './tasmota-commands-http';

describe('TasmotaHttp', () => {
  test('Invalid address error is thrown', () => {
    expect(
      () => new TasmotaCommandsHttp({ address: 'http://10.0.40.104' }),
    ).toThrowErrorMatchingInlineSnapshot(
      `"TasmotaHttp invalid address: "http://10.0.40.104". Address shouldn't start with protocol."`,
    );
    expect(
      () => new TasmotaCommandsHttp({ address: 'https://10.0.40.104' }),
    ).toThrowErrorMatchingInlineSnapshot(
      `"TasmotaHttp invalid address: "https://10.0.40.104". Address shouldn't start with protocol."`,
    );
  });
});
