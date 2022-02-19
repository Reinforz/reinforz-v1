import { Box, Typography } from "@mui/material";
import { SetStateAction } from "react";
import { Content, Header, Select } from "..";
import { TBooleanAggregation, TNumberAggregation } from "../../types";
import { computeBooleanDataAggregation, computeNumberDataAggregation, transformTextBySeparator } from "../../utils";
import "./style.scss";

export interface AggregatorProps<T> {
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

export default function Aggregator<T>(props: AggregatorProps<T>) {
  const { header, items, state, setState } = props;
  return <Box className="Aggregator bg-base p-1">
    <Header header={header} />
    <Content className="Aggregator-content pb-0">
      {items.map(item => <Box key={item.type + item.stateKey} className="Aggregator-content-item flex mb-1">
        <Select className="mr-1 flex-1" menuItemLabel={(item) => item} label={item.label ?? transformTextBySeparator(item.stateKey as string)} items={item.type === "number" ? ["MAX", "MIN", "AVG", 'MEDIAN', 'MODE', 'STDDEV', 'VARIANCE'] : ["TRUE", "FALSE"]} setState={(aggregator) => {
          setState({
            ...state,
            [item.stateKey]: (aggregator as T)[item.stateKey]
          })
        }} stateKey={item.stateKey} state={state} />
        <Box className="Aggregator-content-item-value bg-light flex items-center justify-center br-2_5">
          <Typography variant="body1" className="bold">
            {item.type === "number" ? computeNumberDataAggregation(item.data, { aggregation: state[item.stateKey] as unknown as TNumberAggregation }) : computeBooleanDataAggregation(item.data, state[item.stateKey] as unknown as TBooleanAggregation)}
          </Typography>
        </Box>
      </Box>)}
    </Content>
  </Box>
}