import { regexPatterns } from "./regexPatterns";

export function createComponentContainerName(siblingCount: number, modifier: string | null): string | null {
  return siblingCount === 1 ? `container ${modifier || ''}`.trim() : null;
}

export function createContainerName(selfMode: string, childrenCount: number, modifier: string | null): string | null {
  return (selfMode === 'VERTICAL' || (selfMode === 'HORIZONTAL' && childrenCount <= 2)) ? `container ${modifier || ''}`.trim() : null;
}

export function createItemName(parentMode: string, siblingCount: number, modifier: string | null): string | null {
  return parentMode === 'HORIZONTAL' && siblingCount >= 3 ? `item ${modifier || ''}`.trim() : null;
}

export function createAlignmentName(selfMode: string, primaryAxis: string, counterAxis: string, childrenCount: number): string | null {
  switch (selfMode) {
    case 'HORIZONTAL': {
      if (childrenCount <= 2) {
        switch (primaryAxis) {
          case 'CENTER': return 'center';
          case 'MAX': return 'right';
          case 'SPACE_BETWEEN': return 'evenly';
        }
      }
      break;
    }
    case 'VERTICAL': {
      if (childrenCount <= 1) {
        switch (counterAxis) {
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

export function createFlowName(selfMode: string, wrap: string): string | null {
  switch (selfMode) {
    case 'HORIZONTAL': return wrap === 'WRAP' ? 'wrap' : 'row';
    case 'VERTICAL': return 'column';
    default: return null;
  }
}
