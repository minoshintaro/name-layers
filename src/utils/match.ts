import { Naming } from "../settings";
import { isDefaultName } from "./isTrue";
import { regex } from "./regex";
import { trimNumericSuffix } from "./trim";

export function matchBothNamings(initial: Naming, current: Naming): boolean {
  return (
    Object.keys(initial).length === Object.keys(current).length &&
    Object.keys(initial).every(key => initial[key] === current[key])
  );
}

export function matchWithNaming(name: string, namings: Set<string>): boolean {
  return (
    isDefaultName(name) ||
    name.split(' ').every(word => namings.has(trimNumericSuffix(word)))
  );
}

export function matchCommentOut(word: string): boolean {
  return regex.comment.test(word);
}
