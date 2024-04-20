// Is

export function isReservedName(input: string): boolean {
  const patterns = [
    /^Frame( \d{1,9})?$/,
    /^(wrapper|container|column|row|wrap|center|right|justification|item|space|image)\b/
  ];

  return patterns.some(pattern => pattern.test(input));
}

export function isImageFill(props: ReadonlyArray<Paint>): boolean {
  return props.some(prop => prop.type === 'IMAGE');
}

export function isSameWidth(nodes: SceneNode[] | Readonly<SceneNode[]>): boolean {
  const target = Math.floor(nodes[0].width);
  return nodes.every(node => Math.floor(node.width) === target);
}

export function isCenterAligned(node: BaseNode): boolean {
  if (node.type === 'FRAME' || node.type === 'COMPONENT' || node.type === 'COMPONENT_SET') {
    return (
      (node.layoutMode === 'HORIZONTAL' && node.primaryAxisAlignItems === 'CENTER') ||
      (node.layoutMode === 'VERTICAL' && node.counterAxisAlignItems === 'CENTER')
    );
  }
  return false
}


export function isAutoLayout(node: BaseNode, callback: (target: FrameNode | ComponentNode | ComponentSetNode) => boolean): boolean {
  return (node.type === 'FRAME' || node.type === 'COMPONENT' || node.type === 'COMPONENT_SET') && callback(node);
}
export function isHorizontally(node: BaseNode): boolean {
  return isAutoLayout(node, (target) => target.layoutMode === 'HORIZONTAL');
}
export function isVertically(node: BaseNode): boolean {
  return isAutoLayout(node, (target) => target.layoutMode === 'VERTICAL');
}


// Has
// hasChildrenTypes: ['BOOLEAN_OPERATION', 'INSTANCE', 'COMPONENT', 'COMPONENT_SET', 'FRAME', 'GROUP', 'SECTION', 'PAGE'];

function hasAncestor(node: SceneNode, callback: (ancestor: SceneNode) => boolean): boolean {
  let current = node.parent;
  while (current && 'visible' in current) {
    if (callback(current)) return true;
    current = current.parent;
  }
  return false;
}
export function hasInstanceAncestor(node: SceneNode): boolean {
  return hasAncestor(node, (ancestor) => ancestor.type === 'INSTANCE');
}
export function hasContainerAncestor(node: SceneNode): boolean {
  return hasAncestor(node, (ancestor) => (
    // 自身
    ancestor.type === 'FRAME' &&
    ancestor.layoutMode !== 'NONE' &&
    ancestor.maxWidth !== null &&
    // 親
    ancestor.parent !== null &&
    isCenterAligned(ancestor.parent)
  ));
}
