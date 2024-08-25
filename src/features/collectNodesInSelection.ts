import { hasAncestor } from "../utils/hasAncestor";

type TargetType = { types: Array<NodeType> };

export function collectNodeSetInSelection(input: TargetType): Set<SceneNode> {
  const nodeSet = new Set<SceneNode>();

  for (const node of figma.currentPage.selection) {
    if (input.types.includes(node.type)) {
      nodeSet.add(node);
    }

    if (
      node.type === 'COMPONENT' ||
      node.type === 'COMPONENT_SET' ||
      node.type === 'FRAME' ||
      node.type === 'GROUP' ||
      node.type === 'SECTION'
    ) {
      const subNodes = node.findAllWithCriteria(input);
      subNodes.forEach(subNode => {
        if (!hasAncestor(subNode, 'instance')) {
          nodeSet.add(subNode);
        }
      });
    }
  }

  return nodeSet;
}
