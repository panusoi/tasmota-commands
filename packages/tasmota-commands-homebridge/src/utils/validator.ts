export const isString = (value: unknown): value is string => typeof value === 'string';

export const isStringOrUndefined = (value: unknown): value is string | undefined =>
  typeof value === 'string' || typeof value === 'undefined';

export const isNumberOrUndefined = (value: unknown): value is string | undefined =>
  typeof value === 'number' || typeof value === 'undefined';

export const isBooleanOrUndefined = (value: unknown): value is string | undefined =>
  typeof value === 'boolean' || typeof value === 'undefined';
