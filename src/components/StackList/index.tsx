import { Typography } from "@mui/material";
import { ReactNode } from "react";
export interface StackListProps {
  items: [ReactNode, ReactNode][]
  header?: string
  classNames?: {
    container?: string
    header?: string
    content?: string
    contentItem?: string
    contentItemLabel?: string
    contentItemValue?: string
  }
  direction?: 'row' | 'column'
}

export default function StackList(props: StackListProps) {
  const { items, header, classNames = {}, direction = 'column' } = props;
  return <div className={`StackList bg-base p-5 flex ${direction === 'column' ? 'fd-c' : ''} ${classNames.container ?? ''}`}>
    {header && <Typography className={`StackList-header bg-dark bold ta-c p-5 flex jc-c ai-c p-10 ${direction === 'column' ? 'mb-5' : 'mr-5'} ${classNames.header ?? ''}`}>{header}</Typography>}
    <div className={`StackList-content bg-dark p-5 flex ${direction === 'column' ? 'pb-0' : 'pr-0'} ${direction === 'column' ? 'fd-c' : ''} ${classNames.content ?? ''}`}>
      {items.map(([label, value], index) => <div className={`StackList-content-item flex jc-sb p-5 bg-base p-5 pr-0 ${direction === 'column' ? 'mb-5' : 'mr-5'} ${classNames.contentItem ?? ''}`} key={index}>
        <Typography component="div" className={`StackList-content-item-label flex mr-5 p-10 bg-light jc-sb ai-c ${classNames.contentItemLabel ?? ''}`}>{label}</Typography>
        {value !== null && value !== undefined && value !== '' ? <Typography component="div" className={`StackList-content-item-value flex mr-5 p-10 bg-light jc-sb ai-c bold ${classNames.contentItemValue ?? ''}`}>{value}</Typography> : null}
      </div>)}
    </div>
  </div>
}