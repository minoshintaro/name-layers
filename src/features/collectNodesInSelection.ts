import { hasAncestor } from "../utils/hasAncestor";

type Input = { types: Array<NodeType> };

export function collectNodesInSelection(input: Input): Set<SceneNode> {
  const nodes = new Set<SceneNode>();

  for (const node of figma.currentPage.selection) {
    if (input.types.includes(node.type)) {
      nodes.add(node);
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
          nodes.add(subNode);
        }
      });
    }
  }

  return nodes;
}
