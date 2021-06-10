import { useContext } from "react";
import { Aggregator } from "../../../components";
import { ReportContext } from "../../../context/ReportContext";
import "./ReportAggregator.scss";

export function ReportAggregator() {
  const { filteredResults, reportSettings, setReportSettings } = useContext(ReportContext);
  const { aggregator } = reportSettings;
  return <Aggregator header="Report Aggregator" items={[
    {
      data: filteredResults.map(filteredResult => filteredResult.question.time_allocated),
      label: 'Time Allocated',
      stateKey: 'time_allocated',
      type: 'number'
    },
    {
      data: filteredResults.map(filteredResult => filteredResult.question.weight),
      label: 'Weight',
      stateKey: 'weight',
      type: 'number'
    },
    {
      data: filteredResults.map(filteredResult => filteredResult.time_taken),
      label: 'Time Taken',
      stateKey: 'time_taken',
      type: 'number'
    },
    {
      data: filteredResults.map(filteredResult => filteredResult.hints_used),
      label: 'Hints Used',
      stateKey: 'hints_used',
      type: 'number'
    },
    {
      data: filteredResults.map(filteredResult => filteredResult.score.amount),
      label: 'Score',
      stateKey: 'score',
      type: 'number'
    },
    {
      data: filteredResults.map(filteredResult => filteredResult.score.amount * filteredResult.question.weight),
      label: 'Weighted Score',
      stateKey: 'weighted_score',
      type: 'number'
    },
    {
      data: filteredResults.map(filteredResult => filteredResult.verdict),
      label: 'Verdict',
      stateKey: 'verdict',
      type: 'boolean'
    }
  ]} setState={(aggregator) => {
    setReportSettings({
      ...reportSettings,
      aggregator: {
        ...reportSettings.aggregator,
        ...aggregator
      }
    })
  }} state={aggregator} />
}