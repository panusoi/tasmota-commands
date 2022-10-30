import {
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

type CharacteristicListeners = {
  set: CharacteristicSetFn;
  get: CharacteristicGetFn;
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
