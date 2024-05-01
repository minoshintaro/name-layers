export function isImageFill(props: ReadonlyArray<Paint>): boolean {
  return props.some(prop => prop.type === 'IMAGE');
}
