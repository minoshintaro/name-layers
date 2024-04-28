import { LayerName, SKIP } from "../settings";

export function generateNameAsModifier(node: SceneNode, naming: LayerName): string | null {
  const { minWidth, maxWidth } = node;
  const min = naming.minWidth === SKIP ? null : naming.minWidth;
  const max = naming.maxWidth === SKIP ? null : naming.maxWidth;

  if (min && max && minWidth && maxWidth) return `${min}-${minWidth} ${max}-${maxWidth}`;
  if (min && minWidth) return `${min}-${minWidth}`;
  if (max && maxWidth) return `${max}-${maxWidth}`;
  return null;
}
