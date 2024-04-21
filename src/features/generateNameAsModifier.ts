import { NAME } from "../settings";

export function generateNameAsModifier(node: SceneNode): string | null {
  const { minWidth, maxWidth } = node;
  if (minWidth && maxWidth) return `min-${minWidth} max-${maxWidth}`;
  if (minWidth) return `min-${minWidth}`;
  if (maxWidth) return `max-${maxWidth}`;
  return null;
}
