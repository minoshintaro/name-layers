import { Naming, NamingConvention, ANONYMOUS } from "../settings";
import { hasVariableKey } from "../utils/hasVariableKye";
import { matchCommentOut } from "../utils/match";
import { trimVariableGroupName } from "../utils/trim";

function createCollection(name: string): VariableCollection {
  return figma.variables.createVariableCollection(name);
}

async function findCollection(name: string): Promise<VariableCollection | null> {
  const collections = await figma.variables.getLocalVariableCollections();
  return collections.find(collection => collection.name === name) || null;
}

async function generateNaming(collection: VariableCollection): Promise<Naming | null> {
  const naming: Naming = {};
  const variables = await Promise.all(
    collection.variableIds.map(variableId => figma.variables.getVariableByIdAsync(variableId))
  );

  for (const variable of variables) {
    if (!variable) continue;

    const key = trimVariableGroupName(variable.name);
    const value = variable.valuesByMode[collection.defaultModeId];

    if (typeof value === "string" && value !== ANONYMOUS && !matchCommentOut(value)) {
      naming[key] = value;
    }
  }

  return Object.keys(naming).length > 0 ? naming : null;
}

function addVariables(naming: Naming, convention: NamingConvention, collection: VariableCollection): void {
  for (const key in naming) {
    if (hasVariableKey(key, collection)) continue;

    const conventionKey = key as keyof NamingConvention;
    const groupName = convention.hasOwnProperty(conventionKey) ? convention[conventionKey].group : '';
    const name = groupName ? `${groupName}/${key}` : key;

    const newVariable = figma.variables.createVariable(name, collection, 'STRING');

    newVariable.setValueForMode(collection.defaultModeId, naming[key]);
    newVariable.scopes = [];
  }
}

export const figmaVariables = {
  addVariables,
  createCollection,
  findCollection,
  generateNaming,
}
