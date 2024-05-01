export async function getCharactersByTextStyle(node: FrameNode, styleName: string): Promise<string | null> {
  const textStyles: TextStyle[] = await figma.getLocalTextStylesAsync();
  const nodes: TextNode[] = node.findAllWithCriteria({types: ['TEXT']});
  const results: TextNode[] = [];

  for (const node of nodes) {
    const targetId = node.textStyleId;
    const targetStyle = textStyles.find(style => style.id === targetId);

    if (targetStyle && targetStyle.name === styleName) {
      results.push(node);
    }
  }

  return null;
}
