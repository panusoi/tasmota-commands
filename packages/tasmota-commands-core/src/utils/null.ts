export const isNotNullOrUndefined = <T>(x: T | null | undefined): x is T =>
  x !== null && x !== undefined;
