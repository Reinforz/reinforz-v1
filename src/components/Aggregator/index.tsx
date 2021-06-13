import { SetStateAction } from "react";
import { Select } from "..";
import { useThemeSettings } from "../../hooks";
import { TBooleanAggregation, TNumberAggregation } from "../../types";
import { computeBooleanDataAggregation, computeNumberDataAggregation, transformTextBySeparator } from "../../utils";
import "./style.scss";

interface Props<T> {
  header: string
  items: ({
    label?: string,
    stateKey: keyof T,
    data: number[],
    type: 'number'
  } | {
    label?: string,
    stateKey: keyof T,
    data: boolean[],
    type: 'boolean'
  })[]
  state: T
  setState: (state: SetStateAction<T>) => void
}

export default function Aggregator<T>(props: Props<T>) {
  const { header, items, state, setState } = props;
  const { theme } = useThemeSettings();
  return <div className="Aggregator" style={{ color: theme.palette.text.primary, backgroundColor: theme.color.base }}>
    <div className="Aggregator-header" style={{ backgroundColor: theme.color.dark }}>
      {header}
    </div>
    <div className="Aggregator-content" style={{ backgroundColor: theme.color.dark }}>
      {items.map(item => <div key={item.type + item.stateKey} className="Aggregator-content-item">
        <Select menuItemLabel={(item) => item} label={item.label ?? transformTextBySeparator(item.stateKey as string)} items={item.type === "number" ? ["MAX", "MIN", "AVG", 'MEDIAN'] : ["TRUE", "FALSE"]} setState={(aggregator) => {
          setState({
            ...state,
            [item.stateKey]: (aggregator as T)[item.stateKey]
          })
        }} stateKey={item.stateKey} state={state} />
        <div className="Aggregator-content-item-value" style={{ backgroundColor: theme.color.light }}>{item.type === "number" ? computeNumberDataAggregation(item.data, { aggregation: state[item.stateKey] as unknown as TNumberAggregation }) : computeBooleanDataAggregation(item.data, state[item.stateKey] as unknown as TBooleanAggregation)}</div>
      </div>)}
    </div>
  </div>
}