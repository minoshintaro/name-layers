import { Naming } from "../settings";

export function findMissingNamings(initial: Naming, current: Naming): Naming | null {
  const missingKeys = Object.keys(initial).filter(key => !(key in current));
  const diffs: Naming = {};

  missingKeys.forEach(key => diffs[key] = initial[key]);

  return Object.keys(diffs).length > 0 ? diffs : null;
}
