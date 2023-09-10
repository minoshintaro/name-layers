import { regexPatterns } from "./regex";

export function isReservedName(name: string): boolean {
  return regexPatterns.frameName.test(name) || regexPatterns.conventionalName.test(name);
}

export function hasSimilarFrames(nodes: SceneNode[]): boolean {
  if (nodes.length < 3) return false;
  for (const node of nodes) {
    if (node.type !== 'FRAME' || node.layoutPositioning !== 'AUTO' || node.children.length === 0) return false;
  }
  return true;
}
