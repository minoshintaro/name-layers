import { LayerName, EMPTY } from "../settings";

export function generateNameAsRoot(node: FrameNode, nameGroup: LayerName): string | null {
  const root = nameGroup.root === EMPTY ? null : nameGroup.root;

  if (
    // 子
    node.children.length > 0 &&
    // 自身
    // node.layoutMode !== 'NONE' &&
    // 親
    node.parent !== null &&
    (node.parent.type === 'PAGE' || node.parent.type === 'SECTION')
  ) {
   return root;
  }

  return null;
}
