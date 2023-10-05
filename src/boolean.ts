
const namePatterns = [
  /^Frame( \d{1,9})?$/,
  /^(wrapper|container|column|row|wrap|center|right|evenly|item|space|image)\b/
];

export function isReservedName(input: string): boolean {
  return namePatterns.some(pattern => pattern.test(input));
}
