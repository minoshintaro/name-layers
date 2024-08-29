import { NamingConvention } from "../settings";

type Props = {
  name: string;
  minWidth: number | null;
  maxWidth: number | null;
  convention: NamingConvention
};

export function setNameWithModifier(props: Props): string {
  const { name, minWidth, maxWidth, convention } = props;
  const words = [name];

  if (minWidth !== null) {
    words.push(`${convention.minWidth.name}-${minWidth}`);
  }

  if (maxWidth !== null) {
    words.push(`${convention.maxWidth.name}-${maxWidth}`);
  }

  return words.join(' ');
}
