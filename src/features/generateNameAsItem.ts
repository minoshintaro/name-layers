import { NAME } from "../settings";
import { isSameWidth } from "../utils/check";

export function generateNameAsItem(node: FrameNode): string | null {
  if (
    node.children.length > 0 &&
    node.parent !== null &&
    (node.parent.type === 'FRAME' || node.parent.type === 'COMPONENT' || node.parent.type === 'COMPONENT_SET') &&
    node.parent.layoutMode === 'HORIZONTAL' &&
    node.parent.children.length > 2 &&
    isSameWidth(node.parent.children)
  ) {
    return NAME.item;
  }
  return null;
}
