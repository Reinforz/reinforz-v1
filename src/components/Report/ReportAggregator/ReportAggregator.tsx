import { useState } from "react";
import { useThemeSettings } from "../../../hooks";
import { Select } from "../../../shared";
import { IReportAggregator, IResult } from "../../../types";
import { computeBooleanDataAggregation, computeNumberDataAggregation } from "../../../utils";
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
    hints_used: 'AVG'
  });

  return <div className="Report-Aggregator" style={{ color: theme.palette.text.primary }}>
    {([['Time Allocated', 'time_allocated'], ['Weight', 'weight']] as const).map(key => <div className="Report-Aggregator-item" key={key[0]}>
      <Select menuItemLabel={(item) => item} label={key[0]} items={["MAX", "MIN", "AVG"]} setState={setReportAggregator} stateKey={key[1]} state={reportAggregator} />
      <div className="Report-Aggregator-item-value" style={{ backgroundColor: theme.color.light }}>{computeNumberDataAggregation(props.filteredResults.map(filteredResult => filteredResult.question[key[1]]), reportAggregator[key[1]])}</div>
    </div>)}
    {([['Time Taken', 'time_taken'], ['Hints Used', 'hints_used']] as const).map(key => <div className="Report-Aggregator-item" key={key[0]}>
      <Select menuItemLabel={(item) => item} label={key[0]} items={["MAX", "MIN", "AVG"]} setState={setReportAggregator} stateKey={key[1]} state={reportAggregator} />
      <div className="Report-Aggregator-item-value" style={{ backgroundColor: theme.color.light }}>{computeNumberDataAggregation(props.filteredResults.map(filteredResult => filteredResult[key[1]]), reportAggregator[key[1]])}</div>
    </div>)}
    <div className="Report-Aggregator-item">
      <Select menuItemLabel={(item) => item} label={'Score'} items={["MAX", "MIN", "AVG"]} setState={setReportAggregator} stateKey={"score"} state={reportAggregator} />
      <div className="Report-Aggregator-item-value" style={{ backgroundColor: theme.color.light }}>{computeNumberDataAggregation(props.filteredResults.map(filteredResult => filteredResult.score.amount), reportAggregator.score)}</div>
    </div>
    <div className="Report-Aggregator-item">
      <Select menuItemLabel={(item) => item} label={"Verdict"} items={["TRUE", "FALSE"]} setState={setReportAggregator} stateKey={'verdict'} state={reportAggregator} />
      <div className="Report-Aggregator-item-value" style={{ backgroundColor: theme.color.light }}>{computeBooleanDataAggregation(props.filteredResults.map(filteredResult => filteredResult.verdict), reportAggregator.verdict)}</div>
    </div>
  </div>
}