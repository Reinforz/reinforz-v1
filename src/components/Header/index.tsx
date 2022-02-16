import { Typography } from "@mui/material";
import { Flex } from "..";
import "./style.scss";

interface Props {
  header: string
  className?: string
  sideElements?: [JSX.Element, JSX.Element]
}

export default function Header(props: Props) {
  return <Flex className={`Header p-5 pr-0 mb-5 bg-dark ${props.className ?? ''}`}>
    {props.sideElements?.[0] ? <Flex className="p-5 mr-5 Header-item Header-leftContent">{props.sideElements[0]}</Flex> : null}
    <Typography variant="h6" className="p-5 mr-5 flex-1 ta-c Header-item Header-title flex jc-c ai-c">
      {props.header}
    </Typography>
    {props.sideElements?.[1] ? <Flex className="p-5 mr-5 Header-item Header-rightContent">{props.sideElements[1]}</Flex> : null}
  </Flex>
}