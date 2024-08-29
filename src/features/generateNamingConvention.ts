import { NamingConvention } from "../settings";
import { getKeysFromCollection, getVariablesFromCollection } from "./getFromCollection";
import { matchCommentOut } from "../utils/match";
import { trimVariableGroupName } from "../utils/edit";

export async function generateNamingConvention(initial: NamingConvention, collection: VariableCollection): Promise<NamingConvention> {
  const result: NamingConvention = {};

  const initialKeys = new Set(Object.keys(initial)); // root, container, grid ...
  const currentVariables = await getVariablesFromCollection(collection);

  for (const variable of currentVariables) {
    if (!variable) continue;
    const key = trimVariableGroupName(variable.name); // 'Layout/root' => 'root'
    const name = variable.valuesByMode[collection.defaultModeId]; // 'wrapper'

    if (typeof name !== "string" || matchCommentOut(name) || !initialKeys.has(key)) continue;
    result[key] = Object.assign({}, initial[key]);
    result[key].name = name;
  }

  return result;
}

export function generateDiffNamingConvention(convention: NamingConvention, collection: VariableCollection): NamingConvention {
  const diff: NamingConvention = {};
  const collectionKeys = getKeysFromCollection(collection);

  for (const key in convention) {
    if (collectionKeys.has(key)) continue;
    diff[key] = convention[key];
  }

  return diff;
}
