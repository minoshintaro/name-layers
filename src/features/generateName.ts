import { NamingConvention } from "../settings";
import { addModifierToName } from "./addName";

export function generateName(node: SceneNode, convention: NamingConvention): string | null {
  const handleNaming = (keys: string[]): string | null => {
    for (const key of keys) {
      if (convention.hasOwnProperty(key) && convention[key].condition(node)) {
        const { name, modifier } = convention[key];
        const { minWidth, maxWidth } = node;
        return modifier ? addModifierToName({ name, minWidth, maxWidth, convention }) : name;
      }
    }
    return null;
  }

  if (node.type === 'FRAME' && node.parent) {
    const wrapper = handleNaming(['root']);
    if (wrapper) return wrapper;

    if (node.children.length === 0) {
      const element = handleNaming(['space', 'image', 'line']);
      if (element) return element;
    }

    if (node.parent.type === 'FRAME' || node.parent.type === 'COMPONENT') {
      const flexbox = handleNaming(['container', 'cell', 'grid', 'row', 'col', 'center', 'verticalLayout', 'horizontalLayout', 'wrap']);
      if (flexbox) return flexbox;
    }
  }

  if (node.type === 'RECTANGLE') {
    const element = handleNaming(['space', 'image', 'line']);
    if (element) return element;
  }

  return null;
}
