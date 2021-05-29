import { useEffect, useState } from "react";
import { useThemeSettings } from "../../hooks";

interface Props<T> {
  itemKeyKey: string
  headers: string[]
  items: T[]
  itemKey: keyof T
  generateTitle: (item: T) => string
  className?: string
}

export default function ListTable<T extends Record<string, any>>(props: Props<T>) {
  const { theme } = useThemeSettings();
  const [itemsMap, setItemsMap] = useState<Record<string, any>[]>([]);
  const [sorts, setSorts] = useState<(boolean[])>([true, true, ...(new Array(props.headers.length)).fill(true)]);
  useEffect(() => {
    setItemsMap(props.items.map((item, index) => {
      const itemMap: Record<string, any> = {
        _id: item._id,
        title: props.generateTitle(item),
        index: index + 1
      };

      props.headers.forEach(header => {
        itemMap[header] = 0
      })

      props.items[index][props.itemKey].forEach((item: any) => {
        itemMap[item[props.itemKeyKey]]++;
      })
      return itemMap;
    }))
    // eslint-disable-next-line
  }, [props.items])

  const aggregateItemsMap: Record<string, number> = {
    total: itemsMap.length
  };

  props.headers.forEach(header => {
    aggregateItemsMap[header] = 0
  })

  itemsMap.forEach(itemMap => {
    Object.entries(itemMap).forEach(([key, value]) => {
      aggregateItemsMap[key] += value;
    })
  });

  return <div className={`ListTable${props.className ? ' ' + props.className : ''}`} style={{ backgroundColor: theme.color.base, color: theme.palette.text.secondary }}>
    <div className="ListTable-headers">
      <div className="ListTable-headers-row" style={{ backgroundColor: theme.color.dark }}>
        {["Sl", "title", ...props.headers].map((header, headerIndex) => <span className={`ListTable-headers-row-item ListTable-headers-row-item--${header}`} key={header} onClick={() => {
          sorts[headerIndex] = !sorts[headerIndex]
          setSorts([...sorts])
        }}>
          <span className={`ListTable-headers-row-item-icon`} style={{ transform: sorts[headerIndex] ? `rotate(-90deg)` : 'rotate(90deg)' }}>
            ▶
          </span>
          <span className={`ListTable-headers-row-item-text`}>{header}</span>
        </span>)}
      </div>
    </div>
    <div className="ListTable-body">
      {itemsMap.map((itemMap) => <div key={itemMap._id} className="ListTable-body-row" style={{ backgroundColor: theme.color.light }}>
        {["index", "title", ...props.headers].map(header => <span className={`ListTable-body-row-item ListTable-body-row-item--${header}`} key={header}>{itemMap[header]}</span>)}
      </div>)}
    </div>
    <div className="ListTable-footer">
      <div className="ListTable-headers-row" style={{ backgroundColor: theme.color.dark }}>
        <span className={`ListTable-headers-row-item ListTable-headers-row-item--blank`}></span>
        {["total", ...props.headers].map(header => <span className={`ListTable-headers-row-item ListTable-headers-row-item--${header}`} key={header}>{aggregateItemsMap[header]}</span>)}
      </div>
    </div>
  </div>
}