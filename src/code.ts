import { NamingConvention, COLLECTION_NAME, LAYER_NAME, initialNamingConvention } from "./settings";
import { addVariablesToCollection } from "./features/addVariables";
import { collectNamesInConvention } from "./features/collectNames";
import { collectNodesInTree } from "./features/collectNodes";
import { findVariableCollection } from "./features/findCollection";
import { generateName } from "./features/generateName";
import { generateNamingConvention, generateDiffNamingConvention } from "./features/generateNamingConvention";
import { generateSuffix } from "./features/generateSuffix";
import { changeToSuffixPattern } from "./utils/edit";
import { isDefaultName } from "./utils/isTrue";
import { matchWithNames } from "./utils/match";
import { regex } from "./utils/regex";

figma.skipInvisibleInstanceChildren = true;

figma.on('run', async ({ command }: RunEvent) => {
  const selectedNodes = figma.currentPage.selection;
  const targetNodes: Set<SceneNode> = collectNodesInTree(selectedNodes, { types: ['FRAME', 'RECTANGLE'] });

  const currentCollection: VariableCollection | null = await findVariableCollection(COLLECTION_NAME);
  const currentNamingConvention: NamingConvention = currentCollection !== null
    ? await generateNamingConvention(initialNamingConvention, currentCollection)
    : initialNamingConvention;

  const reservedNames: Set<string> = collectNamesInConvention([initialNamingConvention, currentNamingConvention]);
  const suffixPattern = changeToSuffixPattern(currentNamingConvention.suffix.name);
  const date = new Date();

  switch (command) {
    case 'OVERRIDE_NAMING':
      if (!currentCollection) {
        const newCollection = figma.variables.createVariableCollection(COLLECTION_NAME);
        addVariablesToCollection(initialNamingConvention, newCollection);

        figma.closePlugin('Created a collection in the local variables');
        return;
      } else {
        const diffNamingConvention: NamingConvention = generateDiffNamingConvention(initialNamingConvention, currentCollection);

        if (Object.keys(diffNamingConvention).length > 0) {
          addVariablesToCollection(diffNamingConvention, currentCollection);

          figma.closePlugin('Restored the deleted variables');
          return;
        }
      }

      figma.closePlugin('Already overridden with the local variables');
      return;

    case 'SET_NAMES':
      for (const node of targetNodes) {
        if (isDefaultName(node.name) || matchWithNames(node.name, reservedNames)) {
          node.name = generateName(node, currentNamingConvention) || LAYER_NAME[node.type];
        }
      }
      break;

    case 'RESET_NAMES':
      for (const node of targetNodes) {
        if (isDefaultName(node.name) || matchWithNames(node.name, reservedNames)) {
          node.name = LAYER_NAME[node.type];
        }
      }
      break;

    case 'RESET_ALL':
      for (const node of targetNodes) {
        node.name = LAYER_NAME[node.type];
      }
      break;

    case 'ADD_SUFFIX':
      if (selectedNodes.length === 0) break;
      if (currentNamingConvention.hasOwnProperty('suffix')) {
        for (const node of selectedNodes) {
          if (node.type === 'FRAME') {
            const newSuffix = generateSuffix(currentNamingConvention.suffix.name, node.width, node.height, date);

            if (suffixPattern.test(node.name)) {
              node.name = node.name.replace(suffixPattern, newSuffix);
            } else {
              node.name = `${node.name}${regex.conjunction.test(newSuffix.charAt(0)) ? newSuffix : ' ' + newSuffix}`;
            }
          }
        }
      }
      figma.closePlugin('Added');
      return;

    case 'REMOVE_SUFFIX':
      if (currentNamingConvention.hasOwnProperty('suffix')) {
        for (const node of selectedNodes) {
          if (node.type === 'FRAME' && suffixPattern.test(node.name)) {
            node.name = node.name.replace(suffixPattern, '').replace(regex.endSpace, '');
          }
        }
      }
      figma.closePlugin('Removed');
      return;

    default:
      break;
  }

  figma.closePlugin(targetNodes.size > 0 ? 'Renamed' : 'No frames in your selection');
});
