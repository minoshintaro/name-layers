import { LayerName, EMPTY } from "../settings";
import { isImageFill } from "../utils/check";

export function generateNameAsElement(node: FrameNode | RectangleNode, nameGroup: LayerName): string | null {
  const aspectRatio = node.width / node.height;
  const space = nameGroup.space === EMPTY ? null : nameGroup.space;
  const image = nameGroup.image === EMPTY ? null : nameGroup.image;
  const line = nameGroup.line === EMPTY ? null : nameGroup.line;

  if (node.type === 'FRAME' && node.fills !== figma.mixed && node.children.length === 0) {
    if (node.fills.length === 0) return space;
    if (isImageFill(node.fills)) return image;
    if (aspectRatio > 10 || 1/aspectRatio > 10) return line;
  }

  if (node.type === 'RECTANGLE' && node.fills !== figma.mixed) {
    if (node.fills.length === 0) return space;
    if (isImageFill(node.fills)) return image;
    if (aspectRatio > 10 || 1/aspectRatio > 10) return line;
  }

  return null;
}
