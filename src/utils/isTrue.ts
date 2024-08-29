import { LAYER_NAME } from "../settings";
import { regex } from "./regex";

export function isDefaultName(name: string): boolean {
  const words = name.split(' ');
  return (
    Object.values(LAYER_NAME).includes(words[0]) &&
    (words.length === 1 || (words.length === 2 && regex.number.test(words[1])))
  );
}

export function isImageFills(props: ReadonlyArray<Paint>): boolean {
  return props.some(prop => prop.type === 'IMAGE');
}

export function isSameWidth(nodes: SceneNode[] | Readonly<SceneNode[]>): boolean {
  const target = Math.floor(nodes[0].width);
  return nodes.every(node => Math.floor(node.width) === target);
}
