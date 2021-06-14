import { DetailedHTMLProps, HTMLAttributes } from "react";
import "./style.scss";

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children: (JSX.Element | null | string)[] | (JSX.Element | null | string)
  direction?: React.CSSProperties["flexDirection"]
}

export default function Flex({ className = '', style = {}, ...props }: Props) {
  return <div {...props} className={`Flex ${className}`} style={{ ...style, flexDirection: props.direction ?? 'row' }}>
    {props.children}
  </div>
}