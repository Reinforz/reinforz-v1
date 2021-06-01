import { useThemeSettings } from "../../../hooks";
import { StackList } from "../../../shared";
import { TQuestionResult } from "../../../types";
import "./ReportTable.scss";
interface Props {
  filteredResults: TQuestionResult[]
}

export function ReportTable(props: Props) {
  const { theme } = useThemeSettings();

  return <div className="Report-Table" style={{ backgroundColor: theme.color.base, color: theme.palette.text.primary }}>
    {props.filteredResults.map(filteredResult => {
      return <div key={filteredResult.question._id} className="Report-Table-item" style={{ backgroundColor: theme.color.dark }}>
        <div className="Report-Table-item-question" style={{ backgroundColor: theme.color.light }}>
          {filteredResult.question.question}
        </div>
        <StackList header="Question Stats" items={[['Type', filteredResult.question.type], ['Difficulty', filteredResult.question.difficulty], ['Time Allocated', filteredResult.question.time_allocated], ['Weight', filteredResult.question.weight]]} />
      </div>
    })}
  </div>
}