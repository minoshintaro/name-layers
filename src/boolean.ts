import { regexPatterns } from "./regex";

export function isReservedName(name: string): boolean {
  return regexPatterns.frameName.test(name) || regexPatterns.conventionalName.test(name);
}

export function hasSimilarFrames(nodes: SceneNode[]): boolean {
  if (nodes.length > 2) return nodes.every(node => node.type === 'FRAME' && node.layoutPositioning === 'AUTO' && node.children.length);
  return false;
}
