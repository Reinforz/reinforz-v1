import { useTheme } from "@material-ui/styles";
import React from "react";
import { ExtendedTheme } from "../../types";
import "./style.scss";

interface Props {
  items: [string, any][]
}

function Stats(props: Props) {
  const theme = useTheme() as ExtendedTheme;
  const { items } = props;
  return (
    <div className="Stats" style={{ backgroundColor: theme.color.dark, color: theme.palette.text.primary }}>
      {items.map(item =>
        <div key={`${item[0]}`} className={`Stats-item Stats-item-${item[0]}`}>
          <span className={`Stats-item-key`}>{item[0] + ": "}</span>
          <span style={{ backgroundColor: theme.color.base }} className={"Stats-item-value"}>{item[1]}</span>
        </div>)}
    </div>
  );
}

export default Stats;