import { useContext } from "react";
import { Aggregator } from "../../../components";
import { ReportContext } from "../../../context/ReportContext";

export function ReportAggregator() {
  const { filteredResults, reportSettings, setReportSettings } = useContext(ReportContext);
  const { aggregator } = reportSettings;
  return <Aggregator header="Report Aggregator" items={[
    {
      data: filteredResults.map(filteredResult => filteredResult.question.time_allocated),
      stateKey: 'time_allocated',
      type: 'number'
    },
    {
      data: filteredResults.map(filteredResult => filteredResult.question.weight),
      stateKey: 'weight',
      type: 'number'
    },
    {
      data: filteredResults.map(filteredResult => filteredResult.time_taken),
      stateKey: 'time_taken',
      type: 'number'
    },
    {
      data: filteredResults.map(filteredResult => filteredResult.hints_used),
      stateKey: 'hints_used',
      type: 'number'
    },
    {
      data: filteredResults.map(filteredResult => filteredResult.score.amount),
      stateKey: 'score',
      type: 'number'
    },
    {
      data: filteredResults.map(filteredResult => filteredResult.score.amount * filteredResult.question.weight),
      stateKey: 'weighted_score',
      type: 'number'
    },
    {
      data: filteredResults.map(filteredResult => filteredResult.verdict),
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