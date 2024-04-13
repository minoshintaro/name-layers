import { isTargetType } from "./boolean";
import { getAllFrames } from "./get";
import { generateName } from "./generateName";

const selections = figma.currentPage.selection;
if (selections.length === 0) figma.closePlugin('No selections');

figma.on('run', ({ command }: RunEvent) => {
  for (const selectedNode of selections) {
    if(!isTargetType(selectedNode.type)) continue;
    for (const node of getAllFrames(selectedNode)) {
      if (node.type !== 'FRAME') continue;
      node.name = generateName(node, command);
    }
  }
  figma.closePlugin('Renamed');
});
