export const regex = {
  alphabet: /[a-zA-Z]+/, // アルファベット
  comment: /\/\*[\s\S]*?\*\//, // ブロックコメント
  conjunction: /[-_]/, // ハイフンまたはアンダースコア
  endSpace: /\s+$/, // 末尾のスペース
  number: /^\d+$/, // 数字
  numericSuffix: /[-_]\d+$/, // ハイフンまたはアンダースコアで始まる数字
  placeholder: /(\{.*?\})/, // 中かっこで囲まれた部分
};
