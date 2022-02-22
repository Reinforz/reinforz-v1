import { ReactNode } from "react";
import App from "../App";
import { Root } from "../Root";
import initPrismLineNumbers from "../scripts/prism-line-numbers";

initPrismLineNumbers();
interface Props {
  children: ReactNode | ReactNode[]
}

export default function Wrapper(props: Props) {
  return <Root>
    <App>
      {props.children}
    </App>
  </Root>
}

