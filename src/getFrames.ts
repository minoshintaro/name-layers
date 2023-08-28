type TargetNode = SectionNode | ComponentSetNode | ComponentNode | FrameNode;

export function getFrames(node: TargetNode): FrameNode[] {
  const subNodes: FrameNode[] = node.findAllWithCriteria({ types: ['FRAME'] });
  return node.type === 'FRAME' ? [node, ...subNodes] : subNodes;
}
