import { LayerName, EMPTY } from "../settings";

export function generateNameAsModifier(node: SceneNode, nameGroup: LayerName): string | null {
  const { minWidth, maxWidth } = node;
  const min = nameGroup.minWidth === EMPTY ? null : nameGroup.minWidth;
  const max = nameGroup.maxWidth === EMPTY ? null : nameGroup.maxWidth;

  if (min && max && minWidth && maxWidth) return `${min}-${minWidth} ${max}-${maxWidth}`;
  if (min && minWidth) return `${min}-${minWidth}`;
  if (max && maxWidth) return `${max}-${maxWidth}`;
  return null;
}
