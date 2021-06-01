import { useThemeSettings } from "../../../hooks";
import { TQuestionResult } from "../../../types";
import "./ReportTable.scss";
interface Props {
  filteredResults: TQuestionResult[]
}

export function ReportTable(props: Props) {
  const { theme } = useThemeSettings();

  return <div className="Report-Table" style={{ backgroundColor: theme.color.base }}>
    {props.filteredResults.map(filteredResult => {
      return <div className="Report-Table-item" key={filteredResult.question._id}>
        <div className="Report-Table-item-question">
          {filteredResult.question.question}
        </div>
      </div>
    })}
  </div>
}