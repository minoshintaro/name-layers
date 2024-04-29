import { LayerName } from "../settings";

export function generateNameForModifier(node: SceneNode, naming: LayerName): string | null {
  const { minWidth, maxWidth } = node;

  if (naming.minWidth && naming.maxWidth && minWidth && maxWidth) return `${naming.minWidth}-${minWidth} ${naming.maxWidth}-${maxWidth}`;
  if (naming.minWidth && minWidth) return `${naming.minWidth}-${minWidth}`;
  if (naming.maxWidth && maxWidth) return `${naming.maxWidth}-${maxWidth}`;

  return null;
}
