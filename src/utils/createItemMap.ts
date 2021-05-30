interface Props<T> {
  itemKeyKey: string;
  headers: string[];
  items: T[];
  itemKey: keyof T;
  generateTitle: (item: T) => string;
  itemMapKey?: (item: any) => string | undefined;
}

export function createItemMap<T extends Record<string, any>>(props: Props<T>) {
  return props.items.map((item) => {
    const itemMap: Record<string, any> = {
      _id: item._id,
      title: props.generateTitle(item)
    };

    props.headers.forEach((header) => {
      itemMap[header] = 0;
    });

    item[props.itemKey].forEach((item: any) => {
      itemMap[
        props.itemMapKey ? props.itemMapKey(item) : item[props.itemKeyKey]
      ]++;
    });
    return itemMap;
  });
}
