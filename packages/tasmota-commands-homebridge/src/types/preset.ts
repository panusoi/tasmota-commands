import { isNotNullOrUndefined } from 'tasmota-commands-core';
import { CharacteristicName, isCharacteristicNamesArray } from './characteristic';

const presets = [
  'switch-on-off',
  'lightbulb-on-off',
  'lightbulb-brightness-ct',
  'lightbulb-brightness',
  'lightbulb-rgb',
] as const;

const accessoryTypes = ['lightbulb', 'switch'] as const;

type AccessoryType = (typeof accessoryTypes)[number];

type Preset = {
  preset: (typeof presets)[number];
};

type CustomPreset = {
  preset: 'custom';
  type: AccessoryType;
  customPresetCharacteristics: CharacteristicName[];
};

export type PresetConfig = Preset | CustomPreset;

export const isPreset = (value: unknown): value is Preset =>
  isNotNullOrUndefined(value) &&
  typeof value === 'object' &&
  presets.includes((value as PresetConfig).preset as Preset['preset']);

export const isCustomPreset = (value: unknown): value is CustomPreset =>
  isNotNullOrUndefined(value) &&
  typeof value === 'object' &&
  (value as PresetConfig).preset === 'custom' &&
  accessoryTypes.includes((value as CustomPreset).type) &&
  isCharacteristicNamesArray((value as CustomPreset).customPresetCharacteristics);

export const presetAccessoryTypeMap: Record<Preset['preset'], AccessoryType> = {
  'switch-on-off': 'switch',
  'lightbulb-on-off': 'lightbulb',
  'lightbulb-brightness': 'lightbulb',
  'lightbulb-brightness-ct': 'lightbulb',
  'lightbulb-rgb': 'lightbulb',
};

export const presetCharacteristicMap: Record<Preset['preset'], CharacteristicName[]> = {
  'switch-on-off': ['On'],
  'lightbulb-on-off': ['On'],
  'lightbulb-brightness': ['On', 'Brightness'],
  'lightbulb-brightness-ct': ['On', 'Brightness', 'ColorTemperature'],
  'lightbulb-rgb': ['On', 'Brightness', 'Hue', 'Saturation'],
};
