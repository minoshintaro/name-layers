import { LayerName, EMPTY } from "../settings";

export function generateNameAsFlow(node: FrameNode, naming: LayerName): string | null {
  const col = naming.col === EMPTY ? null : naming.col;
  const row = naming.row === EMPTY ? null : naming.row;
  const wrap = naming.wrap === EMPTY ? null : naming.wrap;

  if (node.layoutMode === 'HORIZONTAL') return node.layoutWrap === 'WRAP' ? wrap : row;
  if (node.layoutMode === 'VERTICAL') return col;

  return null;
}
