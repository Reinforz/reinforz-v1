import { useContext } from "react";
import { Select } from "../../../components";
import { ReportContext } from "../../../context/ReportContext";
import { useThemeSettings } from "../../../hooks";
import { computeBooleanDataAggregation, computeNumberDataAggregation } from "../../../utils";
import "./ReportAggregator.scss";


export function ReportAggregator() {
  const { filteredResults, reportSettings, setReportSettings } = useContext(ReportContext);
  const { aggregator } = reportSettings;
  const { theme } = useThemeSettings();

  const totalWeight = filteredResults.reduce((acc, filteredResult) => acc + filteredResult.question.weight, 0);

  return <div className="Report-Aggregator" style={{ color: theme.palette.text.primary, backgroundColor: theme.color.base }}>
    <div className="Report-Aggregator-header" style={{ backgroundColor: theme.color.dark }}>
      Report Aggregator
    </div>
    <div className="Report-Aggregator-content" style={{ backgroundColor: theme.color.dark }}>
      {([['Time Allocated', 'time_allocated'], ['Weight', 'weight']] as const).map(key => <div className="Report-Aggregator-content-item" key={key[0]}>
        <Select lsKey={"REPORT_AGGREGATOR"} menuItemLabel={(item) => item} label={key[0]} items={["MAX", "MIN", "AVG"]} setState={(aggregator) => {
          setReportSettings({
            ...reportSettings,
            aggregator: aggregator as any
          })
        }} stateKey={key[1]} state={aggregator} />
        <div className="Report-Aggregator-content-item-value" style={{ backgroundColor: theme.color.light }}>{computeNumberDataAggregation(filteredResults.map(filteredResult => filteredResult.question[key[1]]), { aggregation: aggregator[key[1]] })}</div>
      </div>)}
      {([['Time Taken', 'time_taken'], ['Hints Used', 'hints_used']] as const).map(key => <div className="Report-Aggregator-content-item" key={key[0]}>
        <Select lsKey={"REPORT_AGGREGATOR"} menuItemLabel={(item) => item} label={key[0]} items={["MAX", "MIN", "AVG"]} setState={(aggregator) => {
          setReportSettings({
            ...reportSettings,
            aggregator: aggregator as any
          })
        }} stateKey={key[1]} state={aggregator} />
        <div className="Report-Aggregator-content-item-value" style={{ backgroundColor: theme.color.light }}>{computeNumberDataAggregation(filteredResults.map(filteredResult => filteredResult[key[1]]), { aggregation: aggregator[key[1]] })}</div>
      </div>)}
      <div className="Report-Aggregator-content-item">
        <Select lsKey={"REPORT_AGGREGATOR"} menuItemLabel={(item) => item} label={'Score'} items={["MAX", "MIN", "AVG"]} setState={(aggregator) => {
          setReportSettings({
            ...reportSettings,
            aggregator: aggregator as any
          })
        }} stateKey={"score"} state={aggregator} />
        <div className="Report-Aggregator-content-item-value" style={{ backgroundColor: theme.color.light }}>{computeNumberDataAggregation(filteredResults.map(filteredResult => filteredResult.score.amount), { aggregation: aggregator.score, divider: totalWeight !== 0 ? totalWeight : 1 })}</div>
      </div>
      <div className="Report-Aggregator-content-item">
        <Select lsKey={"REPORT_AGGREGATOR"} menuItemLabel={(item) => item} label={"Verdict"} items={["TRUE", "FALSE"]} setState={(aggregator) => {
          setReportSettings({
            ...reportSettings,
            aggregator: aggregator as any
          })
        }} stateKey={'verdict'} state={aggregator} />
        <div className="Report-Aggregator-content-item-value" style={{ backgroundColor: theme.color.light }}>{computeBooleanDataAggregation(filteredResults.map(filteredResult => filteredResult.verdict), aggregator.verdict)}</div>
      </div>
    </div>
  </div>
}