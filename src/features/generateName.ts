import { Naming, NamingConvention } from "../settings";
import { setNameWithModifier } from "./setNameWithModifier";

export function generateName(node: SceneNode, convention: NamingConvention): string | null {

  if (node.type === 'FRAME' && node.parent) {

    // Root wrapper
    for (const key of ['root']) {
      if (convention.hasOwnProperty(key) && convention[key].condition(node)) {
        const { name, modifier } = convention[key];
        const { minWidth, maxWidth } = node;
        return modifier ? setNameWithModifier({ name, minWidth, maxWidth, convention }) : name;
      }
    }

    // Elements
    if (node.children.length === 0) {
      for (const key of ['space', 'image', 'line']) {
        if (convention.hasOwnProperty(key) && convention[key].condition(node)) {
          const { name, modifier } = convention[key];
          const { minWidth, maxWidth } = node;
          return modifier ? setNameWithModifier({ name, minWidth, maxWidth, convention }) : name;
        }
      }
    }

    // Under wrapper
    if (node.parent.type === 'FRAME' || node.parent.type === 'COMPONENT') {
      for (const key of ['container', 'cell', 'grid', 'row', 'col', 'center', 'verticalLayout', 'horizontalLayout', 'wrap']) {
        if (convention.hasOwnProperty(key) && convention[key].condition(node)) {
          const { name, modifier } = convention[key];
          const { minWidth, maxWidth } = node;
          return modifier ? setNameWithModifier({ name, minWidth, maxWidth, convention }) : name;
        }
      }
    }
  }

  if (node.type === 'RECTANGLE') {
    for (const key of ['space', 'image', 'line']) {
      if (convention.hasOwnProperty(key) && convention[key].condition(node)) {
        const { name, modifier } = convention[key];
        const { minWidth, maxWidth } = node;
        return modifier ? setNameWithModifier({ name, minWidth, maxWidth, convention }) : name;
      }
    }
  }

  return null;
}
