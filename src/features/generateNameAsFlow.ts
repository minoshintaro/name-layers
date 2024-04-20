import { NAME } from "../settings";

export function generateNameAsFlow(node: FrameNode): string | null {
  if (node.children.length > 0) {
    if (node.layoutMode === 'HORIZONTAL') return node.layoutWrap === 'WRAP' ? NAME.wrap : NAME.row;
    if (node.layoutMode === 'VERTICAL') return NAME.col;
  }
  return null;
}
