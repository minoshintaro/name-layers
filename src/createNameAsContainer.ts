import { findAlignment } from "./find";

export function createNameAsContainer(node: FrameNode, option: string | null): string | null {
  const { children, layoutMode, layoutWrap, primaryAxisAlignItems, counterAxisAlignItems } = node;

  if (children) {
    // [1] container
    if (option) return option ? `container ${option}` : 'container';

    // [2] center | right | evenly
    switch (findAlignment({ selfMode: layoutMode, childrenCount: children.length, primaryAlignment: primaryAxisAlignItems, counterAlignment: counterAxisAlignItems })) {
      case 'CENTER': return 'center';
      case 'MAX': return 'right';
      case 'SPACE_BETWEEN': return 'justification';
      default: break;
    }

    // [3] column | row | wrap
    switch (layoutMode) {
      case 'VERTICAL': return 'column';
      case 'HORIZONTAL': return layoutWrap === 'WRAP' ? 'wrap' : 'row';
      default: break;
    }
  }

  return null;
}
