import { Typography } from "@material-ui/core";
import { useThemeSettings } from "../../hooks";
import "./style.scss";

interface Props {
  header: string
  className?: string
}

export default function Header(props: Props) {
  const { theme } = useThemeSettings();
  return <div className={`Header ${props.className ?? ''}`} style={{ backgroundColor: theme.color.dark }}>
    <Typography variant="h6">
      {props.header}
    </Typography>
  </div>
}