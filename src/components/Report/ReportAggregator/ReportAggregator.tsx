import { useState } from "react";
import { useThemeSettings } from "../../../hooks";
import { Select } from "../../../shared";
import { IReportAggregator, IResult } from "../../../types";
import { computeNumberDataAggregation } from "../../../utils";
import "./ReportAggregator.scss";

interface Props {
  filteredResults: IResult[]
}

export function ReportAggregator(props: Props) {
  const { theme } = useThemeSettings();
  const [reportAggregator, setReportAggregator] = useState<IReportAggregator>({
    time_allocated: 'AVG',
    time_taken: 'AVG',
    weight: 'AVG',
    score: 'AVG',
    verdict: 'TRUE',
  });

  return <div className="Report-Aggregator" style={{ color: theme.palette.text.primary }}>
    <div className="Report-Aggregator-item">
      <Select menuItemLabel={(item) => item} label={"Time Allocated"} items={["MAX", "MIN", "AVG"]} setState={setReportAggregator} stateKey={"time_allocated"} state={reportAggregator} />
      <div className="Report-Aggregator-item-value" style={{ backgroundColor: theme.color.light }}>{computeNumberDataAggregation(props.filteredResults.map(filteredResult => filteredResult.question.time_allocated), reportAggregator.time_allocated)}</div>
    </div>
  </div>
}