import { NamingConvention } from "../settings";

type Modifier = { node: FrameNode | RectangleNode, naming: NamingConvention };

export function setNameWithModifier(name: string, modifier: Modifier): string {
  const { node, naming } = modifier;
  const words = [name];

  if ('minWidth' in naming && node.minWidth !== null) {
    words.push(`${naming.minWidth}-${node.minWidth}`);
  }

  if ('maxWidth' in naming && node.maxWidth !== null) {
    words.push(`${naming.maxWidth}-${node.maxWidth}`);
  }

  return words.join(' ');
}
