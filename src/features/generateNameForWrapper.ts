import { LayerName } from "../settings";
import { isCenterAligned } from "../utils/isAutoLayout";
import { hasContainerAncestor } from "../utils/hasAncestor";

export function generateNameForWrapper(node: FrameNode, naming: LayerName): string | null {
  if (
    node.parent &&
    (node.parent.type === 'PAGE' || node.parent.type === 'SECTION')
  ) {
    return naming.root;
  } else if (
    node.maxWidth &&
    node.layoutMode !== 'NONE' &&
    node.parent &&
    isCenterAligned(node.parent) &&
    !hasContainerAncestor(node)
  ) {
    return naming.container;
  }

  return null;
}
