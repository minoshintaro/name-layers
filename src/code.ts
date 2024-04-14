import { DEFAULT_NAME } from "./settings";
import { isReservedName } from "./features/check";
import { collectNodesByCriteria } from "./features/collectNodes";
import { generateNameAsElement, generateNameAsItem } from "./features/generateName";

figma.skipInvisibleInstanceChildren = true;

figma.on('run', ({ command }: RunEvent) => {
  const targetNodes = collectNodesByCriteria(figma.currentPage.selection);
  if (targetNodes.length === 0) figma.closePlugin('No frames in your selection');

  for (const node of targetNodes) {
    if (node.type !== 'FRAME') continue;

    switch (command) {
      case 'RESET_ALL_NAMES':
        node.name = DEFAULT_NAME;
        break;
      case 'RESET_NAME':
        if (isReservedName(node.name)) {
          node.name = DEFAULT_NAME;
        }
        break;
      case 'SET_NAME':
        // if (isReservedName(node.name)) {}
        const newName = generateNameAsElement(node) || generateNameAsItem(node) || null;
        if (newName !== null) node.name = newName;
        console.log('test:', newName);
        break;
      default:
        break;
    }
  }

  console.log('test:', targetNodes);
  figma.closePlugin('Test');
});

// figma.on('run', ({ command }: RunEvent) => {
//   const selections = figma.currentPage.selection;
//   if (selections.length === 0) figma.closePlugin('No selections');
//
//   for (const entryNode of selections) {
//     if(!isTargetType(entryNode.type)) continue;
//
//     for (const node of getAllFrames(entryNode)) {
//       if (node.type !== 'FRAME') continue;
//       node.name = generateName(node, command);
//     }
//   }
//
//   for (const selectedNode of selections) {
//     if(!isTargetType(selectedNode.type)) continue;
//
//     for (const node of getAllFrames(selectedNode)) {
//       if (node.type !== 'FRAME') continue;
//       node.name = generateName(node, command);
//     }
//   }
//   figma.closePlugin('Renamed');
// });
//
