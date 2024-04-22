import { COLLECTION_NAME, LAYER_NAME } from "../settings";

export function setLocalVars() {
  const collection = figma.variables.createVariableCollection(COLLECTION_NAME);
  const valueField = collection.modes[0].modeId;

  for (const key in LAYER_NAME) {
    const nameVar = figma.variables.createVariable(key, collection, 'STRING');
    nameVar.setValueForMode(valueField, LAYER_NAME[key]);
  }
}
