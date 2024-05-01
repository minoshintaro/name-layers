export const COLLECTION_NAME: string = 'Plugin: Name Layers';

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
  root: 'wrapper',
  container: 'container',
  /** Pair */
  grid: 'grid',
  cell: 'cell',
  row: 'row',
  col: 'col',
  center: 'center',

  /** Single */
  verticalLayout: 'stack',
  horizontalLayout: 'flex',
  wrap: 'wrap',

  image: 'image',
  space: 'space',
  line: 'line',

  /** Option */
  minWidth: 'min',
  maxWidth: 'max',
};

