import { TargetType } from "./typeSet.ts";

export function getFrames(node: TargetType): FrameNode[] {
  const subNodes: FrameNode[] = node.findAllWithCriteria({ types: ['FRAME'] });
  return node.type === 'FRAME' ? [node, ...subNodes] : subNodes;
}
