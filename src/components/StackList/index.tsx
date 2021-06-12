import { useThemeSettings } from "../../hooks";
import "./style.scss";

interface Props {
  items: [string | number | boolean | JSX.Element, string | number | boolean | JSX.Element][]
  header: string
}

export default function StackList(props: Props) {
  const { theme } = useThemeSettings();
  return <div className="StackList" style={{ backgroundColor: theme.color.base, color: theme.palette.text.primary }}>
    <div className="StackList-header" style={{ backgroundColor: theme.color.dark }}>{props.header}</div>
    <div className="StackList-content" style={{ backgroundColor: theme.color.dark }}>
      {props.items.map(([label, value], index) => <div className="StackList-content-item" key={index} style={{ backgroundColor: theme.color.light }}>
        <div className="StackList-content-item-label">{label}</div>
        <div className="StackList-content-item-value">{value}</div>
      </div>)}
    </div>
  </div>
}