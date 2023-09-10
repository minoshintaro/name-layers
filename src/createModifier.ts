import { Name, Size } from "./type";

export function createSizingModifier(minWidth: Size, maxWidth: Size): Name {
  if (minWidth && maxWidth) return `minmax-${minWidth}-${maxWidth}`;
  if (minWidth) return `min-${minWidth}`;
  if (maxWidth) return `max-${maxWidth}`;
  return null;
}
