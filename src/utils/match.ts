import { NamingConvention, DEFAULT_NAME } from "../settings";
import { regex } from "./regex";

export function matchNamingConventions(initial: NamingConvention, overridden: NamingConvention): boolean {
  return Object.keys(initial).length === Object.keys(overridden).length &&
    Object.keys(initial).every(key => initial[key] === overridden[key])
}

export function matchWithNames(input: string, namingSet: Set<string>): boolean {
  const isDefaultName = (words: string[]): boolean => (
    words.length === 2 &&
    Object.values(DEFAULT_NAME).includes(words[0]) &&
    regex.number.test(words[1])
  );

  const trimSuffix = (word: string) => word.replace(regex.numericSuffix, '');

  const words = input.split(' ');

  return isDefaultName(words) || words.every(word => namingSet.has(trimSuffix(word)));
}

export function matchCommentOut(input: string): boolean {
  return regex.comment.test(input);
}
