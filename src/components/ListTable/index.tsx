import { useEffect, useState } from "react";
import { useThemeSettings } from "../../hooks";
import sounds from "../../sounds";
import { createAggregateItemsMap, createItemMap } from "../../utils";
import "./style.scss";

interface Props<T> {
  itemKeyKey: string
  headers: string[]
  items: T[]
  itemKey: keyof T
  generateTitle: (item: T) => string
  className?: string
  itemMapKey?: (item: any) => string | undefined
}

export default function ListTable<T extends Record<string, any>>(props: Props<T>) {
  const { theme, settings } = useThemeSettings();
  const [itemsMap, setItemsMap] = useState<Record<string, any>[]>([]);
  const [sort, setSort] = useState<[string, boolean]>(['title', true]);
  useEffect(() => {
    setItemsMap(createItemMap<T>(props))
    // eslint-disable-next-line
  }, [props.items])

  const aggregateItemsMap = createAggregateItemsMap(itemsMap, props.headers)

  const headers = ["Sl", "title", ...props.headers];
  const sortedItems: Record<string, any>[] = sort ? itemsMap.sort((sortedItemA, sortedItemB) => sortedItemA[sort[0]] > sortedItemB[sort[0]] ? sort[1] ? 1 : -1 : sort[1] ? -1 : 1) : itemsMap;

  return <div className={`ListTable${props.className ? ' ' + props.className : ''} bg-base`} style={{ color: theme.palette.text.secondary }}>
    <div className="ListTable-headers bg-dark">
      <div className="ListTable-headers-row">
        {headers.map((header) => <span className={`ListTable-headers-row-item ListTable-headers-row-item-${header}`} key={header} onClick={() => {
          settings.sound && sounds.click.play()
          if (sort[0] === header) setSort([header, !sort[1]])
          else setSort([header, false])
        }}>
          {header === sort[0] ? <span className={`ListTable-headers-row-item-icon`} style={{ transform: sort[1] ? `rotate(-90deg)` : 'rotate(90deg)' }}>
            ▶
          </span> : null}
          <span className={`ListTable-headers-row-item-text`}>{header}</span>
        </span>)}
      </div>
    </div>
    <div className="ListTable-body bg-dark">
      {sortedItems.map((itemMap, index) => <div key={itemMap._id} className="ListTable-body-row bg-light">
        <span className={`ListTable-body-row-item ListTable-body-row-item-index`}>{index + 1}</span>
        {["title", ...props.headers].map(header => <span className={`ListTable-body-row-item ListTable-body-row-item-${header}`} key={header}>{itemMap[header]}</span>)}
      </div>)}
    </div>
    <div className="ListTable-footer">
      <div className="ListTable-headers-row bg-dark">
        <span className={`ListTable-headers-row-item ListTable-headers-row-item-blank`}></span>
        {["total", ...props.headers].map(header => <span className={`ListTable-headers-row-item ListTable-headers-row-item-${header}`} key={header}>{aggregateItemsMap[header]}</span>)}
      </div>
    </div>
  </div>
}