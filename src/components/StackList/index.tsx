import { Typography } from "@material-ui/core";
import { ReactNode } from "react";
export interface StackListProps {
  items: [ReactNode, ReactNode][]
  header: string
  classNames?: {
    container?: string
    header?: string
    content?: string
    contentItem?: string
    contentItemLabel?: string
    contentItemValue?: string
  }
}

export default function StackList(props: StackListProps) {
  const { items, header, classNames = {} } = props;
  return <div className={`StackList bg-base p-5 flex fd-c ${classNames.container ?? ''}`}>
    <Typography className={`StackList-header bg-dark mb-5 bold ta-c p-5 ${classNames.header ?? ''}`}>{header}</Typography>
    <div className={`StackList-content bg-dark p-5 pb-0 flex fd-c ${classNames.content ?? ''}`}>
      {items.map(([label, value], index) => <div className={`StackList-content-item flex jc-sb p-5 mb-5 bg-light p-10 ${classNames.contentItem ?? ''}`} key={index}>
        <Typography className={`StackList-content-item-label ${classNames.contentItemLabel ?? ''}`}>{label}</Typography>
        <Typography className={`StackList-content-item-value flex jc-sb ai-c bold ${classNames.contentItemValue ?? ''}`}>{value}</Typography>
      </div>)}
    </div>
  </div>
}