import { Name } from "./type";
import { createNameAsAlignment, createNameAsComponentContainer, createNameAsContainer, createNameAsFlow, createNameAsItem, createNameAsSpace } from "./createName";

export function getAllFrames(node: SceneNode): FrameNode[] {
  const subNodes = 'findAllWithCriteria' in node ? node.findAllWithCriteria({ types: ['FRAME'] }) : [];
  return node.type === 'FRAME' ? [node, ...subNodes] : subNodes;
}

export function getChildFrames(node: SceneNode): SceneNode[] {
  return 'findChildren' in node ? node.findChildren(child => child.type === 'FRAME') : [];
}

export function getNameAsElement(node: FrameNode, modifier: Name): Name {
  const { parent, children, fills } = node;
  if (parent) {
    if (parent.type === 'PAGE' || parent.type === 'SECTION') {
      return children.length ? 'wrapper' : null;
    } else if (parent.type === 'COMPONENT') {
      return createNameAsComponentContainer(parent.children.length, modifier);
    } else if ('layoutMode' in parent) {
      return children.length ? createNameAsItem(getChildFrames(parent), parent.layoutMode, modifier) : createNameAsSpace(fills);
    }
  }
  return null;
}

export function getNameAsContainer(node: FrameNode, modifier: Name): Name {
  const { children, layoutMode, primaryAxisAlignItems: primary, counterAxisAlignItems: counter } = node;
  return modifier ? createNameAsContainer(layoutMode, children.length, modifier) : createNameAsAlignment(layoutMode, primary, counter, children.length);
}

export function getNameAsAutoLayout(node: FrameNode): Name {
  const { layoutMode, layoutWrap } = node;
  return createNameAsFlow(layoutMode, layoutWrap);
}
