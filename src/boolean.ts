const regexPatterns = {
  frameName: /^Frame(?: [0-9]{1,9})?$/,
  conventionalName: /^(wrapper|container|item|column|row|wrap|center|right|evenly|space|image)\b/
}

export function isReservedName(name: string): boolean {
  const { frameName, conventionalName } = regexPatterns;
  return frameName.test(name) || conventionalName.test(name);
}

export function hasSimilarFrames(nodes: SceneNode[]): boolean {
  return nodes.length > 2 && nodes.every(node => node.type === 'FRAME' && node.layoutPositioning === 'AUTO' && node.children.length);
}
