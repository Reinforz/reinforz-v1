/**
 * Transform a text by splitting it based on a separate and joining the pieces using another character sequence
 * @param text Text to transform
 * @param separator separator to split text by
 * @param join character sequence to join splitted text
 * @returns Transformed text
 */
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
