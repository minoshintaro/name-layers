import { DEFAULT } from "./settings";
import { collectNodesInSelection } from "./features/collectNodesInSelection";
import { generateNameAsContainer } from "./features/generateNameAsContainer";
import { generateNameAsElement } from "./features/generateNameAsElement";
import { generateNameAsFlow } from "./features/generateNameAsFlow";
import { generateNameAsItem } from "./features/generateNameAsItem";
import { generateNameAsModifier } from "./features/generateNameAsModifier";
import { generateNameAsRoot } from "./features/generateNameAsRoot";
import { generateNameAsStack } from "./features/generateNameAsStack";
import { matchWithReservedNames } from "./features/matchWithReservedNames";

figma.skipInvisibleInstanceChildren = true;

figma.on('run', ({ command }: RunEvent) => {
  const targetNodes = collectNodesInSelection(['FRAME', 'RECTANGLE']);
  if (targetNodes.length === 0) figma.closePlugin('No frames in your selection');

  for (const node of targetNodes) {
    switch (command) {
      case 'RESET_ALL_NAMES':
        if (node.type === 'FRAME') node.name = DEFAULT.frame;
        if (node.type === 'RECTANGLE') node.name = DEFAULT.rectangle;
        break;
      case 'RESET_NAME':
        if (node.type === 'FRAME' && matchWithReservedNames(node.name)) node.name = DEFAULT.frame;
        if (node.type === 'RECTANGLE' && matchWithReservedNames(node.name)) node.name = DEFAULT.rectangle;
        break;
      case 'SET_NAME':
        if (node.type === 'FRAME' && matchWithReservedNames(node.name)) {
          node.name =
            generateNameAsElement(node) ||
            generateNameAsItem(node) ||
            generateNameAsRoot(node) ||
            generateNameAsContainer(node) ||
            generateNameAsStack(node) ||
            generateNameAsFlow(node) ||
            DEFAULT.frame;
        }

        if (node.type === 'RECTANGLE') {
          node.name =
            generateNameAsElement(node) ||
            DEFAULT.rectangle;
        }

        const modifier = generateNameAsModifier(node);
        if (modifier) node.name = (
          node.name === DEFAULT.frame ||
          node.name === DEFAULT.rectangle
        ) ? modifier : `${node.name} ${modifier}`;

        break;
      default:
        break;
    }
  }

  figma.closePlugin('Test');
});
