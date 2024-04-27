import { LayerName, EMPTY } from "../settings";

export function generateNameAsStack(node: FrameNode, naming: LayerName): string | null {
  const stack = naming.stack === EMPTY ? null : naming.stack;

  if (
    // 自身
    node.layoutMode === 'VERTICAL' &&
    // 親
    node.parent !== null &&
    (node.parent.type === 'FRAME' || node.parent.type === 'COMPONENT' || node.parent.type === 'COMPONENT_SET') &&
    node.parent.layoutMode !== 'HORIZONTAL'
  ) {
    return stack;
  }

  return null;
}
