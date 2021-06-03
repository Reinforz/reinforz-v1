export function transformTextBySeparator(
  text: string,
  separator?: string,
  join?: string
) {
  separator = separator ?? '_';
  join = join ?? ' ';
  return text
    .split(separator)
    .map((c) => c.charAt(0).toUpperCase() + c.substr(1))
    .join(join);
}
