export function applyCheckboxShortcut(
  e: React.ChangeEvent<HTMLInputElement>,
  items: string[],
  index: number
) {
  const { altKey, shiftKey, ctrlKey } = (e.nativeEvent as unknown) as {
    altKey: boolean;
    shiftKey: boolean;
    ctrlKey: boolean;
  };

  const { checked } = e.target,
    item = items[index];

  let finalItems: string[] = [];

  if (shiftKey && !ctrlKey && !altKey) {
    finalItems = new Array(index + 1)
      .fill(null)
      .map((_, index) => items[index]);
  } else if (shiftKey && !ctrlKey && altKey) {
    const excludedItems = new Array(index + 1)
      .fill(null)
      .map((_, index) => items[index]);
    finalItems = items.filter((item) => !excludedItems.includes(item));
  } else if (!shiftKey && !ctrlKey && altKey) {
    if (checked) finalItems = [items[index]];
    else finalItems = items.filter((item) => item !== items[index]);
  } else if (!shiftKey && !ctrlKey && !altKey) {
    finalItems = checked
      ? items.concat(item)
      : items.filter((_item) => _item !== item);
  }

  return finalItems;
}
