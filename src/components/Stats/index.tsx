import { useTheme } from "@material-ui/styles";
import React from "react";
import { ExtendedTheme } from "../../types";
import "./style.scss";

interface Props {
  items: ([string, any] | null)[]
  style?: React.CSSProperties
}

function Stats(props: Props) {
  const theme = useTheme() as ExtendedTheme;
  const { items } = props;
  return (
    <div className="Stats bg-dark" style={{ color: theme.palette.text.primary, ...(props.style ?? {}) }}>
      {items.map(item => {
        return item ? <div key={`${item[0]}`} className={`Stats-item Stats-item-${item[0]}`}>
          <span className={`Stats-item-key`}>{item[0] + ": "}</span>
          <span style={{ backgroundColor: theme.color.base }} className={"Stats-item-value"}>{item[1]}</span>
        </div> : null
      })}
    </div>
  );
}

export default Stats;