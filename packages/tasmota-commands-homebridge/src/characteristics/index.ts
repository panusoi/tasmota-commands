import { Characteristic, CharacteristicEventTypes, HAP, Service } from 'homebridge';
import {
  CharacteristicName,
  CreateCharacteristicListener,
  CreateCharacteristicListenerArgs,
  OnStateUpdate,
} from '../types/characteristic';
import createBrightnessListener from './brightness';
import createColorTemperatureListener from './color-temperature';
import createOnListener from './on';

const createListenerFunctions: Record<CharacteristicName, CreateCharacteristicListener> = {
  On: createOnListener,
  Brightness: createBrightnessListener,
  ColorTemperature: createColorTemperatureListener,
};

const getCharacteristicClass = (name: CharacteristicName, hap: HAP) => {
  switch (name) {
    case 'On': {
      return hap.Characteristic.On;
    }
    case 'Brightness': {
      return hap.Characteristic.Brightness;
    }
    case 'ColorTemperature': {
      return hap.Characteristic.ColorTemperature;
    }
    default: {
      const _exhausive: never = name;
      throw new Error(`Invalid characteristic name: '${_exhausive}'`);
    }
  }
};

export type CharacteristicWithUpdate = {
  characteristic: Characteristic;
  onStateUpdate: OnStateUpdate;
};

export const createCharacteristic = (
  hap: HAP,
  service: Service,
  name: CharacteristicName,
  args: CreateCharacteristicListenerArgs,
): CharacteristicWithUpdate | null => {
  const characteristic = service.getCharacteristic(getCharacteristicClass(name, hap));

  if (!characteristic) {
    return null;
  }

  const createListeners = createListenerFunctions[name];
  const listener = createListeners(args);
  characteristic.on(CharacteristicEventTypes.GET, listener.get);
  characteristic.on(CharacteristicEventTypes.SET, listener.set);
  return { characteristic, onStateUpdate: listener.onStateUpdate };
};
