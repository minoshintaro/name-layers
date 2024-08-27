import { Naming, NamingConvention } from "../settings";

export function getNaming(convention: NamingConvention): Naming {
  const naming: Naming = {};

  for (const conventionKey in convention) {
    if (!convention.hasOwnProperty(conventionKey)) continue;

    const key = conventionKey as keyof NamingConvention;
    naming[key] = convention[key].name;
  }

  return naming;
}
