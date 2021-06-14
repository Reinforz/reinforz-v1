import { useThemeSettings } from "../../hooks";
import "./style.scss";

export interface ContentProps {
  children: JSX.Element | JSX.Element[] | string
  className?: string
  style?: React.CSSProperties,
  background?: boolean
}

export function Content(props: ContentProps) {
  const { theme } = useThemeSettings();
  const styles: React.CSSProperties = { color: theme.palette.text.primary, ...props.style ?? {} };

  if (props.background) {
    styles.backgroundColor = theme.color.dark;
  }

  return <div className={`Content ${props.className ?? ''}`} style={styles}>
    {props.children}
  </div>
}

export interface FlexContentProps extends ContentProps {
  direction?: React.CSSProperties["flexDirection"]
}

export function FlexContent(props: FlexContentProps) {
  return <Content style={{ display: 'flex', flexDirection: props.direction ?? 'row', ...props.style ?? {} }} className={`FlexContent ${props.className ?? ''}`}>
    {props.children}
  </Content>
}