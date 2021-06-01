import { TQuestionResult } from "../../../types";

interface Props {
  filteredResults: TQuestionResult[]
}

export function ReportTable(props: Props) {
  return <div className="Report-Table">
    {props.filteredResults.map(filteredResult => {
      return <div>
        {filteredResult.question.question}
      </div>
    })}
  </div>
}