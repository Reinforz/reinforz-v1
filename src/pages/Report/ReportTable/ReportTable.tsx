import { Typography } from "@material-ui/core";
import { green, red } from "@material-ui/core/colors";
import { useContext, useMemo } from "react";
import { MdDelete } from 'react-icons/md';
import { Hovertips, Markdown, StackList } from "../../../components";
import { ReportContext } from "../../../context/ReportContext";
import { useThemeSettings } from "../../../hooks";
import sounds from "../../../sounds";
import { IResultInputQuestion } from "../../../types";
import { ReportAnswers } from "../ReportAnswers/ReportAnswers";
import { ReportOptions } from "../ReportOptions/ReportOptions";
import { ReportQuestion } from "../ReportQuestion/ReportQuestion";
import "./ReportTable.scss";

export function ReportTable() {
  const { sortedResults, reportSettings, setReport, report } = useContext(ReportContext);
  const { filters } = reportSettings;

  const memoizedReportQuestions = useMemo(() => sortedResults.map(sortedResult => <ReportQuestion question={sortedResult.question} />), [sortedResults]);

  const { settings } = useThemeSettings();
  return <div className="Report-Table p-5 bg-base">
    {sortedResults.map((sortedResult, index) => {
      const showHints = sortedResult.question.hints.length !== 0 && !filters.excluded_columns.includes('hints');
      return <div key={sortedResult.question._id} className="Report-Table-item pb-0 p-5 bg-dark">
        <div className="flex ai-c jc-c bg-dark mb-5">
          {!filters.excluded_columns.includes('quiz_info') ? <Typography className="p-10 bg-light fs-16 bold">{`${sortedResult.question.quiz.subject} - ${sortedResult.question.quiz.topic}`}</Typography> : null}
          <Typography variant="h6" className="Report-Table-item-index bold flex-1 ta-c">{index + 1}</Typography>
          <div className="Report-Table-item-delete flex jc-c c-p" style={{ width: 20 }}><Hovertips popoverText="Delete"><MdDelete fill={red[500]} onClick={() => {
            settings.sound && sounds.remove.play();
            setReport({
              ...report,
              results: report.results.filter(result => result._id !== sortedResult._id)
            })
          }} /></Hovertips></div>
        </div>
        {memoizedReportQuestions[index]}
        <div className="Report-Table-item-stats mb-5">
          {!filters.excluded_columns.includes('question_stats') ? <StackList header="Question Stats" items={[['Type', sortedResult.question.type], ['Difficulty', sortedResult.question.difficulty], ['Time Allocated', sortedResult.question.time_allocated], ['Weight', sortedResult.question.weight]]} classNames={{ container: 'mr-5' }} /> : null}
          {!filters.excluded_columns.includes('user_stats') ? <StackList classNames={{ container: 'mr-5' }} header="User Stats" items={[['Time Taken', sortedResult.time_taken], ['Hints Used', sortedResult.hints_used], ['Verdict', <Typography className="bold" style={{
            color: sortedResult.verdict === false ? red[500] : green[500]
          }}>{sortedResult.verdict === false ? "Incorrect" : "Correct"}</Typography>]]} /> : null}
          {!filters.excluded_columns.includes('score_breakdown') ? <StackList header="Score Breakdown" items={[['Amount', sortedResult.score.amount], ['Answers', sortedResult.score.answers], ['Time', sortedResult.score.time], ['Hints', sortedResult.score.hints], ['Weighted', sortedResult.question.weight * sortedResult.score.amount]]} /> : null}
        </div>
        <div className="flex">
          {(sortedResult.question.type === "MCQ" || sortedResult.question.type === "MS") ? !filters.excluded_columns.includes('options') ? <ReportOptions question={sortedResult.question} userAnswers={sortedResult.user_answers} className={`${showHints ? 'mr-5' : ''}`} /> : null : !filters.excluded_columns.includes('answers') ? <ReportAnswers question={sortedResult.question as IResultInputQuestion} userAnswers={sortedResult.user_answers} className={`${showHints ? 'mr-5' : ''}`} /> : null}
          {showHints ? <div className="Report-Table-item-hints bg-base p-5 ml-5 mb-5" style={{ width: '25%' }}>
            {sortedResult.question.hints.map(hint => <div className="Report-Table-item-hints-item bg-light p-5 mb-5" key={hint}>
              <Markdown content={hint} />
            </div>)}
          </div> : null}
        </div>
      </div>
    })}
  </div>
}