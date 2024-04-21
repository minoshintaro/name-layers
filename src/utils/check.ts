export function isImageFill(props: ReadonlyArray<Paint>): boolean {
  return props.some(prop => prop.type === 'IMAGE');
}

export function isSameWidth(nodes: SceneNode[] | Readonly<SceneNode[]>): boolean {
  const target = Math.floor(nodes[0].width);
  return nodes.every(node => Math.floor(node.width) === target);
}

/** Auto layout */

export function isAutoLayout(node: BaseNode, callback: (target: FrameNode | ComponentNode | ComponentSetNode) => boolean): boolean {
  return (node.type === 'FRAME' || node.type === 'COMPONENT' || node.type === 'COMPONENT_SET') && callback(node);
}
export function isHorizontally(node: BaseNode): boolean {
  return isAutoLayout(node, (target) => target.layoutMode === 'HORIZONTAL');
}
export function isVertically(node: BaseNode): boolean {
  return isAutoLayout(node, (target) => target.layoutMode === 'VERTICAL');
}
export function isCenterAligned(node: BaseNode): boolean {
  return isAutoLayout(node, (target) => (
    (target.layoutMode === 'HORIZONTAL' && target.primaryAxisAlignItems === 'CENTER') ||
    (target.layoutMode === 'VERTICAL' && target.counterAxisAlignItems === 'CENTER')
  ));
}
