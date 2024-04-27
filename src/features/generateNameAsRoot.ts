import { LayerName, EMPTY } from "../settings";

export function generateNameAsRoot(node: FrameNode, naming: LayerName): string | null {
  const root = naming.root === EMPTY ? null : naming.root;

  if (
    // 親
    node.parent !== null &&
    (node.parent.type === 'PAGE' || node.parent.type === 'SECTION')
  ) {
   return root;
  }

  return null;
}
