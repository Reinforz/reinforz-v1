import { Typography } from "@material-ui/core";
import { ReactNode } from "react";
import { useThemeSettings } from "../../hooks";
import "./style.scss";

export interface StackListProps {
  items: [ReactNode, ReactNode][]
  header: string
}

export default function StackList(props: StackListProps) {
  const { theme } = useThemeSettings();
  return <div className="StackList bg-base" style={{ color: theme.palette.text.primary }}>
    <Typography className="StackList-header bg-dark">{props.header}</Typography>
    <div className="StackList-content bg-dark">
      {props.items.map(([label, value], index) => <div className="StackList-content-item bg-light" key={index}>
        <Typography className="StackList-content-item-label">{label}</Typography>
        <Typography className="StackList-content-item-value">{value}</Typography>
      </div>)}
    </div>
  </div>
}