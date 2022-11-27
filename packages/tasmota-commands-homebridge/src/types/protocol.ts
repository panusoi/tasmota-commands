import { isNotNullOrUndefined } from 'tasmota-commands-core';
import { TasmotaMqttOptions } from 'tasmota-commands-mqtt';
import { TasmotaHttpOptions } from 'tasmota-commands-http';
import {
  isString,
  isStringOrUndefined,
  isNumberOrUndefined,
  isBooleanOrUndefined,
} from '../utils/validator';

type HttpProtocolConfig = {
  protocol: 'http';
} & TasmotaHttpOptions;

type MqttProtocolConfig = {
  protocol: 'mqtt';
} & TasmotaMqttOptions;

export type ProtocolConfig = HttpProtocolConfig | MqttProtocolConfig;

export const isProtocolConfig = (value: unknown): value is ProtocolConfig =>
  isHttpProtocolConfig(value) || isMqttProtocolConfig(value);

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
  isString((value as MqttProtocolConfig).host) &&
  isString((value as MqttProtocolConfig).topic) &&
  isString((value as MqttProtocolConfig).topicFormat) &&
  isStringOrUndefined((value as MqttProtocolConfig).username) &&
  isStringOrUndefined((value as MqttProtocolConfig).password) &&
  isNumberOrUndefined((value as MqttProtocolConfig).port) &&
  isBooleanOrUndefined((value as MqttProtocolConfig).connectOnInit);
