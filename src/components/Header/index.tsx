import { Typography } from "@mui/material";
import { Flex } from "..";
import "./style.scss";

interface Props {
  header: string
  className?: string
  sideElements?: [JSX.Element, JSX.Element]
}

export default function Header(props: Props) {
  return <Flex className={`Header p-1 pr-0 mb-1 bg-dark ${props.className ?? ''}`}>
    {props.sideElements?.[0] ? <Flex className="p-1 mr-1 Header-item Header-leftContent">{props.sideElements[0]}</Flex> : null}
    <Typography variant="h6" className="p-1 mr-1 flex-1 text-center Header-item Header-title flex justify-center items-center">
      {props.header}
    </Typography>
    {props.sideElements?.[1] ? <Flex className="p-1 mr-1 Header-item Header-rightContent">{props.sideElements[1]}</Flex> : null}
  </Flex>
}