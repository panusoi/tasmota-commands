import { commandHandlerMock } from '../utils/mock.test';
import LightCommands from './light';

describe('commands/light', () => {
  const light = new LightCommands(commandHandlerMock);

  describe('setDimmer', () => {
    test('valid values should not throw error', async () => {
      await expect(light.setDimmer(0)).resolves.not.toBeNull();
      await expect(light.setDimmer(100)).resolves.not.toBeNull();
      await expect(light.setDimmer(53)).resolves.not.toBeNull();
      await expect(light.setDimmer('+')).resolves.not.toBeNull();
      await expect(light.setDimmer('-')).resolves.not.toBeNull();
    });

    test('invalid values should throw error', async () => {
      await expect(light.setDimmer(-10)).rejects.toThrowErrorMatchingInlineSnapshot(
        `"Value -10 (typeof number) is not valid dimmer value."`,
      );
      await expect(light.setDimmer(120)).rejects.toThrowErrorMatchingInlineSnapshot(
        `"Value 120 (typeof number) is not valid dimmer value."`,
      );
      await expect(light.setDimmer('10' as '+')).rejects.toThrowErrorMatchingInlineSnapshot(
        `"Value 10 (typeof string) is not valid dimmer value."`,
      );
      await expect(light.setDimmer('' as '+')).rejects.toThrowErrorMatchingInlineSnapshot(
        `"Value  (typeof string) is not valid dimmer value."`,
      );
      await expect(
        light.setDimmer(null as unknown as number),
      ).rejects.toThrowErrorMatchingInlineSnapshot(
        `"Value null (typeof object) is not valid dimmer value."`,
      );
    });
  });

  describe('setColorTemperature', () => {
    test('valid values should not throw error', async () => {
      await expect(light.setColorTemperature(153)).resolves.not.toBeNull();
      await expect(light.setColorTemperature(500)).resolves.not.toBeNull();
      await expect(light.setColorTemperature(200)).resolves.not.toBeNull();
      await expect(light.setColorTemperature('+')).resolves.not.toBeNull();
      await expect(light.setColorTemperature('-')).resolves.not.toBeNull();
    });

    test('invalid values should throw error', async () => {
      await expect(light.setColorTemperature(-10)).rejects.toThrowErrorMatchingInlineSnapshot(
        `"Value -10 (typeof number) is not valid dimmer value."`,
      );
      await expect(light.setColorTemperature(0)).rejects.toThrowErrorMatchingInlineSnapshot(
        `"Value 0 (typeof number) is not valid dimmer value."`,
      );
      await expect(light.setColorTemperature(152)).rejects.toThrowErrorMatchingInlineSnapshot(
        `"Value 152 (typeof number) is not valid dimmer value."`,
      );
      await expect(light.setColorTemperature(501)).rejects.toThrowErrorMatchingInlineSnapshot(
        `"Value 501 (typeof number) is not valid dimmer value."`,
      );
      await expect(
        light.setColorTemperature('10' as '+'),
      ).rejects.toThrowErrorMatchingInlineSnapshot(
        `"Value 10 (typeof string) is not valid dimmer value."`,
      );
      await expect(light.setColorTemperature('' as '+')).rejects.toThrowErrorMatchingInlineSnapshot(
        `"Value  (typeof string) is not valid dimmer value."`,
      );
      await expect(
        light.setDimmer(null as unknown as number),
      ).rejects.toThrowErrorMatchingInlineSnapshot(
        `"Value null (typeof object) is not valid dimmer value."`,
      );
    });
  });
});
