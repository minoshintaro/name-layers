import { isCenterAligned } from "./isAutoLayout";

type Callback = (target: SceneNode) => boolean;

export function hasAncestor(node: SceneNode, type: 'instance' | 'container'): boolean {
  const findNodeInTree = (target: SceneNode, callback: Callback): boolean => {
    let current = target.parent;
    while (current !== null && 'visible' in current) {
      if (callback(current)) return true;
      current = current.parent;
    }
    return false;
  }

  switch (type) {
    case 'instance':
      return findNodeInTree(node, (target: SceneNode): boolean => target.type === 'INSTANCE');
    case 'container':
      return findNodeInTree(node, (target: SceneNode): boolean => (
        target.type === 'FRAME' && target.layoutMode !== 'NONE' && target.maxWidth !== null &&
        target.parent !== null && (target.parent.type === 'FRAME' || target.parent.type === 'COMPONENT') && isCenterAligned(target.parent)
      ));
    default:
      return false;
  }
}
