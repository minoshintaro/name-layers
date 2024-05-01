import { LayerName } from "../settings";
import { isAutoLayout, isHorizontally } from "../utils/isAutoLayout";

export function generateNameForRow(node: FrameNode, naming: LayerName): string | null {
  if (
    node.layoutMode === 'HORIZONTAL' &&
    node.children.length > 0 &&
    node.children.every(isAutoLayout)
  ) {
    return naming.row;
  } else if (
    node.layoutMode !== 'NONE' &&
    node.parent &&
    isHorizontally(node.parent) &&
    node.parent.children.length > 0 &&
    node.parent.children.every(isAutoLayout)
  ) {
    return node.layoutMode === 'VERTICAL' ? naming.col : naming.row;
  }

  return null;
}
