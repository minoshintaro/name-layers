import { hasInstanceAncestor } from "./check";

// hasChildrenTypes = ['BOOLEAN_OPERATION', 'INSTANCE', 'COMPONENT', 'COMPONENT_SET', 'FRAME', 'GROUP', 'SECTION', 'PAGE'];
// entryTypes = ['COMPONENT', 'COMPONENT_SET', 'FRAME', 'GROUP', 'SECTION'];

export function collectNodesByCriteria(nodes: SceneNode[] | Readonly<SceneNode[]>, criteria: NodeType[] = ['FRAME']): SceneNode[] {
  const frameNodes = [...nodes].reduce((results: SceneNode[], node: SceneNode) => {
    if (criteria.includes(node.type)) {
      results.push(node);
    }
    if (node.type === 'COMPONENT' || node.type === 'COMPONENT_SET' || node.type === 'FRAME' || node.type === 'GROUP' || node.type === 'SECTION') {
      const subNodes = node.findAllWithCriteria({ types: criteria });
      results.push(...subNodes);
    }
    return results;
  }, []);

  return frameNodes.filter(node => !hasInstanceAncestor(node));
}
