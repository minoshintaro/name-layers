import { LayerName } from "../settings";

export async function getDataInVariableCollection(input: VariableCollection[], target: string): Promise<LayerName | null> {
  const result: LayerName = {};

  const targetCollection: VariableCollection | undefined = input.find(collection => collection.name === target);
  if (!targetCollection) return null;

  for (const variableId of targetCollection.variableIds) {
    const variable: Variable | null = await figma.variables.getVariableByIdAsync(variableId);
    if (!variable) continue;

    const key = variable.name;
    const value = variable.valuesByMode[targetCollection.defaultModeId];
    if (typeof value === 'string') {
      result[key] = value;
    }
  }

  return result;
}
