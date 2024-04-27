import { LayerName, COLLECTION_NAME, DEFAULT_NAME, LAYER_NAME } from "./settings";
import { collectNodesInSelection } from "./features/collectNodesInSelection";
import { generateNameAsContainer } from "./features/generateNameAsContainer";
import { generateNameAsElement } from "./features/generateNameAsElement";
import { generateNameAsFlow } from "./features/generateNameAsFlow";
import { generateNameAsItem } from "./features/generateNameAsItem";
import { generateNameAsModifier } from "./features/generateNameAsModifier";
import { generateNameAsRoot } from "./features/generateNameAsRoot";
import { generateNameAsStack } from "./features/generateNameAsStack";
import { getDataInVariableCollection } from "./features/getDataInVariableCollection";
import { matchWithReservedNames } from "./features/matchWithReservedNames";
import { setLocalVars } from "./features/setLocalVars";

figma.skipInvisibleInstanceChildren = true;

figma.on('run', async ({ command }: RunEvent) => {
  const overriddenName: LayerName | null = await getDataInVariableCollection(COLLECTION_NAME);
  const naming: LayerName = overriddenName || LAYER_NAME;
  const targetNodes = collectNodesInSelection(['FRAME', 'RECTANGLE']);

  switch (command) {
    case 'OVERRIDE_NAMES':
      if (overriddenName) {
        figma.closePlugin('Already overridden with local variables');
      } else {
        setLocalVars();
        figma.closePlugin('Created local variables');
      }
      break;

    case 'RESET_ALL_NAMES':
      for (const node of targetNodes) {
        if (node.type === 'FRAME') node.name = DEFAULT_NAME.frame;
        if (node.type === 'RECTANGLE') node.name = DEFAULT_NAME.rectangle;
      }
      break;

    case 'RESET_NAMES':
      for (const node of targetNodes) {
        if (node.type === 'FRAME' && matchWithReservedNames(node.name, naming)) node.name = DEFAULT_NAME.frame;
        if (node.type === 'RECTANGLE' && matchWithReservedNames(node.name, naming)) node.name = DEFAULT_NAME.rectangle;
      }
      break;

    case 'SET_NAMES':
      for (const node of targetNodes) {
        if (node.type === 'FRAME' && matchWithReservedNames(node.name, naming)) {
          node.name =
            generateNameAsElement(node, naming) ||
            generateNameAsItem(node, naming) ||
            generateNameAsRoot(node, naming) ||
            generateNameAsContainer(node, naming) ||
            generateNameAsStack(node, naming) ||
            generateNameAsFlow(node, naming) ||
            DEFAULT_NAME.frame;
        }

        if (node.type === 'RECTANGLE' && matchWithReservedNames(node.name, naming)) {
          node.name =
            generateNameAsElement(node, naming) ||
            DEFAULT_NAME.rectangle;
        }

        {
          const modifier = generateNameAsModifier(node, naming);
          if (modifier) {
            node.name = (node.name === DEFAULT_NAME.frame || node.name === DEFAULT_NAME.rectangle)
              ? modifier : `${node.name} ${modifier}`;
          }
        }
      }
      break;

    default:
      break;
  }

  figma.closePlugin(targetNodes.length > 0 ? 'Renamed' : 'No frames in your selection');
});
