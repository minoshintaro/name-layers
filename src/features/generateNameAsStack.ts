import { NAME } from "../settings";

export function generateNameAsStack(node: FrameNode): string | null {
  if (
    // 子
    node.children.length > 1 &&
    // 自身
    node.layoutMode === 'VERTICAL' &&
    // 親
    node.parent !== null &&
    (node.parent.type === 'FRAME' || node.parent.type === 'COMPONENT' || node.parent.type === 'COMPONENT_SET') &&
    node.parent.layoutMode === 'VERTICAL'
  ) {
    return NAME.stack
  }
  return null;
}
