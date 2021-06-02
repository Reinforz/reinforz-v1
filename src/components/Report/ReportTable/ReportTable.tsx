import { useThemeSettings } from "../../../hooks";
import { StackList } from "../../../shared";
import { TQuestionResult } from "../../../types";
import { ReportAnswers } from "../ReportAnswers/ReportAnswers";
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
        <div className="Report-Table-item-stats">
          <StackList header="Question Stats" items={[['Type', filteredResult.question.type], ['Difficulty', filteredResult.question.difficulty], ['Time Allocated', filteredResult.question.time_allocated], ['Weight', filteredResult.question.weight]]} />
          <StackList header="User Stats" items={[['Time Taken', filteredResult.time_taken], ['Hints Used', filteredResult.hints_used], ['Score', filteredResult.score], ['Verdict', <div style={{
            fontWeight: 'bold', color: filteredResult.verdict === false ? "#ff3223" : "#36e336"
          }}>{filteredResult.verdict === false ? "Incorrect" : "Correct"}</div>]]} />
        </div>
        <ReportAnswers question={filteredResult.question} userAnswers={filteredResult.user_answers} />
      </div>
    })}
  </div>
}