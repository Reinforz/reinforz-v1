import { useState } from "react";
import { Select } from "../../../shared";
import { IReportAggregator, IResult } from "../../../types";
import "./ReportAggregator.scss";

interface Props {
  filteredResults: IResult[]
}

export function ReportAggregator(props: Props) {
  const [reportAggregator, setReportAggregator] = useState<IReportAggregator>({
    time_allocated: 'AVG',
    time_taken: 'AVG',
    weight: 'AVG',
    score: 'AVG',
    verdict: 'TRUE',
  });

  const total_weights = props.filteredResults.reduce((acc, cur) => acc + cur.question.weight, 0);

  const accumulator = (header: string, contents: Array<any>) => {
    switch (header) {
      case "time_allocated":
      case "time_taken":
      case "weight":
        return Number((contents.reduce((acc, cur) => acc + parseInt(cur), 0) / contents.length).toFixed(2));
      case "score":
        return total_weights !== 0 ? Number((contents.reduce((acc, cur) => acc + parseFloat(cur), 0) / total_weights).toFixed(2)) : 0;
      case "verdict":
        return contents.filter(content => content).length;
      default:
        return null;
    }
  }

  return <div className="Report-Aggregator">
    <Select menuItemLabel={(item) => item} label={"Time Allocated"} items={["MAx", "MIN", "AVG"]} setState={setReportAggregator} stateKey={"time_allocated"} state={reportAggregator} />
  </div>
}