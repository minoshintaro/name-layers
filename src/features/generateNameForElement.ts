import { LayerName } from "../settings";
import { isImageFill } from "../utils/isImageFill";

export function generateNameForElement(node: FrameNode | RectangleNode, naming: LayerName): string | null {
  const aspectRatio = node.width / node.height;

  if (node.type === 'FRAME' && node.fills !== figma.mixed && node.children.length === 0) {
    if (node.fills.length === 0) return naming.space;
    if (isImageFill(node.fills)) return naming.image;
    if (aspectRatio > 10 || 1 / aspectRatio > 10) return naming.line;
  }

  if (node.type === 'RECTANGLE' && node.fills !== figma.mixed) {
    if (node.fills.length === 0) return naming.space;
    if (isImageFill(node.fills)) return naming.image;
    if (aspectRatio > 10 || 1 / aspectRatio > 10) return naming.line;
  }

  return null;
}
