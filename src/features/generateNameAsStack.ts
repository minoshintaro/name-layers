import { LayerName, SKIP } from "../settings";
import { isHorizontally } from "../utils/isAutoLayout";

export function generateNameAsStack(node: FrameNode, naming: LayerName): string | null {
  if (
    naming.stack !== SKIP &&
    // 自身
    node.layoutMode === 'VERTICAL' &&
    // 親
    node.parent !== null &&
    !isHorizontally(node.parent)
    // (node.parent.type === 'FRAME' || node.parent.type === 'COMPONENT' || node.parent.type === 'COMPONENT_SET') &&
    // node.parent.layoutMode !== 'HORIZONTAL'
  ) {
    return naming.stack;
  }
  return null;
}
