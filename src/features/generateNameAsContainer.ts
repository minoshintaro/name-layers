import { LayerName, EMPTY } from "../settings";
import { isCenterAligned } from "../utils/isAutoLayout";
import { hasContainerAncestor } from "../utils/hasAncestor";

export function generateNameAsContainer(node: FrameNode, naming: LayerName): string | null {
  const container = naming.container === EMPTY ? null : naming.container;

  if (
    // 自身
    node.layoutMode !== 'NONE' &&
    node.maxWidth !== null &&
    // 親
    node.parent !== null &&
    isCenterAligned(node.parent) &&
    // 先祖
    !hasContainerAncestor(node)
  ) {
    return container;
  }
  return null;
}
