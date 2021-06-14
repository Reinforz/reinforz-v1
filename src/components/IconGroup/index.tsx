import { PopoverOrigin } from "@material-ui/core";
import { Hovertips } from "../";
import { useThemeSettings } from "../../hooks";
import "./style.scss";

export interface IconGroupProps {
  icons: [string, JSX.Element, {
    popoverAnchorOrigin?: PopoverOrigin
    popoverTransformOrigin?: PopoverOrigin
  }?][]
  direction?: 'column' | 'row'
  style?: React.CSSProperties
  className?: string
}

export default function IconGroup(props: IconGroupProps) {
  const { theme } = useThemeSettings();
  const direction = props.direction ?? 'row';
  return <div className={`Hovertips-Group ${props.className}`} style={{ backgroundColor: theme.color.base, flexDirection: direction, ...props.style ?? {} }}>
    {props.icons.map(([popoverText, icon, popoverOrigin], index) => <Hovertips key={popoverText + index} {...popoverOrigin ?? {}} popoverText={popoverText} className="Hovertips-Group-item" style={{ backgroundColor: theme.color.light }} >
      {icon}
    </Hovertips>)}
  </div>
}