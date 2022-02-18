import { Box, PopoverOrigin } from "@mui/material";
import { Hovertips } from "../";
import "./style.scss";

export interface IconGroupProps {
  icons: [string, JSX.Element, {
    popoverAnchorOrigin?: PopoverOrigin
    popoverTransformOrigin?: PopoverOrigin
  }?][]
  direction?: 'column' | 'row'
  style?: React.CSSProperties
  className?: string
}

export default function IconGroup(props: IconGroupProps) {
  const direction = props.direction ?? 'row';
  return <Box className={`IconGroup flex p-5 ${direction === 'row' ? "pr-0" : "pb-0"} bg-base ${props.className ?? ''}`} style={{ flexDirection: direction, ...props.style ?? {} }}>
    {props.icons.map(([popoverText, icon, popoverOrigin], index) => <Hovertips key={popoverText + index} {...popoverOrigin ?? {}} popoverText={popoverText} className={`IconGroup-item bg-light flex jc-c ai-c p-5 ${direction === "row" ? "mr-5" : "mb-5"}`} >
      {icon}
    </Hovertips>)}
  </Box>
}