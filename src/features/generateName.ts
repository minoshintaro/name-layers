import { LayerName } from "../settings";
import { generateNameForAlignment } from "./generateNameForAlignment";
import { generateNameForAutoLayout } from "./generateNameForAutoLayout";
import { generateNameForElement } from "./generateNameForElement";
import { generateNameForGrid } from "./generateNameForGrid";
import { generateNameForModifier } from "./generateNameForModifier";
import { generateNameForRow } from "./generateNameForRow";
import { generateNameForWrapper } from "./generateNameForWrapper";

export function generateName(node: FrameNode | RectangleNode, naming: LayerName): string | null {
  if (node.type === 'FRAME') {
    const newName =
      generateNameForElement(node, naming) ||
      generateNameForWrapper(node, naming) ||
      generateNameForGrid(node, naming) ||
      generateNameForRow(node, naming) ||
      generateNameForAlignment(node, naming) ||
      generateNameForAutoLayout(node, naming);
    const modifier = generateNameForModifier(node, naming);
    return modifier ? `${newName} ${modifier}` : newName;
  }
  if (node.type === 'RECTANGLE') {
    return generateNameForElement(node, naming)
  }
  return null;
}
