import { NAME } from "../settings";
import { isCenterAligned, hasContainerAncestor } from "./check";

export function generateNameAsContainer(node: FrameNode): string | null {
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
    console.log('test: generateNameAsContainer =>', 1);
    return `${NAME.container} ${NAME.maxWidth}-${node.maxWidth}`;
    // return NAME.container;
  }
  return null;
}
