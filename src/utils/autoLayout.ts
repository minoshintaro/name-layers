import { isSameWidth } from "./isTrue";

type Condition = (parent: FrameNode | ComponentNode) => boolean;

export function isCenterAligned(node: FrameNode | ComponentNode): boolean {
  return (
    (node.layoutMode === 'HORIZONTAL' && node.primaryAxisAlignItems === 'CENTER') ||
    (node.layoutMode === 'VERTICAL' && node.counterAxisAlignItems === 'CENTER')
  );
}

export function isFlexContainer(node: FrameNode | ComponentNode): boolean {
  return (
    node.layoutMode === 'HORIZONTAL' &&
    node.children.length > 0 &&
    node.children.every(child => child.type === 'FRAME' && child.layoutMode !== 'NONE')
  );
}

export function isGridContainer(node: FrameNode | ComponentNode): boolean {
  return (
    node.layoutMode === 'HORIZONTAL' &&
    node.children.length > 2 &&
    isSameWidth(node.children)
  );
}

function hasParentWithCondition(node: FrameNode, condition: Condition): boolean {
  return (
    node.parent !== null &&
    (node.parent.type === 'FRAME' || node.parent.type === 'COMPONENT') &&
    condition(node.parent)
  );
}

export function hasContainerAlignedCenter(node: FrameNode): boolean {
  return hasParentWithCondition(node, isCenterAligned);
}


export function hasFlexContainer(node: FrameNode): boolean {
  return hasParentWithCondition(node, isFlexContainer);
}

export function hasGridContainer(node: FrameNode): boolean {
  return hasParentWithCondition(node, isGridContainer);
}
