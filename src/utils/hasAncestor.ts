import { isCenterAligned } from "./check";

function hasAncestor(node: SceneNode, callback: (ancestor: SceneNode) => boolean): boolean {
  let current = node.parent;
  while (current && 'visible' in current) {
    if (callback(current)) return true;
    current = current.parent;
  }
  return false;
}

export function hasInstanceAncestor(node: SceneNode): boolean {
  return hasAncestor(node, (ancestor) => (
    ancestor.type === 'INSTANCE'
  ));
}

export function hasContainerAncestor(node: SceneNode): boolean {
  return hasAncestor(node, (ancestor) => (
    // 自身
    ancestor.type === 'FRAME' &&
    ancestor.layoutMode !== 'NONE' &&
    ancestor.maxWidth !== null &&
    // 親
    ancestor.parent !== null &&
    isCenterAligned(ancestor.parent)
  ));
}
