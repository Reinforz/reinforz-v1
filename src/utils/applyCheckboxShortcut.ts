export function applyCheckboxShortcut(
  e: React.ChangeEvent<HTMLInputElement>,
  allItems: string[],
  currentItems: string[],
  index: number
) {
  const { altKey, shiftKey, ctrlKey } = (e.nativeEvent as unknown) as {
    altKey: boolean;
    shiftKey: boolean;
    ctrlKey: boolean;
  };

  const { checked } = e.target,
    item = allItems[index];

  let finalItems: string[] = [];

  if (shiftKey && !ctrlKey && !altKey) {
    finalItems = Array.from(
      new Set(
        new Array(index + 1)
          .fill(null)
          .map((_, index) => allItems[index])
          .concat(currentItems)
      )
    );
  } else if (shiftKey && ctrlKey && !altKey) {
    finalItems = new Array(index + 1)
      .fill(null)
      .map((_, index) => allItems[index]);
  } else if (shiftKey && !ctrlKey && altKey) {
    const excludedItems = new Array(index + 1)
      .fill(null)
      .map((_, index) => allItems[index]);
    finalItems = Array.from(
      new Set(
        allItems
          .filter((item) => !excludedItems.includes(item))
          .concat(currentItems)
      )
    );
  } else if (shiftKey && ctrlKey && altKey) {
    const excludedItems = new Array(index + 1)
      .fill(null)
      .map((_, index) => allItems[index]);
    finalItems = allItems.filter((item) => !excludedItems.includes(item));
  } else if (!shiftKey && !ctrlKey && altKey) {
    if (checked) finalItems = [allItems[index]];
    else finalItems = allItems.filter((item) => item !== allItems[index]);
  } else if (!shiftKey && !ctrlKey && !altKey) {
    finalItems = checked
      ? currentItems.concat(item)
      : currentItems.filter((_item) => _item !== item);
  }

  return finalItems;
}
