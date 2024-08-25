export interface NamingConvention {
  [key: string]: string;
}

export const COLLECTION_NAME: string = 'Plugin: Name Layers';

export const ANONYMOUS: string = '{null}';

export const DEFAULT_NAME: NamingConvention = {
  FRAME: 'Frame',
  RECTANGLE: 'Rectangle',
};
