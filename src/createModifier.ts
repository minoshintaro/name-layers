export function createSizingModifier(minWidth: number | null, maxWidth: number | null): string | null {
  if (minWidth && maxWidth) return `minmax-${minWidth}-${maxWidth}`;
  if (minWidth) return `min-${minWidth}`;
  if (maxWidth) return `max-${maxWidth}`;
  return null;
}
