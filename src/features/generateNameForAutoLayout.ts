import { LayerName } from "../settings";

export function generateNameForAutoLayout(node: FrameNode, naming: LayerName): string | null {
  if (node.layoutMode === 'VERTICAL') return naming.verticalLayout;
  if (node.layoutMode === 'HORIZONTAL') return node.layoutWrap === 'WRAP' ? naming.wrap : naming.horizontalLayout;
  return null;
}
