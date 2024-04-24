import { LayerName, EMPTY } from "../settings";
import { isCenterAligned } from "../utils/isAutoLayout";
import { hasContainerAncestor } from "../utils/hasAncestor";

export function generateNameAsContainer(node: FrameNode, nameGroup: LayerName): string | null {
  const container = nameGroup.container === EMPTY ? null : nameGroup.container;

  if (
    // 子
    node.children.length > 0 &&
    // 自身
    node.layoutMode !== 'NONE' &&
    node.maxWidth !== null &&
    // 親
    node.parent !== null &&
    isCenterAligned(node.parent) &&
    // 先祖
    !hasContainerAncestor(node)
  ) {
    // return `${NAME.container} ${NAME.maxWidth}-${node.maxWidth}`;
    return container;
  }
  return null;
}
