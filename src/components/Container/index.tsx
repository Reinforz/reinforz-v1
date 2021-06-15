import { DetailedHTMLProps, HTMLAttributes } from "react";
import "./style.scss";

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children: (JSX.Element | null | string)[] | (JSX.Element | null | string)
}

export function Container({ className = '', style = {}, ...props }: Props) {
  return <div {...props} className={`Container p-5 bg-base ${className ?? ''} `}>
    {props.children}
  </div>
}

export function FlexContainer({ className = '', style = {}, ...props }: Props) {
  return <Container {...props} className={`FlexContainer ${className ?? ''}`}>
    {props.children}
  </Container>
}