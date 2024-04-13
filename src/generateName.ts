import { isReservedName } from "./boolean";
import { createSizingModifier } from "./createModifier";
import { createNameAsElement } from "./createNameAsElement";
import { createNameAsChild } from "./createNameAsChild";
import { createNameAsContainer } from "./createNameAsContainer";

export function generateName(node: FrameNode, command: string): string {
  const { name, minWidth, maxWidth } = node;
  const modifier: string | null = createSizingModifier(minWidth, maxWidth);
  switch (command) {
    case 'RESET_ALL_NAMES': return 'Frame';
    case 'RESET_NAME': return isReservedName(name) ? 'Frame' : name;
    case 'SET_NAME': return isReservedName(name) ? createNameAsElement(node) || createNameAsChild(node, modifier) || createNameAsContainer(node, modifier) || 'Frame' : name;
    default: return name;
  }
}
