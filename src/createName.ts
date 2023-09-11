import { Name, LayoutMode, LayoutWrap, PrimaryAxisAlignItems, CounterAxisAlignItems } from "./type";
import { hasSimilarFrames } from "./boolean";

export function createNameAsComponentContainer(siblingCount: number, modifier: Name): Name {
  return siblingCount === 1 ? `container ${modifier || ''}`.trim() : null;
}

export function createNameAsContainer(selfMode: LayoutMode, childrenCount: number, modifier: Name): Name {
  return selfMode === 'VERTICAL' || (selfMode === 'HORIZONTAL' && childrenCount <= 2) ? `container ${modifier || ''}`.trim() : null;
}

export function createNameAsItem(siblings: SceneNode[], parentMode: LayoutMode, modifier: Name): Name {
  return hasSimilarFrames(siblings) && parentMode === 'HORIZONTAL' ? `item ${modifier || ''}`.trim() : null;
}

export function createNameAsSpace(fills: ReadonlyArray<Paint> | typeof figma.mixed): Name {
  return Array.isArray(fills) && !fills.length ? 'space' : null;
}

export function createNameAsAlignment(selfMode: LayoutMode, primary: PrimaryAxisAlignItems, counter: CounterAxisAlignItems, childrenCount: number): Name {
  const getAlignment = () => {
    if (selfMode === 'HORIZONTAL' && childrenCount <= 2) return primary;
    if (selfMode === 'VERTICAL' && childrenCount <= 1) return counter;
    return 'NONE';
  };
  switch (getAlignment()) {
    case 'CENTER': return 'center';
    case 'MAX': return 'right';
    case 'SPACE_BETWEEN': return 'evenly';
    default: return null;
  }
}

export function createNameAsFlow(selfMode: LayoutMode, wrap: LayoutWrap): Name {
  switch (selfMode) {
    case 'HORIZONTAL': return wrap === 'WRAP' ? 'wrap' : 'row';
    case 'VERTICAL': return 'column';
    default: return null;
  }
}
