import { regex } from "./regex";

export function changeToSuffixPattern(input: string): RegExp {
  return new RegExp(input
    .replace('{width}', '\\d+')
    .replace('{height}', '\\d+')
    .replace('{yyyy}', '\\d{4}')
    .replace('{yy}', '\\d{2}')
    .replace('{mm}', '\\d{2}')
    .replace('{dd}', '\\d{2}')
  );
}

export function trimVariableGroupName(name: string): string {
  const words = name.split('/');
  return words.length > 1 ? words[words.length - 1] : name;
}

export function trimNumericSuffix(word: string): string {
  return word.replace(regex.numericSuffix, '');
}

export function splitVariableWord(word: string): string[] {
  const pattern = new RegExp(`${regex.placeholder.source}|${regex.conjunction.source}|${regex.alphabet.source}`, 'g');
  return word.match(pattern) || [word];
}
