import { regex } from "./regex";

export function trimVariableGroupName(name: string): string {
  const words = name.split('/');
  return words.length > 1 ? words[words.length - 1] : name;
}

export function trimNumericSuffix(word: string): string {
  return word.replace(regex.numericSuffix, '');
}
