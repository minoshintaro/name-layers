import { LayerName, COLLECTION_NAME, DEFAULT_NAME, NAMING_CONVENTION } from "./settings";
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

function generateFrameName(node: FrameNode, naming: LayerName): string | null {
  const newName =
    generateNameAsElement(node, naming) ||
    generateNameAsItem(node, naming) ||
    generateNameAsRoot(node, naming) ||
    generateNameAsContainer(node, naming) ||
    generateNameAsStack(node, naming) ||
    generateNameAsFlow(node, naming) ||
    null;
  const modifier = generateNameAsModifier(node, naming);
  return modifier ? `${newName} ${modifier}` : newName;
}

figma.skipInvisibleInstanceChildren = true;

figma.on('run', async ({ command }: RunEvent) => {
  const overriddenNaming: LayerName | null = await getDataInVariableCollection(COLLECTION_NAME);
  const currentNaming: LayerName = overriddenNaming || NAMING_CONVENTION;
  const targetNodes = collectNodesInSelection(['FRAME', 'RECTANGLE']);

  switch (command) {
    case 'OVERRIDE_NAMES':
      if (!overriddenNaming) setLocalVars();
      figma.closePlugin(overriddenNaming ? 'Already overridden with local variables' : 'Created local variables');
      break;

    case 'RESET_ALL_NAMES':
      for (const node of targetNodes) {
        if (node.type === 'FRAME') node.name = DEFAULT_NAME.frame;
        if (node.type === 'RECTANGLE') node.name = DEFAULT_NAME.rectangle;
      }
      break;

    case 'RESET_NAMES':
      for (const node of targetNodes) {
        if (matchWithReservedNames(node.name, currentNaming)) {
          if (node.type === 'FRAME') node.name = DEFAULT_NAME.frame;
          if (node.type === 'RECTANGLE') node.name = DEFAULT_NAME.rectangle;
        }
      }
      break;

    case 'SET_NAMES':
      for (const node of targetNodes) {
        if (matchWithReservedNames(node.name, currentNaming)) {
          if (node.type === 'FRAME') node.name = generateFrameName(node, currentNaming) || DEFAULT_NAME.frame;;
          if (node.type === 'RECTANGLE') node.name = generateNameAsElement(node, currentNaming) || DEFAULT_NAME.rectangle;
        }
      }
      break;

    default:
      break;
  }

  figma.closePlugin(targetNodes.length > 0 ? 'Renamed' : 'No frames in your selection');
});
