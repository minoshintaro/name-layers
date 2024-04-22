export const COLLECTION_NAME: string = 'Layer names';
export const EMPTY: string = '-';

export interface LayerName {
  [key: string]: string;
}
export const DEFAULT_NAME: LayerName = {
  frame: 'Frame',
  rectangle: 'Rectangle',
}
export const LAYER_NAME: LayerName = {
  root: 'page',
  container: 'container',
  stack: 'stack',
  col: 'col',
  row: 'row',
  wrap: 'wrap',
  item: 'item',
  image: 'image',
  space: 'space',
  line: 'line',
  center: 'center',
  right: 'right',
  justification: 'justification',
  minWidth: 'min',
  maxWidth: 'max',
};
