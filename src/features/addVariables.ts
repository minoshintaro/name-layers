import { NamingConvention } from "../settings";
import { getKeysFromCollection } from "./getFromCollection";

export function addVariablesToCollection(convention: NamingConvention, collection: VariableCollection): void {
  const currentKeys = getKeysFromCollection(collection);

  for (const key in convention) {
    if (currentKeys.has(key)) continue;
    const newVariable = figma.variables.createVariable(`${convention[key].group}/${key}`, collection, 'STRING');

    newVariable.setValueForMode(collection.defaultModeId, convention[key].name);
    newVariable.scopes = [];
  }
}
