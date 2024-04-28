import { LayerName, SKIP } from "../settings";
import { isSameWidth } from "../utils/isSameWidth";

export function generateNameAsItem(node: FrameNode, naming: LayerName): string | null {
  const item = naming.item === SKIP ? null : naming.item;

  if (
    node.children.length > 0 &&
    node.parent !== null &&
    (node.parent.type === 'FRAME' || node.parent.type === 'COMPONENT' || node.parent.type === 'COMPONENT_SET') &&
    node.parent.layoutMode === 'HORIZONTAL' &&
    node.parent.children.length > 2 &&
    isSameWidth(node.parent.children)
  ) {
    return item;
  }
  return null;
}
