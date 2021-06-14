import { useThemeSettings } from "../../hooks";
import "./style.scss";

interface Props {
  children: JSX.Element | JSX.Element[]
  className?: string
}

export default function Content(props: Props) {
  const { theme } = useThemeSettings();
  return <div className={`Content ${props.className ?? ''}`} style={{ backgroundColor: theme.color.dark }}>
    {props.children}
  </div>
}