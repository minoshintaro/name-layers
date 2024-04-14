export function hasInstanceAncestor(node: SceneNode): boolean {
  let currentNode = node.parent;

  while (currentNode) {
    if (currentNode.type === 'INSTANCE') return true;
    if (currentNode.type === 'SECTION' || currentNode.type === 'PAGE') return false;
    currentNode = currentNode.parent;
  }

  return false;
}

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
  return nodes.every(node => node.width === nodes[0].width);
}
