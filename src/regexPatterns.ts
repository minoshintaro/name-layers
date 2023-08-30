export const regexPatterns = {
  frameName: /^Frame(?: [0-9]{1,9})?$/,
  conventionalName: /^(wrapper|container|item|column|row|wrap|center|right)\b/
}

export const isReservedName = (target) => {
  return regexPatterns.frameName.test(target) || regexPatterns.conventionalName.test(target);
}
