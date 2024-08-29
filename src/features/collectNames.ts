import { NamingConvention } from "../settings";

export function collectNamesInConvention(conventions: Array<NamingConvention>): Set<string> {
  const collectedNames = new Set<string>();

  for (const convention of conventions) {
    Object.keys(convention).forEach(key => {
      collectedNames.add(convention[key].name);
    });
  }

  // conventions.forEach(convention => {
  //   for (const key in convention) {
  //     if (convention.hasOwnProperty(key)) {
  //       collectedNames.add(convention[key].name);
  //     }
  //   }
  // });

  return collectedNames;
}
