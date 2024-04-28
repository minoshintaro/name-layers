export const COLLECTION_NAME: string = 'Layer names';

export const SKIP: string = '{null}';

export interface LayerName {
  [key: string]: string;
}
export const DEFAULT_NAME: LayerName = {
  frame: 'Frame',
  rectangle: 'Rectangle',
}
export const NAMING_CONVENTION: LayerName = {
  /** Wrapper */
  root: '{pageTitle}',
  container: 'container', // container

  /** Pair */
  grid: 'grid', // grid
  cell: 'item',
  col: 'col', // flex-col
  row: 'row', // flex-row


  /** Solo */
  wrap: 'wrap', // flex-wrap
  stack: 'stack', // space-y
  flex: 'flex', // flex

  center: 'center', // justify-center
  right: 'right',
  justification: 'justification', // justify-between
  image: 'image',
  space: 'space',
  line: 'line',

  /** Option */
  minWidth: 'min', // min-w
  maxWidth: 'max', // min-h
};
