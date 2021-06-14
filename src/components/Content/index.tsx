import { useThemeSettings } from "../../hooks";
import "./style.scss";

export interface ContentProps {
  children: JSX.Element | JSX.Element[]
  className?: string
  style?: React.CSSProperties
}

export function Content(props: ContentProps) {
  const { theme } = useThemeSettings();
  return <div className={`Content ${props.className ?? ''}`} style={{ backgroundColor: theme.color.dark, ...props.style ?? {} }}>
    {props.children}
  </div>
}

export interface FlexContentProps extends ContentProps{
  direction?: React.CSSProperties["flexDirection"]
}

export function FlexContent(props: FlexContentProps){
  return <Content style={{ display: 'flex', flexDirection: props.direction ?? 'row', ...props.style ?? {} }} className={`FlexContent ${props.className ?? ''}`}>
    {props.children}
  </Content>
}