import { HAPStatus } from 'homebridge';
import { CreateCharacteristicListener } from '../types/characteristic';

const createOnListener: CreateCharacteristicListener = ({
  verbose,
  logger,
  commands,
  getCurrentState,
  setCurrentState,
}) => {
  verbose && logger.debug('Create On characteristic listener');
  return {
    set: (value, callback) => {
      commands
        .sendPowerToggle()
        .then((response) => {
          if (response && typeof response === 'object' && 'POWER' in response) {
            const isOn = (response as Record<string, unknown>).POWER === 'ON';
            setCurrentState('power', isOn);
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
      verbose && logger?.debug('Current on state: ', getCurrentState()?.power);
      callback(HAPStatus.SUCCESS, getCurrentState()?.power);
    },
  };
};

export default createOnListener;
