import {
  convertTasmotaColorTemperatureForHomebrige,
  convertHomebrigeForTasmotaColorTemperature,
} from './color-temperature';

describe('Color temperature utils', () => {
  describe('convertTasmotaColorTemperatureForHomebrige', () => {
    test('converts to homebridge range', () => {
      expect(convertTasmotaColorTemperatureForHomebrige(153)).toMatchInlineSnapshot(`140`);
      expect(convertTasmotaColorTemperatureForHomebrige(250)).toMatchInlineSnapshot(`241`);
      expect(convertTasmotaColorTemperatureForHomebrige(500)).toMatchInlineSnapshot(`500`);
    });

    test('returns null on invalid input', () => {
      expect(convertTasmotaColorTemperatureForHomebrige(13)).toBe(null);
      expect(convertTasmotaColorTemperatureForHomebrige(undefined)).toBe(null);
      expect(convertTasmotaColorTemperatureForHomebrige(600)).toBe(null);
    });
  });

  describe('convertHomebrigeForTasmotaColorTemperature', () => {
    test('converts to tasmota range', () => {
      expect(convertHomebrigeForTasmotaColorTemperature(140)).toMatchInlineSnapshot(`153`);
      expect(convertHomebrigeForTasmotaColorTemperature(241)).toMatchInlineSnapshot(`250`);
      expect(convertHomebrigeForTasmotaColorTemperature(500)).toMatchInlineSnapshot(`500`);
    });

    test('returns null on invalid input', () => {
      expect(convertHomebrigeForTasmotaColorTemperature(13)).toBe(null);
      expect(convertHomebrigeForTasmotaColorTemperature(undefined)).toBe(null);
      expect(convertHomebrigeForTasmotaColorTemperature(600)).toBe(null);
    });
  });
});
