import { useContext } from "react";
import { ReportContext } from "../../../context/ReportContext";
import { useThemeSettings } from "../../../hooks";
import { StackList } from "../../../shared";
import { IResultInputQuestion } from "../../../types";
import { ReportAnswers } from "../ReportAnswers/ReportAnswers";
import { ReportOptions } from "../ReportOptions/ReportOptions";
import { ReportQuestion } from "../ReportQuestion/ReportQuestion";
import "./ReportTable.scss";

export function ReportTable() {
  const { filteredResults } = useContext(ReportContext);

  const { theme } = useThemeSettings();
  return <div className="Report-Table" style={{ backgroundColor: theme.color.base, color: theme.palette.text.primary }}>
    {filteredResults.map(filteredResult =>
      <div key={filteredResult.question._id} className="Report-Table-item" style={{ backgroundColor: theme.color.dark }}>
        <ReportQuestion question={filteredResult.question} />
        <div className="Report-Table-item-stats">
          <StackList header="Question Stats" items={[['Type', filteredResult.question.type], ['Difficulty', filteredResult.question.difficulty], ['Time Allocated', filteredResult.question.time_allocated], ['Weight', filteredResult.question.weight]]} />
          <StackList header="User Stats" items={[['Time Taken', filteredResult.time_taken], ['Hints Used', filteredResult.hints_used], ['Verdict', <div style={{
            fontWeight: 'bold', color: filteredResult.verdict === false ? "#ff3223" : "#36e336"
          }}>{filteredResult.verdict === false ? "Incorrect" : "Correct"}</div>]]} />
          <StackList header="Score Breakdown" items={[['Amount', filteredResult.score.amount], ['Answers', filteredResult.score.answers], ['Time', filteredResult.score.time], ['Hints', filteredResult.score.hints]]} />
        </div>
        <div style={{ display: 'flex' }}>
          {(filteredResult.question.type === "MCQ" || filteredResult.question.type === "MS") ? <ReportOptions question={filteredResult.question} userAnswers={filteredResult.user_answers} /> : <ReportAnswers question={filteredResult.question as IResultInputQuestion} userAnswers={filteredResult.user_answers} />}
          <div style={{ width: '25%' }}>
            <StackList header="Quiz Stats" items={[['Topic', filteredResult.question.quiz.topic], ['Subject', filteredResult.question.quiz.subject]]} />
            {filteredResult.question.hints.length !== 0 ? <div className="Report-Table-item-hints" style={{ backgroundColor: theme.color.base }}>
              {filteredResult.question.hints.map(hint => <div className="Report-Table-item-hints-item" key={hint} style={{ backgroundColor: theme.color.light }}>
                {hint}
              </div>)}
            </div> : null}
          </div>
        </div>
      </div>)}
  </div>
}