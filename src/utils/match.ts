import { regex } from "./regex";
import { trimNumericSuffix } from "./edit";

export function matchWithNames(name: string, namings: Set<string>): boolean {
  return name.split(' ').every(word => namings.has(trimNumericSuffix(word)));
}

export function matchCommentOut(word: string): boolean {
  return regex.comment.test(word);
}
