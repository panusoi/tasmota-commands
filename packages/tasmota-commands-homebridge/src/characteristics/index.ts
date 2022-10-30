import { Characteristic, CharacteristicEventTypes, Service } from 'homebridge';
import {
  CharacteristicName,
  CreateCharacteristicListener,
  CreateCharacteristicListenerArgs,
} from '../types/characteristic';
import createOnListener from './on';

const createListenerFunctions: Record<CharacteristicName, CreateCharacteristicListener> = {
  On: createOnListener,
};

export const createCharacteristic = (
  service: Service,
  name: CharacteristicName,
  args: CreateCharacteristicListenerArgs,
): Characteristic | null => {
  const characteristic = service.getCharacteristic(name);
  if (!characteristic) {
    return null;
  }

  const createListeners = createListenerFunctions[name];
  const listener = createListeners(args);
  characteristic.on(CharacteristicEventTypes.GET, listener.get);
  characteristic.on(CharacteristicEventTypes.SET, listener.set);
  return characteristic;
};
