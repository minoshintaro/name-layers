import { NamingConvention } from "../settings";

export function mergeNamingConventions(initial: NamingConvention, overridden: NamingConvention | null): NamingConvention {
  if (overridden === null) return { ...initial };

  const merged: NamingConvention = {};

  Object.keys(initial).forEach(key => {
    if (overridden.hasOwnProperty(key) && overridden[key] !== undefined) {
      merged[key] = overridden[key];
    } else {
      merged[key] = initial[key];
    }
  });

  return merged;
}
