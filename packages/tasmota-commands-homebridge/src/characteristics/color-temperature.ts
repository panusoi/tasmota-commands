import { HAPStatus } from 'homebridge';
import { CreateCharacteristicListener } from '../types/characteristic';
import {
  convertHomebridgeForTasmotaColorTemperature,
  convertTasmotaColorTemperatureForHomebridge,
} from '../utils/color-temperature';

// https://github.com/homebridge/HAP-NodeJS/blob/master/src/lib/definitions/CharacteristicDefinitions.ts#L671
const createColorTemperatureListener: CreateCharacteristicListener = ({
  verbose,
  logger,
  commands,
  getCurrentState,
}) => {
  verbose && logger.debug("Creating 'Color Temperature' characteristic listeners");

  return {
    set: (value, callback) => {
      if (typeof value !== 'number') {
        callback(HAPStatus.INVALID_VALUE_IN_REQUEST);
        return;
      }

      const tasmotaCTValue = convertHomebridgeForTasmotaColorTemperature(value);

      if (tasmotaCTValue === null) {
        callback(HAPStatus.INVALID_VALUE_IN_REQUEST);
        return;
      }

      commands.Light.setColorTemperature(tasmotaCTValue)
        .then((response) => {
          if (response?.CT) {
            const homebridgeCTValue = convertTasmotaColorTemperatureForHomebridge(response.CT);

            if (homebridgeCTValue === null) {
              callback(HAPStatus.SERVICE_COMMUNICATION_FAILURE);
              return;
            }

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
      const { CT } = getCurrentState();
      const homebridgeCTValue = convertTasmotaColorTemperatureForHomebridge(CT);

      verbose && logger?.debug(`Current 'Color Temperature' state: ${homebridgeCTValue}`);

      if (homebridgeCTValue !== null) {
        callback(HAPStatus.SUCCESS, homebridgeCTValue);
      } else {
        callback(HAPStatus.RESOURCE_DOES_NOT_EXIST);
      }
    },
    onStateUpdate: (characteristic, state, changedKeys) => {
      if (changedKeys.includes('CT')) {
        verbose && logger?.debug(`Color Temperature onStateChange`);
        const homebridgeCTValue = convertTasmotaColorTemperatureForHomebridge(state.CT);
        if (homebridgeCTValue) {
          characteristic.updateValue(homebridgeCTValue);
          return true;
        }
      }
      return false;
    },
  };
};

export default createColorTemperatureListener;
