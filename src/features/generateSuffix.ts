export const generateSuffix = (format: string, width: number, height: number, date: Date) => (
  format
    .replace('{width}', `${width}`)
    .replace('{height}', `${height}`)
    .replace('{yy}', date.getFullYear().toString().slice(-2))
    .replace('{yyyy}', date.getFullYear().toString())
    .replace('{mm}', ('0' + (date.getMonth() + 1)).slice(-2))
    .replace('{dd}', ('0' + date.getDate()).slice(-2))
);
