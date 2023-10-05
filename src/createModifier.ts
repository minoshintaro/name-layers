import { Size } from "./type";

export function createSizingModifier(minWidth: Size, maxWidth: Size): string | null {
  if (minWidth && maxWidth) return `minmax-${minWidth}-${maxWidth}`;
  if (minWidth) return `min-${minWidth}`;
  if (maxWidth) return `max-${maxWidth}`;
  return null;
}
