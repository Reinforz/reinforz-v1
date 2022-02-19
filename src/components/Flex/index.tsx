import { Box, BoxProps } from "@mui/material";

interface Props extends BoxProps {
  children: (JSX.Element | null | string)[] | (JSX.Element | null | string)
  direction?: React.CSSProperties["flexDirection"]
}

export default function Flex({ className = '', style = {}, ...props }: Props) {
  return <Box {...props} className={`flex justify-center items-center ${className ?? ''}`} style={{ ...style, flexDirection: props.direction ?? 'row' }}>
    {props.children}
  </Box>
}