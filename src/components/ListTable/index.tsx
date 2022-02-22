import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import useSounds from '../../hooks/useSounds';
import { createAggregateItemsMap, createItemMap } from '../../utils';
import './style.scss';

export interface ListTableProps<T> {
  itemKeyKey: string;
  headers: string[];
  items: T[];
  itemKey: keyof T;
  generateTitle: (item: T) => string;
  className?: string;
  itemMapKey?: (item: any) => string | undefined;
}

export default function ListTable<T extends Record<string, any>>(
  props: ListTableProps<T>
) {
  const [itemsMap, setItemsMap] = useState<Record<string, any>[]>([]);
  const [sort, setSort] = useState<[string, boolean]>(['title', true]);
  useEffect(() => {
    setItemsMap(createItemMap<T>(props));
    // eslint-disable-next-line
  }, [props.items]);
  const { click } = useSounds();

  const aggregateItemsMap = createAggregateItemsMap(itemsMap, props.headers);

  const headers = ['Sl', 'title', ...props.headers];
  const sortedItems: Record<string, any>[] = sort
    ? itemsMap.sort((sortedItemA, sortedItemB) =>
        sortedItemA[sort[0]] > sortedItemB[sort[0]]
          ? sort[1]
            ? 1
            : -1
          : sort[1]
          ? -1
          : 1
      )
    : itemsMap;

  return (
    <Box
      className={`ListTable bg-base p-1 flex flex-col text-center ${
        props.className ?? ''
      }`}
    >
      <Box className="ListTable-headers bg-dark p-1 mb-1">
        <Box className="ListTable-headers-row">
          {headers.map((header) => (
            <span
              className={`ListTable-headers-row-item ListTable-headers-row-item-${header} flex items-center justify-center capitalize cursor-pointer select-none`}
              key={header}
              onClick={() => {
                click();
                if (sort[0] === header) setSort([header, !sort[1]]);
                else setSort([header, false]);
              }}
            >
              {header === sort[0] ? (
                <Typography
                  className={`bold ListTable-headers-row-item-icon text-sm m-1`}
                  style={{
                    transform: sort[1] ? `rotate(-90deg)` : 'rotate(90deg)'
                  }}
                >
                  ▶
                </Typography>
              ) : null}
              <Typography className={`bold ListTable-headers-row-item-text`}>
                {header}
              </Typography>
            </span>
          ))}
        </Box>
      </Box>
      <Box className="ListTable-body bg-dark p-1 flex-col-1">
        {sortedItems.map((itemMap, index) => (
          <Box key={itemMap._id} className={`ListTable-body-row rounded-sm bold ${index%2 === 0 ? "bg-light" : "bg-base"}`}>
            <Typography
              className={`bold ListTable-body-row-item flex-center justify-center items-center ListTable-body-row-item-index`}
            >
              {index + 1}
            </Typography>
            {['title', ...props.headers].map((header) => (
              <Typography
                className={`ListTable-body-row-item flex-center ListTable-body-row-item-${header}`}
                key={header}
              >
                {itemMap[header]}
              </Typography>
            ))}
          </Box>
        ))}
      </Box>
      <Box className="ListTable-footer">
        <Box className="ListTable-headers-row bg-dark bold">
          <span
            className={`ListTable-headers-row-item ListTable-headers-row-item-blank`}
          ></span>
          {['total', ...props.headers].map((header) => (
            <Typography
              className={`bold ListTable-headers-row-item ListTable-headers-row-item-${header}`}
              key={header}
            >
              {aggregateItemsMap[header]}
            </Typography>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
