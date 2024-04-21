import { DEFAULT, NAME } from "../settings";
import { removeSuffixNumber } from "../utils/removeSuffixNumber";

export function matchWithReservedNames(input: string): boolean {
  const defaultNames = Object.values(DEFAULT);
  const reservedNames = Object.values(NAME);

  return input.split(' ').every(word => (
    [...defaultNames, ...reservedNames].includes(removeSuffixNumber(word))
  ));
}
