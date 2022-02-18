/**
 * Applies checkbox shortcuts for an array of items and returns the new selected ones
 * @param e Event to extract keys from
 * @param allItems All items that are selectable
 * @param currentSelectedItems Currently selected items, its important as some shortcuts keep the current selected intact
 * @param index Index of the clicked item
 * @returns A new array of selected items
 */
export function applyCheckboxShortcut(
  e: React.ChangeEvent<HTMLInputElement>,
  allItems: string[],
  currentSelectedItems: string[],
  index: number
) {
  const { altKey, shiftKey, ctrlKey } = (e.nativeEvent as unknown) as {
    altKey: boolean;
    shiftKey: boolean;
    ctrlKey: boolean;
  };

  const { checked } = e.target,
    item = allItems[index];

  let finalSelectedItems: string[] = [];

  // Select everything from first to selected, keeping the current selected items
  if (shiftKey && !ctrlKey && !altKey) {
    // Using a set to filter out duplicate items
    finalSelectedItems = Array.from(
      new Set(
        allItems.slice(0, index).concat(currentSelectedItems)
      )
    );
  } 
  // Select everything from first to selected, without keeping the current selected items
  else if (shiftKey && ctrlKey && !altKey) {
    finalSelectedItems = allItems.slice(0, index);
  } 
  // Select everything from current to end, keeping current selected items
  else if (shiftKey && !ctrlKey && altKey) {
    finalSelectedItems = Array.from(
      new Set(
        allItems
          .slice(index)
          .concat(currentSelectedItems)
      )
    );
  } 
  // Select everything from current to end, without current selected items
  else if (shiftKey && ctrlKey && altKey) {
    finalSelectedItems = allItems.slice(index)
  } else if (!shiftKey && !ctrlKey && altKey) {
    // Only keep the current index if its checked
    if (checked) finalSelectedItems = [allItems[index]];
    // If its not checked select everything apart from current one
    else finalSelectedItems = allItems.filter((item) => item !== allItems[index]);
  } else {
    // if none of them were pressed
    finalSelectedItems = checked
      ? currentSelectedItems.concat(item)
      : currentSelectedItems.filter((_item) => _item !== item);
  }

  return finalSelectedItems;
}
