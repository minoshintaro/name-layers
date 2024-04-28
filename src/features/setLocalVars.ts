import { COLLECTION_NAME, NAMING_CONVENTION } from "../settings";

export function setLocalVars() {
  const collection = figma.variables.createVariableCollection(COLLECTION_NAME);
  for (const key in NAMING_CONVENTION) {
    const variable = figma.variables.createVariable(key, collection, 'STRING');
    variable.setValueForMode(collection.defaultModeId, NAMING_CONVENTION[key]);
  }
}
