import { Typography } from "@material-ui/core";
import { ReactNode } from "react";
import { useThemeSettings } from "../../hooks";
export interface StackListProps {
  items: [ReactNode, ReactNode][]
  header: string
}

export default function StackList(props: StackListProps) {
  const { theme } = useThemeSettings();
  return <div className="StackList bg-base p-5 flex fd-c" style={{ color: theme.palette.text.primary }}>
    <Typography className="StackList-header bg-dark mb-5 bold ta-c p-5">{props.header}</Typography>
    <div className="StackList-content bg-dark p-5 pb-0 flex fd-c">
      {props.items.map(([label, value], index) => <div className="StackList-content-item flex jc-sb p-5 mb-5 bg-light" key={index} style={{ padding: 10 }}>
        <Typography className="StackList-content-item-label">{label}</Typography>
        <Typography className="StackList-content-item-value flex jc-sb ai-c bold">{value}</Typography>
      </div>)}
    </div>
  </div>
}