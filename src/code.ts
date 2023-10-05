import { isReservedName } from "./boolean";
import { getAllFrames } from "./get";
import { createSizingModifier } from "./createModifier";
import { createNameAsElement } from "./createNameAsElement";
import { createNameAsChild } from "./createNameAsChild";
import { createNameAsContainer } from "./createNameAsContainer";

figma.on('run', ({ command }: RunEvent) => {
  for (const selectedNode of figma.currentPage.selection) {
    const { type } = selectedNode;
    if (type !== 'SECTION' && type !== 'COMPONENT_SET' && type !== 'COMPONENT' && type !== 'FRAME') continue;

    for (const frame of getAllFrames(selectedNode)) {
      if (frame.type !== 'FRAME') continue;

      const { name, minWidth, maxWidth } = frame;
      const modifier = createSizingModifier(minWidth, maxWidth);
      const generateNewName = (): string => {
        switch (command) {
          case 'resetAllNames': return 'Frame';
          case 'resetName': return isReservedName(name) ? 'Frame' : name;
          case 'setName': return isReservedName(name) ? createNameAsElement(frame, modifier) || createNameAsChild(frame, modifier) || createNameAsContainer(frame, modifier) || 'Frame' : name;
          default: return name;
        }
      };

      frame.name = generateNewName();
    }
  }
  figma.closePlugin('Renamed');
});
