import { findSamePropNodes } from "./find";
import { getChildFrames } from "./get";

export function createNameAsChild(node: FrameNode, option: string | null): string | null {
  const { parent, children } = node;

  if (parent && children) {
    const { type: parentType } = parent;

    // [1] wrapper (under root)
    if (parentType === 'PAGE' || parentType === 'SECTION') return 'wrapper';

    // [2] container (under component) | item (under flexbox)
    if ('layoutMode' in parent) {
      const { layoutMode: parentMode } = parent;
      const siblingFrames = getChildFrames(parent);

      const isContainer = (): boolean => findSamePropNodes(siblingFrames).length === 1;
      if (parentType === 'COMPONENT' && isContainer()) return option ? `container ${option}` : 'container';

      const isItem = (): boolean => {
        const unitFrames = findSamePropNodes(siblingFrames, parentMode);
        return unitFrames.length > 2 && unitFrames.length === siblingFrames.length;
      };
      if (parentMode !== 'NONE' && isItem()) return option ? `item ${option}` : 'item';
    }
  }

  return null;
}
