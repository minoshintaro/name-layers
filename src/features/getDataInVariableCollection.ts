import { LayerName, NO_RENAME } from "../settings";

export async function getDataInVariableCollection(target: string): Promise<LayerName | null> {
  const collections = await figma.variables.getLocalVariableCollectionsAsync();
  const targetCollection: VariableCollection | undefined = collections.find(collection => collection.name === target);
  if (!targetCollection) return null;

  const result: LayerName = {};
  for (const variableId of targetCollection.variableIds) {
    const variable: Variable | null = await figma.variables.getVariableByIdAsync(variableId);
    if (!variable) continue;

    const key = variable.name;
    const value = variable.valuesByMode[targetCollection.defaultModeId];
    if (typeof value === 'string') result[key] = value === NO_RENAME ? null : value;
  }

  return result;
}
