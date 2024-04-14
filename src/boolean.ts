
export function isReservedName(input: string): boolean {
  const patterns = [
    /^Frame( \d{1,9})?$/,
    /^(wrapper|container|column|row|wrap|center|right|justification|item|space|image)\b/
  ];
  return patterns.some(pattern => pattern.test(input));
}

export function isTargetType(input: string): boolean {
  const targets = ['SECTION', 'GROUP', 'COMPONENT_SET', 'COMPONENT', 'FRAME'];
  return targets.includes(input);
}



// function isSameSize(w: number, h: number): boolean {
//   switch (option) {
//     case 'HORIZONTAL': return w === baseWidth;
//     case 'VERTICAL': return h === baseHeight;
//     default: return false;
//   }
// }
