import { isImageFill, isSameWidth } from "./check";

export function generateNameAsElement(node: FrameNode): string | null {
  if (
    node.children.length === 0 &&
    node.layoutMode === 'NONE' &&
    node.fills !== figma.mixed
  ) {
    if (node.fills.length === 0) return 'space';
    if (isImageFill(node.fills)) return 'image';
  }
  return null;
}

export function generateNameAsItem(node: FrameNode): string | null {
  if (
    node.children.length > 0 &&
    node.parent !== null &&
    (node.parent.type === 'FRAME' || node.parent.type === 'COMPONENT') &&
    node.parent.layoutMode !== 'HORIZONTAL' &&
    node.parent.children.length > 2 &&
    isSameWidth(node.parent.children)
  ) {
    return 'item';
  }
  return null;
}

export function generateNameAsWrapper(node: FrameNode): string | null {
  if (
    node.children.length > 0 &&
    node.parent !== null &&
    node.layoutMode !== 'NONE'
  ) {
    if (node.parent.type === 'PAGE' || node.parent.type === 'SECTION') return 'wrapper';
    if (node.maxWidth !== null) return `container max-w-${node.maxWidth}`;
  }
  return null;
}

export function generateNameAsAlignment(node: FrameNode): string | null {
  if (node.children.length === 0) return null;
  if (node.layoutMode === 'HORIZONTAL') {
    switch (node.primaryAxisAlignItems) {
      case 'CENTER':
        return 'center';
      case 'MAX':
        return 'right';
      case 'SPACE_BETWEEN':
        return 'justification';
      default:
        return null;
    }
  } else if (node.layoutMode === 'VERTICAL') {
    switch (node.counterAxisAlignItems) {
      case 'CENTER':
        return 'center';
      case 'MAX':
        return 'right';
      default:
        return null;
    }
  }
  return null;
}

export function generateNameAsFlex(node: FrameNode): string | null {
  switch (node.layoutMode) {
    case 'HORIZONTAL':
      return node.layoutWrap === 'WRAP' ? 'wrap' : 'row';
    case 'VERTICAL':
      return 'col';
    default:
      return null;
  }
}
