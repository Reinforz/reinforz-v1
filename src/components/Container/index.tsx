import { Box, BoxProps } from "@mui/material";
import "./style.scss";

interface Props extends BoxProps {
  children: (JSX.Element | null | string)[] | (JSX.Element | null | string)
}

export function Container({ className = '', style = {}, ...props }: Props) {
  return <Box {...props} className={`Container p-5 bg-base ${className ?? ''} `}>
    {props.children}
  </Box>
}

export function FlexContainer({ className = '', style = {}, ...props }: Props) {
  return <Container {...props} className={`FlexContainer ${className ?? ''}`}>
    {props.children}
  </Container>
}