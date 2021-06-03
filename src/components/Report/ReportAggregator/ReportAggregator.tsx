import { useContext, useState } from "react";
import { ReportContext } from "../../../context/ReportContext";
import { useThemeSettings } from "../../../hooks";
import { Select } from "../../../shared";
import { IReportAggregator } from "../../../types";
import { computeBooleanDataAggregation, computeNumberDataAggregation } from "../../../utils";
import "./ReportAggregator.scss";


export function ReportAggregator() {
  const { filteredResults } = useContext(ReportContext);

  const { theme } = useThemeSettings();
  const REPORT_AGGREGATOR: IReportAggregator = JSON.parse(localStorage.getItem('REPORT_AGGREGATOR') ?? JSON.stringify({
    time_allocated: 'AVG',
    time_taken: 'AVG',
    weight: 'AVG',
    score: 'AVG',
    verdict: 'TRUE',
    hints_used: 'AVG'
  }));
  const [reportAggregator, setReportAggregator] = useState<IReportAggregator>(REPORT_AGGREGATOR);

  const totalWeight = filteredResults.reduce((acc, filteredResult) => acc + filteredResult.question.weight, 0);

  return <div className="Report-Aggregator" style={{ color: theme.palette.text.primary }}>
    {([['Time Allocated', 'time_allocated'], ['Weight', 'weight']] as const).map(key => <div className="Report-Aggregator-item" key={key[0]}>
      <Select lsKey={"REPORT_AGGREGATOR"} menuItemLabel={(item) => item} label={key[0]} items={["MAX", "MIN", "AVG"]} setState={setReportAggregator} stateKey={key[1]} state={reportAggregator} />
      <div className="Report-Aggregator-item-value" style={{ backgroundColor: theme.color.light }}>{computeNumberDataAggregation(filteredResults.map(filteredResult => filteredResult.question[key[1]]), { aggregation: reportAggregator[key[1]] })}</div>
    </div>)}
    {([['Time Taken', 'time_taken'], ['Hints Used', 'hints_used']] as const).map(key => <div className="Report-Aggregator-item" key={key[0]}>
      <Select lsKey={"REPORT_AGGREGATOR"} menuItemLabel={(item) => item} label={key[0]} items={["MAX", "MIN", "AVG"]} setState={setReportAggregator} stateKey={key[1]} state={reportAggregator} />
      <div className="Report-Aggregator-item-value" style={{ backgroundColor: theme.color.light }}>{computeNumberDataAggregation(filteredResults.map(filteredResult => filteredResult[key[1]]), { aggregation: reportAggregator[key[1]] })}</div>
    </div>)}
    <div className="Report-Aggregator-item">
      <Select lsKey={"REPORT_AGGREGATOR"} menuItemLabel={(item) => item} label={'Score'} items={["MAX", "MIN", "AVG"]} setState={setReportAggregator} stateKey={"score"} state={reportAggregator} />
      <div className="Report-Aggregator-item-value" style={{ backgroundColor: theme.color.light }}>{computeNumberDataAggregation(filteredResults.map(filteredResult => filteredResult.score.amount), { aggregation: reportAggregator.score, divider: totalWeight !== 0 ? totalWeight : 1 })}</div>
    </div>
    <div className="Report-Aggregator-item">
      <Select lsKey={"REPORT_AGGREGATOR"} menuItemLabel={(item) => item} label={"Verdict"} items={["TRUE", "FALSE"]} setState={setReportAggregator} stateKey={'verdict'} state={reportAggregator} />
      <div className="Report-Aggregator-item-value" style={{ backgroundColor: theme.color.light }}>{computeBooleanDataAggregation(filteredResults.map(filteredResult => filteredResult.verdict), reportAggregator.verdict)}</div>
    </div>
  </div>
}