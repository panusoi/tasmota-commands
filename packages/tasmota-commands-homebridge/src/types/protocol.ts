import { isNotNullOrUndefined } from 'tasmota-commands-core';

type HttpProtocolConfig = {
  protocol: 'http';
  address: string;
  username?: string;
  password?: string;
};

type MqttProtocolConfig = {
  protocol: 'mqtt';
  address: string;
  topic: string;
};

export type ProtocolConfig = HttpProtocolConfig | MqttProtocolConfig;

export const isHttpProtocolConfig = (value: unknown): value is HttpProtocolConfig =>
  isNotNullOrUndefined(value) &&
  typeof value === 'object' &&
  (value as HttpProtocolConfig).protocol === 'http' &&
  typeof (value as HttpProtocolConfig).address === 'string' &&
  ['undefined', 'string'].includes(typeof (value as HttpProtocolConfig).username) &&
  ['undefined', 'string'].includes(typeof (value as HttpProtocolConfig).password);

export const isMqttProtocolConfig = (value: unknown): value is MqttProtocolConfig =>
  isNotNullOrUndefined(value) &&
  typeof value === 'object' &&
  (value as MqttProtocolConfig).protocol === 'mqtt' &&
  typeof (value as MqttProtocolConfig).address === 'string' &&
  typeof (value as MqttProtocolConfig).topic === 'string';
