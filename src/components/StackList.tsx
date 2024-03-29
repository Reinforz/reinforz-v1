import { Box, Typography } from "@mui/material";
import { ReactNode } from "react";
export interface StackListProps {
    items: [
        ReactNode,
        ReactNode
    ][];
    header?: string;
    classNames?: {
        container?: string;
        header?: string;
        content?: string;
        contentItem?: string;
        contentItemLabel?: string;
        contentItemValue?: string;
    };
    direction?: "row" | "column";
}
export default function StackList(props: StackListProps) {
    const { items, header, classNames = {}, direction = "column" } = props;
    return <Box className={`StackList bg-base p-1 flex ${direction === "column" ? "flex-col" : ""} ${classNames.container ?? ""}`}>
    {header && <Typography className={`StackList-header bg-dark bold text-center p-1 flex justify-center items-center p-10 ${direction === "column" ? "mb-1" : ""} ${classNames.header ?? ""}`}>{header}</Typography>}
    <Box className={`StackList-content bg-dark p-1 flex ${direction === "column" ? "pb-0" : "pr-0"} ${direction === "column" ? "flex-col" : ""} ${classNames.content ?? ""}`}>
      {items.map(([label, value], index) => <Box className={`StackList-content-item flex justify-between p-1 bg-base p-1 pr-0 ${direction === "column" ? "mb-1" : ""} ${classNames.contentItem ?? ""}`} key={index}>
        <Typography component="div" className={`StackList-content-item-label flex  p-10 bg-light justify-between items-center ${classNames.contentItemLabel ?? ""}`}>{label}</Typography>
        {value !== null && value !== undefined && value !== "" ? <Typography component="div" className={`StackList-content-item-value flex  p-10 bg-light justify-between items-center bold ${classNames.contentItemValue ?? ""}`}>{value}</Typography> : null}
      </Box>)}
    </Box>
  </Box>;
}
