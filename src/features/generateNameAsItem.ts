import { LayerName, EMPTY } from "../settings";
import { isSameWidth } from "../utils/check";

export function generateNameAsItem(node: FrameNode, nameGroup: LayerName): string | null {
  const item = nameGroup.item === EMPTY ? null : nameGroup.item;

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
