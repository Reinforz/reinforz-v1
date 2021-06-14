import { PopoverOrigin } from "@material-ui/core";
import { useThemeSettings } from "../../hooks";
import Hovertips from "../Hovertips";
import "./style.scss";

interface Props {
  icons: [string, JSX.Element, {
    popoverAnchorOrigin?: PopoverOrigin
    popoverTransformOrigin?: PopoverOrigin
  }?][]
  direction?: 'column' | 'row'
  style?: React.CSSProperties
  className?: string
}

export default function IconGroup(props: Props) {
  const { theme } = useThemeSettings();
  const direction = props.direction ?? 'row';
  return <div className={`Hovertips-Group ${props.className}`} style={{ backgroundColor: theme.color.base, flexDirection: direction, ...props.style ?? {} }}>
    {props.icons.map(([popoverText, icon, popoverOrigin], index) => <Hovertips key={popoverText + index} {...popoverOrigin ?? {}} popoverText={popoverText} className="Hovertips-Group-item" style={{ backgroundColor: theme.color.light }} >
      {icon}
    </Hovertips>)}
  </div>
}