import { COLLECTION_NAME, NAMING_CONVENTION, NO_RENAME } from "../settings";

export function setLocalVars() {
  const collection = figma.variables.createVariableCollection(COLLECTION_NAME);

  for (const key in NAMING_CONVENTION) {
    const variable = figma.variables.createVariable(key, collection, 'STRING');
    const value = NAMING_CONVENTION[key] || NO_RENAME;

    variable.setValueForMode(collection.defaultModeId, value);
  }
}
