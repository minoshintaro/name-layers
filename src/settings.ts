export const COLLECTION_NAME: string = 'Layer names';

export const NO_RENAME: string = '{null}';

export const DEFAULT_NAME: {
  [key: string]: string;
} = {
  frame: 'Frame',
  rectangle: 'Rectangle',
}

export interface LayerName {
  [key: string]: string | null;
}
export const NAMING_CONVENTION: LayerName = {
  /** Wrapper */
  root: '{pageTitle}',
  container: 'container', // container

  /** Pair */
  grid: 'grid', // grid
  cell: 'item',
  row: 'row', // flex-row
  col: 'col', // flex-col
  center: 'center', // justify-center
  // right: 'right',
  // justification: 'justification', // justify-between

  /** Single */
  verticalLayout: 'stack', // space-y
  horizontalLayout: 'flex', // flex
  wrap: 'wrap', // flex-wrap

  image: 'image',
  space: 'space',
  line: 'line',

  /** Option */
  minWidth: 'min', // min-w
  maxWidth: 'max', // min-h
};
