import { hasAncestor } from "../utils/hasAncestor";

type Criteria = { types: Array<NodeType> };

export function collectNodesInTree(nodes: SceneNode[] | readonly SceneNode[], criteria: Criteria): Set<SceneNode> {
  const collectedNodes = new Set<SceneNode>();

  for (const node of nodes) {
    if (criteria.types.includes(node.type)) {
      collectedNodes.add(node);
    }

    if (
      node.type === 'COMPONENT' ||
      node.type === 'COMPONENT_SET' ||
      node.type === 'FRAME' ||
      node.type === 'GROUP' ||
      node.type === 'SECTION'
    ) {
      const subNodes = node.findAllWithCriteria(criteria);
      subNodes.forEach(subNode => {
        if (!hasAncestor(subNode, 'instance')) collectedNodes.add(subNode);
      });
    }
  }

  return collectedNodes;
}
