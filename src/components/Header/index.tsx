import { Typography } from "@material-ui/core";
import { Flex } from "..";
import { useThemeSettings } from "../../hooks";
import "./style.scss";

interface Props {
  header: string
  className?: string
  sideElements?: [JSX.Element, JSX.Element]
}

export default function Header(props: Props) {
  const { theme } = useThemeSettings();
  return <Flex className={`Header pad2_5 margin2_5 ${props.className ?? ''}`} style={{ backgroundColor: theme.color.dark, color: theme.palette.text.primary }}>
    {props.sideElements?.[0] ? <Flex className="pad2_5 margin2_5 Header-item Header-leftContent">{props.sideElements[0]}</Flex> : null}
    <Typography variant="h6" className="pad2_5 margin2_5 Header-item Header-title">
      {props.header}
    </Typography>
    {props.sideElements?.[1] ? <Flex className="pad2_5 margin2_5 Header-item Header-rightContent">{props.sideElements[1]}</Flex> : null}
  </Flex>
}