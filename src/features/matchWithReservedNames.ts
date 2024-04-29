import { DEFAULT_NAME } from "../settings";
import { removeSuffixNumber } from "../utils/removeSuffixNumber";

export function matchWithReservedNames(input: string, namings: Set<string>): boolean {
  const splitNames = input.split(' ');

  return (
    (splitNames.length === 2 && Object.values(DEFAULT_NAME).includes(splitNames[0]) && /^\d+$/.test(splitNames[1])) ||
    splitNames.every(name => namings.has(removeSuffixNumber(name)))
  );
}
