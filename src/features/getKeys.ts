import { trimVariableGroupName } from "../utils/edit";

export function getKeysInCollection(collection: VariableCollection): Set<string> {
  const keys = new Set<string>();

  for (const variableId of collection.variableIds) {
    const variable = figma.variables.getVariableById(variableId);
    if (!variable) continue;

    const key = trimVariableGroupName(variable.name);
    keys.add(key);
  }

  return keys;
}
