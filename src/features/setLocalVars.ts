import { COLLECTION_NAME, LAYER_NAME } from "../settings";

export function setLocalVars() {
  const collection = figma.variables.createVariableCollection(COLLECTION_NAME);
  for (const key in LAYER_NAME) {
    const variable = figma.variables.createVariable(key, collection, 'STRING');
    variable.setValueForMode(collection.defaultModeId, LAYER_NAME[key]);
  }
}
