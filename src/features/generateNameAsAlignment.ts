import { LayerName, SKIP } from "../settings";

export function generateNameAsAlignment(node: FrameNode, naming: LayerName): string | null {
  const col = naming.col === SKIP ? null : naming.col;
  const row = naming.row === SKIP ? null : naming.row;
  const wrap = naming.wrap === SKIP ? null : naming.wrap;

  if (node.layoutMode === 'HORIZONTAL') return node.layoutWrap === 'WRAP' ? wrap : row;
  if (node.layoutMode === 'VERTICAL') return col;

  return null;
}
