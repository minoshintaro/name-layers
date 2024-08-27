import { Naming, NamingConvention } from "../settings";
import { setNameWithModifier } from "./setNameWithModifier";

export function generateName(node: SceneNode, naming: Naming, convention: NamingConvention): string | null {
  if (node.type === 'FRAME' && node.parent) {
    const modifier = { node, naming };

    // Root wrapper
    if ('root' in naming && convention['root'].condition(node)) return setNameWithModifier(naming.root, modifier);

    // Elements
    if (node.children.length === 0) {
      if ('space' in naming && convention['space'].condition(node)) return naming.space;
      if ('image' in naming && convention['image'].condition(node)) return naming.image;
      if ('line' in naming && convention['line'].condition(node)) return naming.line;
    }

    // Under wrapper
    if (node.parent.type === 'FRAME' || node.parent.type === 'COMPONENT') {
      if ('container' in naming && convention['container'].condition(node)) return setNameWithModifier(naming.container, modifier);

      if ('cell' in naming && convention['cell'].condition(node)) return setNameWithModifier(naming.cell, modifier);
      if ('grid' in naming && convention['grid'].condition(node)) return setNameWithModifier(naming.grid, modifier);

      if ('row' in naming && convention['row'].condition(node)) return setNameWithModifier(naming.row, modifier);
      if ('col' in naming && convention['col'].condition(node)) return setNameWithModifier(naming.col, modifier);

      if ('center' in naming && convention['center'].condition(node)) return setNameWithModifier(naming.center, modifier);

      if ('verticalLayout' in naming && convention['verticalLayout'].condition(node)) return setNameWithModifier(naming.verticalLayout, modifier);
      if ('horizontalLayout' in naming && convention['horizontalLayout'].condition(node)) return setNameWithModifier(naming.horizontalLayout, modifier);
      if ('wrap' in naming && convention['wrap'].condition(node)) return setNameWithModifier(naming.wrap, modifier);
    }
  }

  if (node.type === 'RECTANGLE') {
    if ('space' in naming && convention['space'].condition(node)) return naming.space;
    if ('image' in naming && convention['image'].condition(node)) return naming.image;
    if ('line' in naming && convention['line'].condition(node)) return naming.line;
  }

  return null;
}


// const isContainer = (node: FrameNode, parent: FrameNode | ComponentNode): boolean => (
//   node.maxWidth !== null &&
//   isCenterAligned(parent) &&
//   !hasAncestor(node, 'container')
// );
//
// const isGrid = (node: FrameNode | ComponentNode): boolean => (
//   node.layoutMode === 'HORIZONTAL' &&
//   node.children.length > 2 &&
//   isSameWidth(node.children)
// );
//
// const isFlexBox = (node: FrameNode | ComponentNode): boolean => (
//   node.layoutMode === 'HORIZONTAL' &&
//   node.children.length > 0 &&
//   node.children.every(child => child.type === 'FRAME' && child.layoutMode !== 'NONE')
// );
//
// const isSpace = (node: FrameNode | RectangleNode): boolean => (
//   node.fills !== figma.mixed && node.fills.length === 0
// );
//
// const isImage = (node: FrameNode | RectangleNode): boolean => (
//   node.fills !== figma.mixed && isImageFill(node.fills)
// );
//
// const isLine = (node: FrameNode | RectangleNode): boolean => {
//   const aspectRatio = node.width / node.height;
//   return aspectRatio > 10 || 1 / aspectRatio > 10;
// };
//
// export function generateName1(node: SceneNode, naming: Naming): string | null {
//   if (node.type === 'FRAME' && node.parent) {
//     const modifier = { node, naming };
//
//     // Root wrapper
//     if (node.parent.type === 'PAGE' || node.parent.type === 'SECTION') {
//       if ('root' in naming) return setNameWithModifier(naming.root, modifier);
//     }
//
//     // Elements
//     if (node.children.length === 0) {
//       if ('space' in naming && isSpace(node)) return naming.space;
//       if ('image' in naming && isImage(node)) return naming.image;
//       if ('line' in naming && isLine(node)) return naming.line;
//     }
//
//     // Under wrapper
//     if (node.parent.type === 'FRAME' || node.parent.type === 'COMPONENT') {
//       if ('container' in naming && isContainer(node, node.parent)) return setNameWithModifier(naming.container, modifier);
//
//       if ('cell' in naming && isGrid(node.parent)) return setNameWithModifier(naming.cell, modifier);
//       if ('grid' in naming && isGrid(node)) return setNameWithModifier(naming.grid, modifier);
//
//       if ('row' in naming && isFlexBox(node.parent) && node.layoutMode === 'HORIZONTAL') return setNameWithModifier(naming.row, modifier);
//       if ('col' in naming && isFlexBox(node.parent) && node.layoutMode === 'VERTICAL') return setNameWithModifier(naming.col, modifier);
//
//       if ('center' in naming && node.children.length > 0 && isCenterAligned(node)) return setNameWithModifier(naming.center, modifier);
//
//       if ('verticalLayout' in naming && node.layoutMode === 'VERTICAL') return setNameWithModifier(naming.verticalLayout, modifier);
//       if ('horizontalLayout' in naming && node.layoutMode === 'HORIZONTAL' && node.layoutWrap === 'NO_WRAP') return setNameWithModifier(naming.horizontalLayout, modifier);
//       if ('wrap' in naming && node.layoutMode === 'HORIZONTAL' && node.layoutWrap === 'WRAP') return setNameWithModifier(naming.wrap, modifier);
//     }
//   }
//
//   if (node.type === 'RECTANGLE') {
//     if ('space' in naming && isSpace(node)) return naming.space;
//     if ('image' in naming && isImage(node)) return naming.image;
//     if ('line' in naming && isLine(node)) return naming.line;
//   }
//
//   return null;
// }
//
