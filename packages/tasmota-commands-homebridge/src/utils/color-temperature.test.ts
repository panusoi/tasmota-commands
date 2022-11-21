import {
  convertTasmotaColorTemperatureForHomebridge,
  convertHomebridgeForTasmotaColorTemperature,
} from './color-temperature';

describe('Color temperature utils', () => {
  describe('convertTasmotaColorTemperatureForHomebrige', () => {
    test('converts to homebridge range', () => {
      expect(convertTasmotaColorTemperatureForHomebridge(153)).toMatchInlineSnapshot(`140`);
      expect(convertTasmotaColorTemperatureForHomebridge(250)).toMatchInlineSnapshot(`241`);
      expect(convertTasmotaColorTemperatureForHomebridge(500)).toMatchInlineSnapshot(`500`);
    });

    test('returns null on invalid input', () => {
      expect(convertTasmotaColorTemperatureForHomebridge(13)).toBe(null);
      expect(convertTasmotaColorTemperatureForHomebridge(undefined)).toBe(null);
      expect(convertTasmotaColorTemperatureForHomebridge(600)).toBe(null);
    });
  });

  describe('convertHomebrigeForTasmotaColorTemperature', () => {
    test('converts to tasmota range', () => {
      expect(convertHomebridgeForTasmotaColorTemperature(140)).toMatchInlineSnapshot(`153`);
      expect(convertHomebridgeForTasmotaColorTemperature(241)).toMatchInlineSnapshot(`250`);
      expect(convertHomebridgeForTasmotaColorTemperature(500)).toMatchInlineSnapshot(`500`);
    });

    test('returns null on invalid input', () => {
      expect(convertHomebridgeForTasmotaColorTemperature(13)).toBe(null);
      expect(convertHomebridgeForTasmotaColorTemperature(undefined)).toBe(null);
      expect(convertHomebridgeForTasmotaColorTemperature(600)).toBe(null);
    });
  });
});
