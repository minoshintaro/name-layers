import { hasInstanceAncestor } from "../utils/hasAncestor";

export function collectNodesInSelection(types: NodeType[]): SceneNode[] {
  const results = figma.currentPage.selection.reduce((results: SceneNode[], node: SceneNode) => {
    if (types.includes(node.type)) {
      results.push(node);
    }

    // typesWithChildren: ['BOOLEAN_OPERATION', 'INSTANCE', 'COMPONENT', 'COMPONENT_SET', 'FRAME', 'GROUP', 'SECTION', 'PAGE'];
    if (
      node.type === 'COMPONENT' ||
      node.type === 'COMPONENT_SET' ||
      node.type === 'FRAME' ||
      node.type === 'GROUP' ||
      node.type === 'SECTION'
    ) {
      const subNodes = node.findAllWithCriteria({ types });
      results.push(...subNodes);
    }

    return results;
  }, []);

  return results.filter(node => !hasInstanceAncestor(node));
}
