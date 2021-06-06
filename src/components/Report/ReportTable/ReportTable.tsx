import { useContext } from "react";
import { MdDelete } from 'react-icons/md';
import { ReportContext } from "../../../context/ReportContext";
import { useThemeSettings } from "../../../hooks";
import { Icon, Markdown, StackList } from "../../../shared";
import { IResultInputQuestion } from "../../../types";
import { ReportAnswers } from "../ReportAnswers/ReportAnswers";
import { ReportOptions } from "../ReportOptions/ReportOptions";
import { ReportQuestion } from "../ReportQuestion/ReportQuestion";
import "./ReportTable.scss";

export function ReportTable() {
  const { sortedResults, reportFilter, setReport, report } = useContext(ReportContext);

  const { theme } = useThemeSettings();
  return <div className="Report-Table" style={{ backgroundColor: theme.color.base, color: theme.palette.text.primary }}>
    {sortedResults.map((sortedResult, index) =>
      <div key={sortedResult.question._id} className="Report-Table-item" style={{ backgroundColor: theme.color.dark }}>
        <div style={{ padding: 2.5, margin: 2.5, display: 'flex', alignItems: 'center' }}>
          <div className="Report-Table-item-index">{index + 1}</div>
          <div className="Report-Table-item-delete" style={{ width: 20 }}><Icon popoverText="Delete"><MdDelete fill="#ff3223" onClick={() => {
            setReport({
              ...report,
              results: report.results.filter(result => result._id !== sortedResult._id)
            })
          }} /></Icon></div>
        </div>
        <ReportQuestion question={sortedResult.question} />
        <div className="Report-Table-item-stats">
          {!reportFilter.excluded_columns.includes('question_stats') ? <StackList header="Question Stats" items={[['Type', sortedResult.question.type], ['Difficulty', sortedResult.question.difficulty], ['Time Allocated', sortedResult.question.time_allocated], ['Weight', sortedResult.question.weight]]} /> : null}
          {!reportFilter.excluded_columns.includes('user_stats') ? <StackList header="User Stats" items={[['Time Taken', sortedResult.time_taken], ['Hints Used', sortedResult.hints_used], ['Verdict', <div style={{
            fontWeight: 'bold', color: sortedResult.verdict === false ? "#ff3223" : "#36e336"
          }}>{sortedResult.verdict === false ? "Incorrect" : "Correct"}</div>]]} /> : null}
          {!reportFilter.excluded_columns.includes('score_breakdown') ? <StackList header="Score Breakdown" items={[['Amount', sortedResult.score.amount], ['Answers', sortedResult.score.answers], ['Time', sortedResult.score.time], ['Hints', sortedResult.score.hints]]} /> : null}
        </div>
        <div style={{ display: 'flex' }}>
          {(sortedResult.question.type === "MCQ" || sortedResult.question.type === "MS") ? !reportFilter.excluded_columns.includes('options') ? <ReportOptions question={sortedResult.question} userAnswers={sortedResult.user_answers} /> : null : !reportFilter.excluded_columns.includes('answers') ? <ReportAnswers question={sortedResult.question as IResultInputQuestion} userAnswers={sortedResult.user_answers} /> : null}
          {reportFilter.excluded_columns.includes('quiz_stats') && reportFilter.excluded_columns.includes('hints') ? null : <div style={{ width: '25%' }}>
            {!reportFilter.excluded_columns.includes('quiz_stats') ? <StackList header="Quiz Stats" items={[['Topic', sortedResult.question.quiz.topic], ['Subject', sortedResult.question.quiz.subject]]} /> : null}
            {sortedResult.question.hints.length !== 0 && !reportFilter.excluded_columns.includes('hints') ? <div className="Report-Table-item-hints" style={{ backgroundColor: theme.color.base }}>
              {sortedResult.question.hints.map(hint => <div className="Report-Table-item-hints-item" key={hint} style={{ backgroundColor: theme.color.light }}>
                <Markdown content={hint} />
              </div>)}
            </div> : null}
          </div>}
        </div>
      </div>)}
  </div>
}