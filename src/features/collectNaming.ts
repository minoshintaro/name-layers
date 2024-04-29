import { LayerName, DEFAULT_NAME } from "../settings";

export function collectNaming(namings: (LayerName | null)[]): Set<string> {
  const nameSet = new Set<string>(Object.values(DEFAULT_NAME));

  for (const naming of namings) {
    if (!naming) continue;
    Object.values(naming).forEach(item => {
      if (item) nameSet.add(item);
    });
  }

  return nameSet;
}
