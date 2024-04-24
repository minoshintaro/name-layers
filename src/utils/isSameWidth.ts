export function isSameWidth(nodes: SceneNode[] | Readonly<SceneNode[]>): boolean {
  const target = Math.floor(nodes[0].width);
  return nodes.every(node => Math.floor(node.width) === target);
}
