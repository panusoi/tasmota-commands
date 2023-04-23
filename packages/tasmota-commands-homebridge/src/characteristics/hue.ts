import { HAPStatus } from 'homebridge';
import { isBetween, isHSB } from 'tasmota-commands-core';
import { CreateCharacteristicListener } from '../types/characteristic';

const isValidHue = (value: number): value is number =>
  isBetween(value, { min: 0, max: 360, inclusive: true });

// https://github.com/homebridge/HAP-NodeJS/blob/master/src/lib/definitions/CharacteristicDefinitions.ts#L1656
const createHueListener: CreateCharacteristicListener = ({
  verbose,
  logger,
  commands,
  getCurrentState,
}) => {
  verbose && logger.debug("Creating 'Hue' characteristic listeners");

  return {
    set: (value, callback) => {
      if (typeof value !== 'number' || !isValidHue(value)) {
        callback(HAPStatus.INVALID_VALUE_IN_REQUEST);
        return;
      }

      commands
        .sendCommand('Light', 'HSBColor1', value)
        .then((response) => {
          if (response?.HSBColor && isHSB(response?.HSBColor)) {
            callback(HAPStatus.SUCCESS);
          } else {
            callback(HAPStatus.SERVICE_COMMUNICATION_FAILURE);
          }
        })
        .catch((error) => {
          logger.error('Unhandled error', error);
          callback(HAPStatus.SERVICE_COMMUNICATION_FAILURE);
        });
    },
    get: (callback) => {
      const { HSBColor } = getCurrentState();
      if (!HSBColor) {
        callback(HAPStatus.RESOURCE_DOES_NOT_EXIST);
        return;
      }

      const hue = Number.parseInt(HSBColor?.split(',')[0]);

      verbose &&
        logger?.debug(`Current 'HSBColor' state: ${HSBColor}, parsed 'Saturation' state: ${hue}`);

      if (isValidHue(hue)) {
        callback(HAPStatus.SUCCESS, hue);
      } else {
        callback(HAPStatus.RESOURCE_DOES_NOT_EXIST);
      }
    },
    onStateUpdate: (characteristic, state, changedKeys) => {
      if (changedKeys.includes('HSBColor')) {
        verbose && logger?.debug(`HSBColor onStateChange`);

        if (state?.HSBColor) {
          const hue = Number.parseInt(state.HSBColor.split(',')[0]);

          if (isValidHue(hue)) {
            characteristic.updateValue(hue);
            return true;
          }
        }
      }
      return false;
    },
  };
};

export default createHueListener;
