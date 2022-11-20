import { HAPStatus } from 'homebridge';
import { TasmotaState } from 'tasmota-commands-core';
import { CreateCharacteristicListener } from '../types/characteristic';

const isPowerOn = (value: TasmotaState['POWER']): boolean =>
  value !== undefined && (value === 1 || value === 'ON');

const createOnListener: CreateCharacteristicListener = ({
  verbose,
  logger,
  commands,
  getCurrentState,
}) => {
  verbose && logger.debug("Creating 'On' characteristic listener");
  return {
    set: (value, callback) => {
      commands.Control.setPower0(value === true ? 'on' : 'off')
        .then((response) => {
          if (response?.POWER) {
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
      verbose && logger?.debug('Current on state: ', getCurrentState()?.POWER);
      callback(HAPStatus.SUCCESS, isPowerOn(getCurrentState()?.POWER));
    },
    onStateUpdate: (characteristic, state, changedKeys) => {
      if (changedKeys.includes('POWER')) {
        verbose && logger?.debug(`Power onStateChange`);
        characteristic.updateValue(isPowerOn(state.POWER));
        return true;
      }

      return false;
    },
  };
};

export default createOnListener;
