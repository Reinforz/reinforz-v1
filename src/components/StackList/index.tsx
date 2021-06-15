import { useThemeSettings } from "../../hooks";
import "./style.scss";

interface Props {
  items: [string | number | boolean | JSX.Element, string | number | boolean | JSX.Element][]
  header: string
}

export default function StackList(props: Props) {
  const { theme } = useThemeSettings();
  return <div className="StackList bg-base" style={{ color: theme.palette.text.primary }}>
    <div className="StackList-header bg-dark">{props.header}</div>
    <div className="StackList-content bg-dark">
      {props.items.map(([label, value], index) => <div className="StackList-content-item bg-light" key={index}>
        <div className="StackList-content-item-label">{label}</div>
        <div className="StackList-content-item-value">{value}</div>
      </div>)}
    </div>
  </div>
}