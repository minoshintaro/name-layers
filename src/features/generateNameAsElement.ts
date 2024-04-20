import { NAME } from "../settings";
import { isImageFill } from "./check";

export function generateNameAsElement(node: FrameNode | RectangleNode): string | null {
  if (node.type === 'FRAME' && node.fills !== figma.mixed && node.children.length === 0) {
    if (node.fills.length === 0) return NAME.space;
    if (isImageFill(node.fills)) return NAME.image;
  }

  if (node.type === 'RECTANGLE' && node.fills !== figma.mixed) {
    if (node.fills.length === 0) return NAME.space;
    if (isImageFill(node.fills)) return NAME.image;
  }

  return null;
}
