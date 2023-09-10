import { TargetNode } from "./type";
import { isReservedName } from "./boolean";
import { getAllFrames, getChildFrames } from "./get";
import { createSizingModifier } from "./createModifier";
import { createAlignmentName, createComponentContainerName, createContainerName, createFlowName, createItemName, createSpaceName } from "./createName";

function setNameByConvention(node: TargetNode, resetOnly: boolean = false): void {
  for (const frame of getAllFrames(node)) {
    // [0] Skip the uniqe name
    if (!isReservedName(frame.name)) continue;

    // [1] Reset
    frame.name = 'Frame';
    if (resetOnly) continue;

    // [2] Rename
    const { name, parent, children, fills, minWidth, maxWidth, layoutMode, layoutWrap, primaryAxisAlignItems, counterAxisAlignItems } = frame;
    const sizingModifier = createSizingModifier(minWidth, maxWidth);

    // [2-1] As a child element
    if (parent) {
      if (parent.type === 'PAGE' || parent.type === 'SECTION') {
        frame.name = children.length > 0 ? 'wrapper' : name;
      } else if (parent.type === 'COMPONENT') {
        frame.name = createComponentContainerName(parent.children.length, sizingModifier) || name;
      } else if ('layoutMode' in parent) {
        if (!children.length) {
          frame.name = createSpaceName(fills) || name;
        } else {
          frame.name = createItemName(getChildFrames(parent), parent.layoutMode, sizingModifier) || name;
        }
      }
    }

    if (frame.name !== name) continue;

    // [2-2] As a container
    if (sizingModifier) {
      frame.name = createContainerName(layoutMode, children.length, sizingModifier) || name;
    } else {
      frame.name = createAlignmentName(layoutMode, primaryAxisAlignItems, counterAxisAlignItems, children.length) || name;
    }

    // [3] Still the default name
    if (frame.name === 'Frame') {
      frame.name = createFlowName(layoutMode, layoutWrap) || name;
    }
  }
}

figma.on('run', ({ command }: RunEvent) => {
  for (const node of figma.currentPage.selection) {
    const { type } = node;
    if (type !== 'SECTION' && type !== 'COMPONENT_SET' && type !== 'COMPONENT' && type !== 'FRAME') continue;

    switch (command) {
      case 'setName': {
        setNameByConvention(node);
        break;
      }
      case 'resetName': {
        setNameByConvention(node, true);
        break;
      }
      case 'resetAllNames': {
        getAllFrames(node).forEach(frame => frame.name = 'Frame');
        break;
      }
      default: break;
    }
  }
  figma.closePlugin('Renamed');
});
