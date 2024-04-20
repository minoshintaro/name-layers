import { NAME } from "../settings";

export function generateNameAsFlow(node: FrameNode): string | null {
  if (node.children.length === 0) return null;

  switch (node.layoutMode) {
    case 'HORIZONTAL':
      return node.layoutWrap === 'WRAP' ? NAME.wrap : NAME.row;
    case 'VERTICAL':
      return NAME.col;
    default:
      return null;
  }
}
