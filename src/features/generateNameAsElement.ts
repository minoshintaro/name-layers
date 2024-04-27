import { LayerName, EMPTY } from "../settings";
import { isImageFill } from "../utils/isImageFill";

export function generateNameAsElement(node: FrameNode | RectangleNode, naming: LayerName): string | null {
  const aspectRatio = node.width / node.height;
  const space = naming.space === EMPTY ? null : naming.space;
  const image = naming.image === EMPTY ? null : naming.image;
  const line = naming.line === EMPTY ? null : naming.line;

  if (node.type === 'FRAME' && node.fills !== figma.mixed && node.children.length === 0) {
    if (node.fills.length === 0) return space;
    if (isImageFill(node.fills)) return image;
    if (aspectRatio > 10 || 1 / aspectRatio > 10) return line;
  }

  if (node.type === 'RECTANGLE' && node.fills !== figma.mixed) {
    if (node.fills.length === 0) return space;
    if (isImageFill(node.fills)) return image;
    if (aspectRatio > 10 || 1 / aspectRatio > 10) return line;
  }

  return null;
}
