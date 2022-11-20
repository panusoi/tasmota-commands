import { AccessoryConfig } from 'homebridge';
import { isNotNullOrUndefined } from 'tasmota-commands-core';
import { PresetConfig } from './preset';
import { ProtocolConfig } from './protocol';

type VerboseConfig = {
  verbose?: true;
};

type CommonConfig = {
  refreshInterval?: number;
};

export const isCommonConfig = (value: unknown): value is CommonConfig =>
  isNotNullOrUndefined(value) &&
  typeof value === 'object' &&
  ['undefined', 'number'].includes(typeof (value as CommonConfig).refreshInterval);

export const isAccessoryConfig = (value: unknown): value is AccessoryConfig =>
  isNotNullOrUndefined(value) &&
  typeof value === 'object' &&
  typeof (value as AccessoryConfig).name === 'string' &&
  typeof (value as AccessoryConfig).accessory === 'string';

export type TasmotaCommandsAccessoryConfig = AccessoryConfig &
  ProtocolConfig &
  PresetConfig &
  VerboseConfig &
  CommonConfig;
