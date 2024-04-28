import { LayerName, SKIP } from "../settings";
import { isCenterAligned } from "../utils/isAutoLayout";
import { hasContainerAncestor } from "../utils/hasAncestor";

export function generateNameAsContainer(node: FrameNode, naming: LayerName): string | null {
  if (
    naming.container !== SKIP &&
    // 自身
    node.layoutMode !== 'NONE' &&
    node.maxWidth !== null &&
    // 親
    node.parent !== null &&
    isCenterAligned(node.parent) &&
    // 先祖
    !hasContainerAncestor(node)
  ) {
    return naming.container;
  }
  return null;
}
