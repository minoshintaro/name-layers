import { Naming, COLLECTION_NAME, LAYER_NAME, namingConvention } from "./settings";
import { collectNodesInSelection } from "./features/collectNodesInSelection";
import { createDate } from "./features/createDate";
import { figmaVariables } from "./features/figmaVariables";
import { findMissingNamings } from "./features/findMissingNamings";
import { generateName } from "./features/generateName";
import { getNaming } from "./features/getNaming";
import { matchBothNamings, matchWithNaming } from "./utils/match";

figma.skipInvisibleInstanceChildren = true;

figma.on('run', async ({ command }: RunEvent) => {
  const currentCollection: VariableCollection | null = await figmaVariables.findCollection(COLLECTION_NAME);

  const defaultNaming: Naming = getNaming(namingConvention);
  const overriddenNaming: Naming | null = currentCollection ? await figmaVariables.generateNaming(currentCollection) : null;
  const currentNaming: Naming = overriddenNaming || defaultNaming;

  console.log('test:', defaultNaming, overriddenNaming, currentNaming);

  const reservedNames = new Set<string>([
    ...Object.values(LAYER_NAME),
    ...Object.values(defaultNaming),
    ...(overriddenNaming ? Object.values(overriddenNaming) : [])
  ]);

  const targetNodes = collectNodesInSelection({ types: ['FRAME', 'RECTANGLE'] });

  switch (command) {
    case 'OVERRIDE_NAMING':
      if (!currentCollection) {
        const newCollection = figmaVariables.createCollection(COLLECTION_NAME);
        figmaVariables.addVariables(defaultNaming, namingConvention, newCollection);
        figma.closePlugin('Created a collection in the local variables');
        return;
      }

      if (overriddenNaming && !matchBothNamings(defaultNaming, overriddenNaming)) {
        const diffs = findMissingNamings(defaultNaming, overriddenNaming);

        if (diffs) {
          figmaVariables.addVariables(diffs, namingConvention, currentCollection);
          figma.closePlugin('Restored the deleted variables');
          return;
        }
      }

      figma.closePlugin('Already overridden with the local variables');
      return;

    case 'SET_NAMES':
      for (const node of targetNodes) {
        if (matchWithNaming(node.name, reservedNames)) {
          node.name = generateName(node, currentNaming, namingConvention) || LAYER_NAME[node.type];
        }
      }
      break;

    case 'RESET_NAMES':
      for (const node of targetNodes) {
        if (matchWithNaming(node.name, reservedNames)) {
          node.name = LAYER_NAME[node.type];
        }
      }
      break;

    case 'RESET_ALL':
      for (const node of targetNodes) {
        node.name = LAYER_NAME[node.type];
      }
      break;

    case 'ADD_SUFFIX': {
      // _{width}x{height}_{date}
      for (const node of figma.currentPage.selection) {
        if (node.type === 'FRAME') {
          node.name = `${node.name} ${node.width}x${node.height}`;
        }
      }
      break;
    }

    case 'ADD_SIZE':
      for (const node of figma.currentPage.selection) {
        if (node.type === 'FRAME') {
          node.name = `${node.name} ${node.width}x${node.height}`;
        }
      }
      break;

    case 'ADD_DATE': {
      const date = createDate();
      for (const node of figma.currentPage.selection) {
        if (node.type === 'FRAME') {
          node.name = `${node.name} ${date}`;
        }
      }
      break;
    }

    default:
      break;
  }

  figma.closePlugin(targetNodes.size > 0 ? 'Renamed' : 'No frames in your selection');
});
