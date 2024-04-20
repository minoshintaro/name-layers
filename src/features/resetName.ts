import { DEFAULT } from "../settings";

export function resetName(node: FrameNode | RectangleNode): string | null {
  if (node.type === 'FRAME') return DEFAULT.frame;
  if (node.type === 'RECTANGLE') return DEFAULT.rectangle;
  return null;
}
