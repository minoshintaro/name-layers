export function createNameAsElement(node: FrameNode): string | null {
  const { children, fills } = node;

  // [1] image | space
  if (!children.length && Array.isArray(fills)) {
    return fills.some(fill => fill.type === 'IMAGE') ? 'image' : 'space';
  }
  return null;
}
