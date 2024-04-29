import { LayerName } from "../settings";
import { isCenterAligned } from "../utils/isAutoLayout";

export function generateNameForAlignment(node: FrameNode, naming: LayerName): string | null {
  if (
    node.children.length > 0 &&
    node.layoutMode !== 'NONE' &&
    isCenterAligned(node)
  ) {
    return naming.center;
  }

  return null;
}
