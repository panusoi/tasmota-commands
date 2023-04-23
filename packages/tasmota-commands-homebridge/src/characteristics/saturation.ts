import { HAPStatus } from 'homebridge';
import { isBetween, isHSB } from 'tasmota-commands-core';
import { CreateCharacteristicListener } from '../types/characteristic';

const isValidSaturation = (value: number): value is number =>
  isBetween(value, { min: 0, max: 100, inclusive: true });

// https://github.com/homebridge/HAP-NodeJS/blob/master/src/lib/definitions/CharacteristicDefinitions.ts#L3184
const createSaturationListener: CreateCharacteristicListener = ({
  verbose,
  logger,
  commands,
  getCurrentState,
}) => {
  verbose && logger.debug("Creating 'Saturation' characteristic listeners");

  return {
    set: (value, callback) => {
      if (typeof value !== 'number' || !isValidSaturation(value)) {
        callback(HAPStatus.INVALID_VALUE_IN_REQUEST);
        return;
      }

      commands
        .sendCommand('Light', 'HSBColor2', value)
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

      const saturation = Number.parseInt(HSBColor?.split(',')[1]);

      verbose &&
        logger?.debug(
          `Current 'HSBColor' state: ${HSBColor}, parsed 'Saturation' state: ${saturation}`,
        );

      if (isValidSaturation(saturation)) {
        callback(HAPStatus.SUCCESS, saturation);
      } else {
        callback(HAPStatus.RESOURCE_DOES_NOT_EXIST);
      }
    },
    onStateUpdate: (characteristic, state, changedKeys) => {
      if (changedKeys.includes('HSBColor')) {
        verbose && logger?.debug(`HSBColor onStateChange`);

        if (state.HSBColor) {
          const saturation = Number.parseInt(state?.HSBColor?.split(',')[1]);

          if (isValidSaturation(saturation)) {
            characteristic.updateValue(saturation);
            return true;
          }
        }
      }
      return false;
    },
  };
};

export default createSaturationListener;
