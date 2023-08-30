import { regexPatterns } from "./regexPatterns";

export function createWrapperName(currentName: string): string {
  return regexPatterns.frameName.test(currentName) ? 'wrapper' : currentName;
}

export function createComponentContainerName(currentName: string, siblingCount: number, modifier: string | null): string {
  return siblingCount === 1 ? `container ${modifier || ''}`.trim() : currentName;
}

export function createContainerName(currentName: string, selfMode: string, childrenCount: number, modifier: string | null): string {
  return (selfMode === 'VERTICAL' || (selfMode === 'HORIZONTAL' && childrenCount <= 2)) ? `container ${modifier || ''}`.trim() : currentName;
}

export function createItemName(currentName: string, parentMode: string, siblingCount: number, modifier: string | null): string {
  return parentMode === 'HORIZONTAL' && siblingCount >= 3 ? `item ${modifier || ''}`.trim() : currentName;
}

export function createAlignmentName(currentName: string, selfMode: string, primaryAxis: string, counterAxis: string, childrenCount: number): string {
  switch (selfMode) {
    case 'HORIZONTAL': {
      if (childrenCount <= 2) {
        switch (primaryAxis) {
          case 'CENTER': return 'center';
          case 'MAX': return 'right';
          case 'SPACE_BETWEEN': return 'distribution';
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
  return currentName;
}

export function createFlowName(currentName: string, selfMode: string, wrap: string): string {
  switch (selfMode) {
    case 'HORIZONTAL': return wrap === 'WRAP' ? 'wrap' : 'row';
    case 'VERTICAL': return 'column';
    default: return currentName;
  }
}
