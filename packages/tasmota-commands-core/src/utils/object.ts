export const getChangedKeys = <T extends Record<string, unknown>>(
  obj1: T,
  obj2: T,
): (keyof T)[] => {
  return Object.keys(obj1).filter((key) => obj1[key] !== obj2[key]);
};
