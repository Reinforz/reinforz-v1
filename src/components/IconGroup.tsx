import { Box, PopoverOrigin } from "@mui/material";
import { Hovertips } from "./";
import "./IconGroup.scss";
export interface IconGroupProps {
    icons: [
        string,
        JSX.Element,
        {
            popoverAnchorOrigin?: PopoverOrigin;
            popoverTransformOrigin?: PopoverOrigin;
        }?
    ][];
    direction?: "column" | "row";
    style?: React.CSSProperties;
    className?: string;
}
export default function IconGroup(props: IconGroupProps) {
    const direction = props.direction ?? "row";
    return <Box className={`IconGroup flex p-1 gap-1 bg-base ${props.className ?? ""}`} style={{ flexDirection: direction, ...props.style ?? {} }}>
    {props.icons.map(([popoverText, icon, popoverOrigin], index) => <Hovertips key={popoverText + index} {...popoverOrigin ?? {}} popoverText={popoverText} className={`IconGroup-item bg-light flex justify-center items-center p-1 ${direction === "row" ? "" : "mb-1"}`}>
      {icon}
    </Hovertips>)}
  </Box>;
}
