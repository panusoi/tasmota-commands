import { isBetween } from 'tasmota-commands-core';

const TASMOTA_CT_MAX = 500;
const TASMOTA_CT_MIN = 153;

const HOMEBRIDGE_CT_MAX = 500;
const HOMEBRIDGE_CT_MIN = 140;

export const convertTasmotaColorTemperatureForHomebridge = (
  value: number | undefined,
): number | null => {
  if (typeof value !== 'number') {
    return null;
  }

  if (!isBetween(value, { min: TASMOTA_CT_MIN, max: TASMOTA_CT_MAX })) {
    return null;
  }

  const tasmotaValue = value;
  const homeValue =
    ((tasmotaValue - TASMOTA_CT_MIN) * (HOMEBRIDGE_CT_MAX - HOMEBRIDGE_CT_MIN)) /
      (TASMOTA_CT_MAX - TASMOTA_CT_MIN) +
    HOMEBRIDGE_CT_MIN;

  return Math.round(homeValue);
};

export const convertHomebridgeForTasmotaColorTemperature = (
  value: number | undefined,
): number | null => {
  if (typeof value !== 'number') {
    return null;
  }

  if (!isBetween(value, { min: HOMEBRIDGE_CT_MIN, max: HOMEBRIDGE_CT_MAX })) {
    return null;
  }

  const homeValue = value;
  const tasmotaValue =
    ((homeValue - HOMEBRIDGE_CT_MIN) * (TASMOTA_CT_MAX - TASMOTA_CT_MIN)) /
      (HOMEBRIDGE_CT_MAX - HOMEBRIDGE_CT_MIN) +
    TASMOTA_CT_MIN;

  return Math.round(tasmotaValue);
};
