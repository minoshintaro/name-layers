import { LayerName, EMPTY } from "../settings";

export function generateNameAsFlow(node: FrameNode, nameGroup: LayerName): string | null {
  const col = nameGroup.col === EMPTY ? null : nameGroup.col;
  const row = nameGroup.row === EMPTY ? null : nameGroup.row;
  const wrap = nameGroup.wrap === EMPTY ? null : nameGroup.wrap;

  if (node.children.length > 0) {
    if (node.layoutMode === 'HORIZONTAL') return node.layoutWrap === 'WRAP' ? wrap : row;
    if (node.layoutMode === 'VERTICAL') return col;
  }

  return null;
}
