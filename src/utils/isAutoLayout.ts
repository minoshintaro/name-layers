export function isCenterAligned(node: FrameNode | ComponentNode): boolean {
  return (
    (node.layoutMode === 'HORIZONTAL' && node.primaryAxisAlignItems === 'CENTER') ||
    (node.layoutMode === 'VERTICAL' && node.counterAxisAlignItems === 'CENTER')
  );
}
