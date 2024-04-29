import { LayerName } from "../settings";
import { isSameWidth } from "../utils/isSameWidth";

export function generateNameForGrid(node: FrameNode, naming: LayerName): string | null {
  if (
    node.layoutMode === 'HORIZONTAL' &&
    node.children.length > 2 &&
    isSameWidth(node.children)
  ) {
    return naming.grid;
  } else if (
    node.parent &&
    (node.parent.type === 'FRAME' || node.parent.type === 'COMPONENT') &&
    node.parent.layoutMode === 'HORIZONTAL' &&
    node.parent.children.length > 2 &&
    isSameWidth(node.parent.children)
  ) {
    return naming.cell;
  }

  return null;
}
