import { isCenterAligned, isGridContainer, hasContainerAlignedCenter, hasFlexContainer, hasGridContainer } from "./utils/autoLayout";
import { hasAncestor } from "./utils/hasAncestor";
import { isImageFills } from "./utils/isTrue";

export interface Convention {
  group: string;
  name: string;
  description: string;
  modifier: boolean;
  condition: (node: any) => boolean;
}

export interface NamingConvention {
  [key: string]: Convention;
}

export const ANONYMOUS: string = '{null}'; // Deprecated
export const COLLECTION_NAME: string = 'Plugin: Name Layers';
export const LAYER_NAME: { [key: string]: string; } = {
  FRAME: 'Frame',
  RECTANGLE: 'Rectangle',
};

export const initialNamingConvention: NamingConvention = {
  root: {
    group: 'Layout',
    name: 'wrapper',
    description: 'A frame located under a page or section',
    modifier: true,
    condition: (node: FrameNode) => (
      node.parent !== null &&
      (node.parent.type === 'PAGE' || node.parent.type === 'SECTION')
    ),
  },
  container: {
    group: 'Layout',
    name: 'container',
    description: 'A frame with a max-width that is centered',
    modifier: true,
    condition: (node: FrameNode): boolean => (
      node.maxWidth !== null &&
      hasContainerAlignedCenter(node) &&
      !hasAncestor(node, 'container')
    ),
  },
  grid: {
    group: 'Layout',
    name: 'grid',
    description: 'A frame with a horizontal layout and children of the same width',
    modifier: true,
    condition: (node: FrameNode | ComponentNode): boolean => (
      isGridContainer(node)
    ),
  },
  cell: {
    group: 'Layout',
    name: 'cell',
    description: '',
    modifier: true,
    condition: (node: FrameNode): boolean => (
      hasGridContainer(node)
    ),
  },
  row: {
    group: 'Layout',
    name: 'row',
    description: '',
    modifier: true,
    condition: (node: FrameNode): boolean => (
      node.layoutMode === 'HORIZONTAL' &&
      hasFlexContainer(node)
    ),
  },
  col: {
    group: 'Layout',
    name: 'col',
    description: '',
    modifier: true,
    condition: (node: FrameNode): boolean => (
      node.layoutMode === 'VERTICAL' &&
      hasFlexContainer(node)
    ),
  },
  center: {
    group: 'Layout',
    name: 'center',
    description: 'A frame with auto layout that centers the items',
    modifier: true,
    condition: (node: FrameNode): boolean => (
      node.children.length > 0 &&
      isCenterAligned(node)
    ),
  },
  verticalLayout: {
    group: 'Layout',
    name: 'stack',
    description: 'A frame with a vertical layout',
    modifier: true,
    condition: (node: FrameNode): boolean => (
      node.layoutMode === 'VERTICAL'
    ),
  },
  horizontalLayout: {
    group: 'Layout',
    name: 'flex',
    description: 'A frame with a horizontal layout',
    modifier: true,
    condition: (node: FrameNode): boolean => (
      node.layoutMode === 'HORIZONTAL' &&
      node.layoutWrap === 'NO_WRAP'
    ),
  },
  wrap: {
    group: 'Layout',
    name: 'wrap',
    description: 'A frame with a horizontal layout and wrapping',
    modifier: true,
    condition: (node: FrameNode): boolean => (
      node.layoutMode === 'HORIZONTAL' &&
      node.layoutWrap === 'WRAP'
    ),
  },
  space: {
    group: 'Layout',
    name: 'space',
    description: 'An empty frame',
    modifier: false,
    condition: (node: FrameNode | RectangleNode): boolean => (
      node.fills !== figma.mixed &&
      node.fills.length === 0
    ),
  },
  image: {
    group: 'Layout',
    name: 'image',
    description: 'An image frame',
    modifier: false,
    condition: (node: FrameNode | RectangleNode): boolean => (
      node.fills !== figma.mixed &&
      isImageFills(node.fills)
    ),
  },
  line: {
    group: 'Layout',
    name: 'line',
    description: 'A line frame',
    modifier: false,
    condition: (node: FrameNode | RectangleNode): boolean => {
      const aspectRatio = node.width / node.height;
      return aspectRatio > 10 || 1 / aspectRatio > 10;
    },
  },
  minWidth: {
    group: 'Layout',
    name: 'min',
    description: 'A frame with a minimum width',
    modifier: true,
    condition: (node: FrameNode): boolean => node.minWidth !== null,
  },
  maxWidth: {
    group: 'Layout',
    name: 'max',
    description: 'A frame with a maximum width',
    modifier: true,
    condition: (node: FrameNode): boolean => node.maxWidth !== null,
  },
  suffix: {
    group: 'Suffix',
    name: '_{width}x{height}_{yy}{mm}{dd}',
    description: 'A frame with a suffix',
    modifier: true,
    condition: (node: FrameNode): boolean => true,
  },
};
