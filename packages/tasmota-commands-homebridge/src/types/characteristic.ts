import {
  Characteristic,
  CharacteristicGetCallback,
  CharacteristicSetCallback,
  CharacteristicValue,
  Logger,
} from 'homebridge';
import { TasmotaCommands, TasmotaState } from 'tasmota-commands-core';

export const characteristicNames = ['On', 'Brightness', 'ColorTemperature'] as const;

export type CharacteristicName = typeof characteristicNames[number];

export const isCharacteristicNamesArray = (array: unknown): array is CharacteristicName[] =>
  Array.isArray(array) && array.every((i) => characteristicNames.includes(i));

type CharacteristicSetFn = (
  value: CharacteristicValue,
  callback: CharacteristicSetCallback,
) => void;

type CharacteristicGetFn = (callback: CharacteristicGetCallback) => void;

export type OnStateUpdate = (
  characteristic: Characteristic,
  state: Partial<TasmotaState>,
  changedKeys: (keyof TasmotaState)[],
) => boolean;

type CharacteristicListeners = {
  set: CharacteristicSetFn;
  get: CharacteristicGetFn;
  onStateUpdate: OnStateUpdate;
};

export type CreateCharacteristicListenerArgs = {
  verbose?: true;
  commands: TasmotaCommands;
  logger: Logger;
  getCurrentState: () => TasmotaState;
};

export type CreateCharacteristicListener = (
  args: CreateCharacteristicListenerArgs,
) => CharacteristicListeners;
