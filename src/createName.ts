import { hasSimilarFrames } from "./boolean";
import { Name, LayoutMode, LayoutWrap, PrimaryAxisAlignItems, CounterAxisAlignItems } from "./type";

export function createComponentContainerName(siblingCount: number, modifier: Name): Name {
  return siblingCount === 1 ? `container ${modifier || ''}`.trim() : null;
}

export function createContainerName(selfMode: LayoutMode, childrenCount: number, modifier: Name): Name {
  return (selfMode === 'VERTICAL' || (selfMode === 'HORIZONTAL' && childrenCount <= 2)) ? `container ${modifier || ''}`.trim() : null;
}

export function createItemName(siblings: SceneNode[], parentMode: LayoutMode, modifier: Name): Name {
  return hasSimilarFrames(siblings) && parentMode === 'HORIZONTAL' ? `item ${modifier || ''}`.trim() : null;
}

export function createSpaceName(fills: ReadonlyArray<Paint> | typeof figma.mixed): Name {
  return Array.isArray(fills) && !fills.length ? 'space' : null;
}

export function createAlignmentName(selfMode: LayoutMode, primary: PrimaryAxisAlignItems, counter: CounterAxisAlignItems, childrenCount: number): Name {
  switch (selfMode) {
    case 'HORIZONTAL': {
      if (childrenCount <= 2) {
        switch (primary) {
          case 'CENTER': return 'center';
          case 'MAX': return 'right';
          case 'SPACE_BETWEEN': return 'evenly';
        }
      }
      break;
    }
    case 'VERTICAL': {
      if (childrenCount <= 1) {
        switch (counter) {
          case 'CENTER': return 'center';
          case 'MAX': return 'right';
        }
      }
      break;
    }
    default: break;
  }
  return null;
}

export function createFlowName(selfMode: LayoutMode, wrap: LayoutWrap): Name {
  switch (selfMode) {
    case 'HORIZONTAL': return wrap === 'WRAP' ? 'wrap' : 'row';
    case 'VERTICAL': return 'column';
    default: return null;
  }
}
