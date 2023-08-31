export const regexPatterns = {
  frameName: /^Frame(?: [0-9]{1,9})?$/,
  conventionalName: /^(wrapper|container|item|column|row|wrap|center|right|evenly|space)\b/
}

export const isReservedName = (targetName) => {
  return regexPatterns.frameName.test(targetName) || regexPatterns.conventionalName.test(targetName);
}
