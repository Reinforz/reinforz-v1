import { Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useThemeSettings } from "../../hooks";
import sounds from "../../sounds";
import { createAggregateItemsMap, createItemMap } from "../../utils";
import "./style.scss";

export interface ListTableProps<T> {
  itemKeyKey: string
  headers: string[]
  items: T[]
  itemKey: keyof T
  generateTitle: (item: T) => string
  className?: string
  itemMapKey?: (item: any) => string | undefined
}

export default function ListTable<T extends Record<string, any>>(props: ListTableProps<T>) {
  const { settings } = useThemeSettings();
  const [itemsMap, setItemsMap] = useState<Record<string, any>[]>([]);
  const [sort, setSort] = useState<[string, boolean]>(['title', true]);
  useEffect(() => {
    setItemsMap(createItemMap<T>(props))
    // eslint-disable-next-line
  }, [props.items])

  const aggregateItemsMap = createAggregateItemsMap(itemsMap, props.headers)

  const headers = ["Sl", "title", ...props.headers];
  const sortedItems: Record<string, any>[] = sort ? itemsMap.sort((sortedItemA, sortedItemB) => sortedItemA[sort[0]] > sortedItemB[sort[0]] ? sort[1] ? 1 : -1 : sort[1] ? -1 : 1) : itemsMap;

  return <div className={`ListTable bg-base p-5 flex fd-c ta-c ${props.className ?? ''}`}>
    <div className="ListTable-headers bg-dark p-5 mb-5">
      <div className="ListTable-headers-row">
        {headers.map((header) => <span className={`ListTable-headers-row-item ListTable-headers-row-item-${header} flex ai-c jc-c tt-c c-p us-n`} key={header} onClick={() => {
          settings.sound && sounds.click.play()
          if (sort[0] === header) setSort([header, !sort[1]])
          else setSort([header, false])
        }}>
          {header === sort[0] ? <Typography className={`bold ListTable-headers-row-item-icon`} style={{ transform: sort[1] ? `rotate(-90deg)` : 'rotate(90deg)' }}>
            ▶
          </Typography> : null}
          <Typography className={`bold ListTable-headers-row-item-text`}>{header}</Typography>
        </span>)}
      </div>
    </div>
    <div className="ListTable-body bg-dark p-5 mb-5 pb-0">
      {sortedItems.map((itemMap, index) => <div key={itemMap._id} className="ListTable-body-row mb-5 bg-light bold">
        <Typography className={`bold ListTable-body-row-item flex jc-c ai-c ListTable-body-row-item-index`}>{index + 1}</Typography>
        {["title", ...props.headers].map(header => <Typography className={`bold ListTable-body-row-item ListTable-body-row-item-${header}`} key={header}>{itemMap[header]}</Typography>)}
      </div>)}
    </div>
    <div className="ListTable-footer">
      <div className="ListTable-headers-row bg-dark bold">
        <span className={`ListTable-headers-row-item ListTable-headers-row-item-blank`}></span>
        {["total", ...props.headers].map(header => <Typography className={`bold ListTable-headers-row-item ListTable-headers-row-item-${header}`} key={header}>{aggregateItemsMap[header]}</Typography>)}
      </div>
    </div>
  </div>
}