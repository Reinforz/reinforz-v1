import { useThemeSettings } from "../../hooks";
import Icon from "../Icon";
import "./style.scss";

interface Props {
  icons: [string, JSX.Element][]
  direction?: 'column' | 'row'
  style?: React.CSSProperties
  className?: string
}

export function IconGroup(props: Props) {
  const { theme } = useThemeSettings();
  const direction = props.direction ?? 'row';
  <div className={`Icon-Group ${props.className}`} style={{ backgroundColor: theme.color.base, flexDirection: direction }}>
    {props.icons.map(([popoverText, icon]) => <Icon popoverText={popoverText} className="Icon-Group-item">
      {icon}
    </Icon>)}
  </div>
}