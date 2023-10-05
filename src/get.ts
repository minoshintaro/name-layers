
export function getAllFrames(node: SceneNode): SceneNode[] {
  const subNodes = 'findAllWithCriteria' in node ? node.findAllWithCriteria({ types: ['FRAME'] }) : [];
  return node.type === 'FRAME' ? [node, ...subNodes] : subNodes;
}

export function getChildFrames(node: SceneNode): SceneNode[] {
  return 'findChildren' in node ? node.findChildren(child => child.type === 'FRAME') : [];
}
