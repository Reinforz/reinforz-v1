import { Typography } from "@material-ui/core";
import { Flex } from "..";
import "./style.scss";

interface Props {
  header: string
  className?: string
  sideElements?: [JSX.Element, JSX.Element]
}

export default function Header(props: Props) {
  return <Flex className={`Header p-5 mb-5 bg-dark ${props.className ?? ''}`}>
    {props.sideElements?.[0] ? <Flex className="p-2_5 m-2_5 Header-item Header-leftContent">{props.sideElements[0]}</Flex> : null}
    <Typography variant="h6" className="p-2_5 m-2_5 Header-item Header-title">
      {props.header}
    </Typography>
    {props.sideElements?.[1] ? <Flex className="p-2_5 m-2_5 Header-item Header-rightContent">{props.sideElements[1]}</Flex> : null}
  </Flex>
}