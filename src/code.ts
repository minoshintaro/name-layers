import { isReservedName } from "./boolean";
import { getAllFrames, getNameAsElement, getNameAsContainer, getNameAsAutoLayout } from "./get";
import { createSizingModifier } from "./createModifier";

figma.on('run', ({ command }: RunEvent) => {
  for (const node of figma.currentPage.selection) {
    const { type } = node;
    if (type !== 'SECTION' && type !== 'COMPONENT_SET' && type !== 'COMPONENT' && type !== 'FRAME') continue;

    for (const frame of getAllFrames(node)) {
      const { name, minWidth, maxWidth } = frame;
      const sizingModifier = createSizingModifier(minWidth, maxWidth);

      switch (command) {
        case 'resetAllNames': {
          frame.name = 'Frame';
          break;
        }
        case 'resetName': {
          frame.name = isReservedName(name) ? 'Frame' : name;
          break;
        }
        case 'setName': {
          if (!isReservedName(name)) break;
          frame.name = getNameAsElement(frame, sizingModifier) || getNameAsContainer(frame, sizingModifier) || getNameAsAutoLayout(frame) || 'Frame';
          break;
        }
        default: break;
      }
    }
  }
  figma.closePlugin('Renamed');
});
