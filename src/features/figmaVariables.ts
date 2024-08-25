import { NamingConvention, ANONYMOUS } from "../settings";
import { matchCommentOut } from "../utils/match";

function createCollection(name: string): VariableCollection {
  return figma.variables.createVariableCollection(name);
}

async function findCollection(name: string): Promise<VariableCollection | null> {
  const collections = await figma.variables.getLocalVariableCollections();
  return collections.find(collection => collection.name === name) || null;
}

async function getNamingVariables(collection: VariableCollection): Promise<NamingConvention | null> {
  const variables = await Promise.all(
    collection.variableIds.map(variableId => figma.variables.getVariableByIdAsync(variableId))
  );

  const namingConvention = variables.reduce((result: NamingConvention, variable) => {
    if (variable) {
      const key = variable.name;
      const value = variable.valuesByMode[collection.defaultModeId];
      if (typeof value === "string" && value !== ANONYMOUS && !matchCommentOut(value)) {
        result[key] = value;
      }
    }
    return result;
  }, {});

  return Object.keys(namingConvention).length > 0 ? namingConvention : null;
}

function setNamingVariables(collection: VariableCollection, naming: NamingConvention): void {
  const hasKey = (input: string): boolean => collection.variableIds.some(variableId => {
    const variable = figma.variables.getVariableById(variableId);
    return variable && variable.name === input;
  });

  for (const key in naming) {
    if (hasKey(key)) continue;
    const variable = figma.variables.createVariable(key, collection, 'STRING');
    variable.setValueForMode(collection.defaultModeId, naming[key]);
    variable.scopes = [];
  }
}

export const figmaVariables = {
  createCollection,
  findCollection,
  getNamingVariables,
  setNamingVariables
}
