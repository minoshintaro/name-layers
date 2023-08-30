import { createAlignmentName, createComponentContainerName, createContainerName, createFlowName, createItemName, createWrapperName } from "./createName";
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

    const { name, parent, children, minWidth, maxWidth, layoutMode, layoutWrap, primaryAxisAlignItems, counterAxisAlignItems } = frame;
    const sizingModifier = createSizingModifier(minWidth, maxWidth);

    // [1] As a child element
    if (parent) {
      if (parent.type === 'PAGE' || parent.type === 'SECTION') {
        frame.name = createWrapperName(name);
      } else if (parent.type === 'COMPONENT') {
        frame.name = createComponentContainerName(name, parent.children.length, sizingModifier);
      } else if ('layoutMode' in parent) {
        frame.name = createItemName(name, parent.layoutMode, parent.children.length, sizingModifier);
      }
    }

    if (frame.name !== name) continue;

    // [2] As a container

    if (sizingModifier) {
      frame.name = createContainerName(name, layoutMode, children.length, sizingModifier);
    } else {
      frame.name = createAlignmentName(name, layoutMode, primaryAxisAlignItems, counterAxisAlignItems, children.length);
    }

    // [3] Still the default name

    if (frame.name === 'Frame') {
      frame.name = createFlowName(name, layoutMode, layoutWrap);
    }
  }
}

figma.closePlugin('Renamed');