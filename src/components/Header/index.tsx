import { Typography } from "@material-ui/core";
import { Content, Flex } from "..";
import { useThemeSettings } from "../../hooks";
import "./style.scss";

interface Props {
  header: string
  className?: string
  sideElements?: [JSX.Element, JSX.Element]
}

export default function Header(props: Props) {
  const { theme } = useThemeSettings();
  return <Flex className={`Header ${props.className ?? ''}`} style={{ backgroundColor: theme.color.dark, color: theme.palette.text.primary }}>
    {props.sideElements?.[0] ? <Content className="Header-item Header-leftContent" background={false}>{props.sideElements[0]}</Content> : null}
    <Typography variant="h6" className="Header-item Header-title">
      {props.header}
    </Typography>
    {props.sideElements?.[1] ? <Content className="Header-item Header-rightContent" background={false}>{props.sideElements[1]}</Content> : null}
  </Flex>
}