import { createAlignmentName, createComponentContainerName, createContainerName, createFlowName, createItemName } from "./createName";
import { createSizingModifier } from "./createModifier";
import { getFrames } from "./getFrames";
import { regexPatterns, isReservedName } from "./regexPatterns";

for (const node of figma.currentPage.selection) {
  if (node.type !== 'SECTION' && node.type !== 'COMPONENT_SET' && node.type !== 'COMPONENT' && node.type !== 'FRAME') continue;

  for (const frame of getFrames(node)) {

    // [0] Reset
    if (isReservedName(frame.name)) {
      frame.name = 'Frame';
    } else {
      continue;
    }

    const { name, parent, children, fills, minWidth, maxWidth, layoutMode, layoutWrap, primaryAxisAlignItems, counterAxisAlignItems } = frame;
    const sizingModifier = createSizingModifier(minWidth, maxWidth);

    // [1] As a child element
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

    // [2] As a container

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

figma.closePlugin('Renamed');
