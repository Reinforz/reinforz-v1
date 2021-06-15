import { DetailedHTMLProps, HTMLAttributes } from "react";
import { useThemeSettings } from "../../hooks";
import "./style.scss";

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children: (JSX.Element | null | string)[] | (JSX.Element | null | string)
}

export function Container({ className = '', style = {}, ...props }: Props) {
  const { theme } = useThemeSettings();

  return <div {...props} className={`Container ${className}`} style={{ backgroundColor: theme.color.base }}>
    {props.children}
  </div>
}

export function FlexContainer({ className = '', style = {}, ...props }: Props) {
  return <Container {...props} className={`FlexContainer ${className}`}>
    {props.children}
  </Container>
}