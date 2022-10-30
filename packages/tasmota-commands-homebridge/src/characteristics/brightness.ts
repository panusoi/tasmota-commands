import { HAPStatus } from 'homebridge';
import { TasmotaState } from 'tasmota-commands-core';
import { CreateCharacteristicListener } from '../types/characteristic';

const isValidBrightness = (value: TasmotaState['Dimmer']): value is number =>
  value !== undefined && typeof value === 'number' && value >= 0 && value <= 100;

// https://github.com/homebridge/HAP-NodeJS/blob/master/src/lib/definitions/CharacteristicDefinitions.ts#L341
const createBrightnessListener: CreateCharacteristicListener = ({
  verbose,
  logger,
  commands,
  getCurrentState,
}) => {
  verbose && logger.debug("Creating 'Brightness' characteristic listeners");

  return {
    set: (value, callback) => {
      if (typeof value !== 'number' || !isValidBrightness(value)) {
        callback(HAPStatus.INVALID_VALUE_IN_REQUEST);
        return;
      }

      commands.Light.setDimmer(value)
        .then((response) => {
          if (response?.Dimmer && isValidBrightness(response?.Dimmer)) {
            callback(HAPStatus.SUCCESS, response?.Dimmer);
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
      const { Dimmer } = getCurrentState();
      verbose && logger?.debug(`Current 'Brightness' state: ${Dimmer}`);

      if (isValidBrightness(Dimmer)) {
        callback(HAPStatus.SUCCESS, Dimmer);
      } else {
        callback(HAPStatus.RESOURCE_DOES_NOT_EXIST);
      }
    },
  };
};

export default createBrightnessListener;
