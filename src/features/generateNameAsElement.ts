import { NAME } from "../settings";
import { isImageFill } from "../utils/check";

export function generateNameAsElement(node: FrameNode | RectangleNode): string | null {
  const aspectRatio = node.width / node.height;

  if (node.type === 'FRAME' && node.fills !== figma.mixed && node.children.length === 0) {
    if (node.fills.length === 0) return NAME.space;
    if (isImageFill(node.fills)) return NAME.image;
    if (aspectRatio > 10 || 1/aspectRatio > 10) return NAME.line;
  }

  if (node.type === 'RECTANGLE' && node.fills !== figma.mixed) {
    if (node.fills.length === 0) return NAME.space;
    if (isImageFill(node.fills)) return NAME.image;
    if (aspectRatio > 10 || 1/aspectRatio > 10) return NAME.line;
  }

  return null;
}
