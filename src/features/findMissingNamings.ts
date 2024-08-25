import { NamingConvention } from "../settings";

export function findMissingNamings(initial: NamingConvention, overridden: NamingConvention): NamingConvention | null {
  const missingKeys = Object.keys(initial).filter(key => !(key in overridden));
  const diffs: NamingConvention = {};

  missingKeys.forEach(key => {
    diffs[key] = initial[key];
  });

  return Object.keys(diffs).length > 0 ? diffs : null;
}
