import React from "react";
import "./style.scss";

interface Props {
  items: ([string, any] | null)[]
  style?: React.CSSProperties
}

function Stats(props: Props) {
  const { items } = props;
  return (
    <div className="Stats bg-dark" style={{ ...(props.style ?? {}) }}>
      {items.map(item => {
        return item ? <div key={`${item[0]}`} className={`Stats-item Stats-item-${item[0]}`}>
          <span className={`Stats-item-key`}>{item[0] + ": "}</span>
          <span className={"Stats-item-value bg-base"}>{item[1]}</span>
        </div> : null
      })}
    </div>
  );
}

export default Stats;