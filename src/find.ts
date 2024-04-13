import { AlignmentProp, LayoutMode, PrimaryAxisAlignItems, CounterAxisAlignItems } from "./type";

export function findAlignment(prop: AlignmentProp): PrimaryAxisAlignItems | CounterAxisAlignItems | null {
  const { selfMode, childrenCount, primaryAlignment, counterAlignment } = prop;
  if (selfMode === 'HORIZONTAL' && childrenCount <= 2) return primaryAlignment;
  if (selfMode === 'VERTICAL' && childrenCount <= 1) return counterAlignment;
  return null;
}

export function findSamePropNodes(nodes: SceneNode[], option?: LayoutMode): SceneNode[] {
  const baseWidth = nodes[0].width;
  const baseHeight = nodes[0].height;
  const isSameSize = (w: number, h: number): boolean => {
    switch (option) {
      case 'HORIZONTAL': return w === baseWidth;
      case 'VERTICAL': return h === baseHeight;
      default: return false;
    }
  };
  return nodes.filter(node => (
    node.type === 'FRAME' &&
    node.children.length > 0 &&
    node.layoutPositioning === 'AUTO' &&
    !option || isSameSize(node.width, node.height)
  ));
}


export function findSamePropNodes1(nodes: SceneNode[], option?: LayoutMode): SceneNode[] {
  const { width: baseW, height: baseH } = nodes[0];
  const isSameSize = (w: number, h: number): boolean => {
    switch (option) {
      case 'HORIZONTAL': return w === baseW;
      case 'VERTICAL': return h === baseH;
      default: return false;
    }
  };
  return nodes.filter(node => (
    node.type === 'FRAME' &&
    node.children.length > 0 &&
    node.layoutPositioning === 'AUTO' &&
    !option || isSameSize(node.width, node.height)
  ));
}
