import { LayerName, DEFAULT_NAME } from "../settings";
import { removeSuffixNumber } from "../utils/removeSuffixNumber";

export function matchWithReservedNames(input: string, nameGroup: LayerName): boolean {
  const defaultNames = Object.values(DEFAULT_NAME);
  const reservedNames = Object.values(nameGroup);
  const splitNames = input.split(' ');

  return (
    (splitNames.length === 1 && defaultNames.includes(splitNames[0])) ||
    (splitNames.length === 2 && defaultNames.includes(splitNames[0]) && /^\d+$/.test(splitNames[1])) ||
    splitNames.every(name => reservedNames.includes(removeSuffixNumber(name))
  ));
}
