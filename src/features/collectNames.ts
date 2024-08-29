import { NamingConvention } from "../settings";

export function collectNamesInConvention(conventions: Array<NamingConvention>): Set<string> {
  const collectedNames = new Set<string>();

  conventions.forEach(convention => {
    for (const key in convention) {
      if (convention.hasOwnProperty(key)) {
        collectedNames.add(convention[key].name);
      }
    }
  });

  return collectedNames;
}
