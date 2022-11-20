import { ColorPreset, ColorValue, HexColor, HSB, RGB } from '../types/color';
import { isBetween } from './number';

const RGB_REGEX = /^(\d{1,3}),(\d{1,3}),(\d{1,3})$/;

const HSB_REGEX = /^(\d{1,3}),(\d{1,3}),(\d{1,3})$/;

const HEX_COLOR_REGEX = /^#([A-Fa-f0-9]{4}|[A-Fa-f0-9]{6}|[A-Fa-f0-9]{8}|[A-Fa-f0-9]{10})$/;

const HEX_COLOR_WITH_APPEND_REGEX = /^#([A-Fa-f0-9]{1,10})=$/;

export const isColorPreset = (value: unknown): value is ColorPreset =>
  (typeof value === 'number' && isBetween(value, { min: 1, max: 12, inclusive: true })) ||
  (typeof value === 'string' && ['-', '+'].includes(value));

export const isRGB = (value: unknown): value is RGB => {
  if (typeof value !== 'string') {
    return false;
  }

  const matches = value.match(RGB_REGEX);
  if (!matches) {
    return false;
  }

  const r = matches[1]
    ? isBetween(Number.parseInt(matches[1]), { min: 0, max: 255, inclusive: true })
    : false;
  const g = matches[2]
    ? isBetween(Number.parseInt(matches[2]), { min: 0, max: 255, inclusive: true })
    : false;
  const b = matches[3]
    ? isBetween(Number.parseInt(matches[3]), { min: 0, max: 255, inclusive: true })
    : false;

  return r && g && b;
};

export const isHexColor = (value: unknown): value is HexColor =>
  typeof value === 'string' &&
  (HEX_COLOR_REGEX.test(value) || HEX_COLOR_WITH_APPEND_REGEX.test(value));

export const isColorValue = (value: ColorValue): value is ColorValue =>
  isColorPreset(value) || isRGB(value) || isHexColor(value);

export const isHSB = (value: unknown): value is HSB => {
  if (typeof value !== 'string') {
    return false;
  }

  const matches = value.match(HSB_REGEX);
  if (!matches) {
    return false;
  }

  const h = matches[1]
    ? isBetween(Number.parseInt(matches[1]), { min: 0, max: 360, inclusive: true })
    : false;
  const s = matches[2]
    ? isBetween(Number.parseInt(matches[2]), { min: 0, max: 100, inclusive: true })
    : false;
  const b = matches[3]
    ? isBetween(Number.parseInt(matches[3]), { min: 0, max: 100, inclusive: true })
    : false;

  return h && s && b;
};
