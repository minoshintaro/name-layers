export function hasVariableKey(key: string, collection: VariableCollection): boolean {
  return collection.variableIds.some(variableId => {
    const variable = figma.variables.getVariableById(variableId);
    return variable ? variable.name === key : false;
  });
}
