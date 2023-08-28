import { createAlignmentName, createComponentContainerName, createContainerName, createFlowName, createItemName, createWrapperName } from "./createName";
import { createSizingModifier } from "./createModifier";
import { getFrames } from "./getFrames";
import { regexPatterns } from "./regexPatterns";

for (const node of figma.currentPage.selection) {
  if (node.type !== 'SECTION' && node.type !== 'COMPONENT_SET' && node.type !== 'COMPONENT' && node.type !== 'FRAME') continue;

  for (const frame of getFrames(node)) {
    const { name, parent, children, minWidth, maxWidth, layoutMode, layoutWrap, primaryAxisAlignItems, counterAxisAlignItems } = frame;
    const sizingModifier = createSizingModifier(minWidth, maxWidth);

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

    if (sizingModifier) {
      frame.name = createContainerName(name, layoutMode, children.length, sizingModifier);
      continue;
    }

    const alignment = createAlignmentName(name, layoutMode, primaryAxisAlignItems, counterAxisAlignItems, children.length);
    if (alignment !== name) {
      frame.name = alignment;
      continue;
    }

    const direction = createFlowName(name, layoutMode, layoutWrap);
    if (direction !== name) {
      frame.name = direction;
      continue;
    }

    if (regexPatterns.frame.test(name)) {
      frame.name = 'Frame';
    }
  }
}

figma.closePlugin('Renamed');
