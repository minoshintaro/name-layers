import { NamingConvention } from "../settings";
import { getKeysInCollection } from "./getKeys";

export function addVariablesToCollection(convention: NamingConvention, collection: VariableCollection): void {
  const currentKeys = getKeysInCollection(collection);

  for (const key in convention) {
    if (currentKeys.has(key)) continue;
    const newVariable = figma.variables.createVariable(`${convention[key].group}/${key}`, collection, 'STRING');

    newVariable.setValueForMode(collection.defaultModeId, convention[key].name);
    newVariable.scopes = [];
  }
}
