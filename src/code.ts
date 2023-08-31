import { TargetType } from "./typeSet.ts";
import { regexPatterns, isReservedName } from "./regexPatterns";
import { getFrames } from "./getFrames";
import { createSizingModifier } from "./createModifier";
import { createAlignmentName, createComponentContainerName, createContainerName, createFlowName, createItemName } from "./createName";

function setNameByConvention(node: TargetType, resetOnly: boolean = false): void {
  for (const frame of getFrames(node)) {
    if (!isReservedName(frame.name)) continue;

    // [1] Reset
    frame.name = 'Frame';
    if (resetOnly) continue;

    // [2] As a child element
    const { name, parent, children, fills, minWidth, maxWidth, layoutMode, layoutWrap, primaryAxisAlignItems, counterAxisAlignItems } = frame;
    const sizingModifier = createSizingModifier(minWidth, maxWidth);

    if (parent) {
      if ((parent.type === 'PAGE' || parent.type === 'SECTION') && children.length) {
        frame.name = 'wrapper';
      } else if (parent.type === 'COMPONENT') {
        frame.name = createComponentContainerName(parent.children.length, sizingModifier) || name;
      } else if (!children.length && !fills.length) {
        frame.name = 'space';
      } else if ('layoutMode' in parent) {
        frame.name = createItemName(parent.layoutMode, parent.children.length, sizingModifier) || name;
      }
    }

    if (frame.name !== name) continue;

    // [3] As a container
    if (sizingModifier) {
      frame.name = createContainerName(layoutMode, children.length, sizingModifier) || name;
    } else {
      frame.name = createAlignmentName(layoutMode, primaryAxisAlignItems, counterAxisAlignItems, children.length) || name;
    }

    // [4] Still the default name
    if (frame.name === 'Frame') {
      frame.name = createFlowName(layoutMode, layoutWrap) || name;
    }
  }
}

figma.on('run', ({ command }: RunEvent) => {
  for (const node of figma.currentPage.selection) {
    if (node.type !== 'SECTION' && node.type !== 'COMPONENT_SET' && node.type !== 'COMPONENT' && node.type !== 'FRAME') continue;

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
        getFrames(node).forEach(frame => frame.name = 'Frame');
        break;
      }
      default: break;
    }
  }
  figma.closePlugin('Renamed');
});
