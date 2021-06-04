import { useContext } from "react";
import { ReportContext } from "../../../context/ReportContext";
import { useThemeSettings } from "../../../hooks";
import { Markdown, StackList } from "../../../shared";
import { IResultInputQuestion } from "../../../types";
import { ReportAnswers } from "../ReportAnswers/ReportAnswers";
import { ReportOptions } from "../ReportOptions/ReportOptions";
import { ReportQuestion } from "../ReportQuestion/ReportQuestion";
import "./ReportTable.scss";

export function ReportTable() {
  const { filteredResults, reportFilter } = useContext(ReportContext);

  const { theme } = useThemeSettings();
  return <div className="Report-Table" style={{ backgroundColor: theme.color.base, color: theme.palette.text.primary }}>
    {filteredResults.map(filteredResult =>
      <div key={filteredResult.question._id} className="Report-Table-item" style={{ backgroundColor: theme.color.dark }}>
        <ReportQuestion question={filteredResult.question} />
        <div className="Report-Table-item-stats">
          {!reportFilter.excluded_columns.includes('question_stats') ? <StackList header="Question Stats" items={[['Type', filteredResult.question.type], ['Difficulty', filteredResult.question.difficulty], ['Time Allocated', filteredResult.question.time_allocated], ['Weight', filteredResult.question.weight]]} /> : null}
          {!reportFilter.excluded_columns.includes('user_stats') ? <StackList header="User Stats" items={[['Time Taken', filteredResult.time_taken], ['Hints Used', filteredResult.hints_used], ['Verdict', <div style={{
            fontWeight: 'bold', color: filteredResult.verdict === false ? "#ff3223" : "#36e336"
          }}>{filteredResult.verdict === false ? "Incorrect" : "Correct"}</div>]]} /> : null}
          {!reportFilter.excluded_columns.includes('score_breakdown') ? <StackList header="Score Breakdown" items={[['Amount', filteredResult.score.amount], ['Answers', filteredResult.score.answers], ['Time', filteredResult.score.time], ['Hints', filteredResult.score.hints]]} /> : null}
        </div>
        <div style={{ display: 'flex' }}>
          {(filteredResult.question.type === "MCQ" || filteredResult.question.type === "MS") ? !reportFilter.excluded_columns.includes('options') ? <ReportOptions question={filteredResult.question} userAnswers={filteredResult.user_answers} /> : null : !reportFilter.excluded_columns.includes('answers') ? <ReportAnswers question={filteredResult.question as IResultInputQuestion} userAnswers={filteredResult.user_answers} /> : null}
          <div style={{ width: '25%' }}>
            {!reportFilter.excluded_columns.includes('quiz_stats') ? <StackList header="Quiz Stats" items={[['Topic', filteredResult.question.quiz.topic], ['Subject', filteredResult.question.quiz.subject]]} /> : null}
            {filteredResult.question.hints.length !== 0 && !reportFilter.excluded_columns.includes('hints') ? <div className="Report-Table-item-hints" style={{ backgroundColor: theme.color.base }}>
              {filteredResult.question.hints.map(hint => <div className="Report-Table-item-hints-item" key={hint} style={{ backgroundColor: theme.color.light }}>
                <Markdown content={hint} />
              </div>)}
            </div> : null}
          </div>
        </div>
      </div>)}
  </div>
}