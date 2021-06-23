import { Typography } from "@material-ui/core";
import { green, red } from "@material-ui/core/colors";
import { ReactNode, useContext, useMemo } from "react";
import { BsFilm } from "react-icons/bs";
import { MdDelete } from 'react-icons/md';
import { Hovertips, Markdown, StackList } from "../../../components";
import { QuestionDisplay } from "../../../components/QuestionDisplay";
import { ModalContext } from "../../../context/ModalContext";
import { ReportContext } from "../../../context/ReportContext";
import { useThemeSettings } from "../../../hooks";
import sounds from "../../../sounds";
import { IResult, TResultInputQuestion } from "../../../types";
import { ReportAnswers } from "../ReportAnswers/ReportAnswers";
import { ReportOptions } from "../ReportOptions/ReportOptions";
import "./ReportTable.scss";

interface ReportTableRowProps {
  results: IResult[],
  header: ReactNode,
  reportQuestion: ReactNode,
  index: number,
  excludedColumns: Record<string, boolean>
  style?: React.CSSProperties
};

function ReportTableModal(props: ReportTableRowProps) {
  return <ReportTableRow {...props} />
}

function ReportTableRow(props: ReportTableRowProps) {
  const { reportQuestion, index, results, header, excludedColumns, style } = props;
  const result = results[index];
  const showHints = result.question.hints.length !== 0 && !excludedColumns['hints'];
  return <div key={result.question._id} className="ReportTable-item pb-0 p-5 bg-dark" style={style}>
    <div className="flex ai-c jc-c bg-dark mb-5">
      {!excludedColumns['quiz_info'] ? <Typography className="p-10 bg-light fs-16 bold">{`${result.question.quiz.subject} - ${result.question.quiz.topic}`}</Typography> : null}
      <Typography variant="h6" className="ReportTable-item-index bold flex-1 ta-c">{index + 1}</Typography>
      {header}
    </div>
    {reportQuestion}
    <div className="ReportTable-item-stats mb-5">
      {!excludedColumns['question_stats'] ? <StackList header="Question Stats" items={[['Type', result.question.type], ['Difficulty', result.question.difficulty], ['Time Allocated', result.question.time_allocated], ['Weight', result.question.weight]]} classNames={{ container: 'mr-5' }} /> : null}
      {!excludedColumns['user_stats'] ? <StackList classNames={{ container: 'mr-5' }} header="User Stats" items={[['Time Taken', result.time_taken], ['Hints Used', result.hints_used], ['Verdict', <Typography className="bold" style={{
        color: result.verdict === false ? red[500] : green[500]
      }}>{result.verdict === false ? "Incorrect" : "Correct"}</Typography>]]} /> : null}
      {!excludedColumns['score_breakdown'] ? <StackList header="Score Breakdown" items={[['Amount', result.score.amount], ['Answers', result.score.answers], ['Time', result.score.time], ['Hints', result.score.hints], ['Weighted', result.question.weight * result.score.amount]]} /> : null}
    </div>
    <div className="flex">
      {(result.question.type === "MCQ" || result.question.type === "MS") ? !excludedColumns['options'] ? <ReportOptions question={result.question} userAnswers={result.user_answers} className={`${showHints ? 'mr-5' : ''}`} /> : null : !excludedColumns['answers'] ? <ReportAnswers question={result.question as TResultInputQuestion} userAnswers={result.user_answers} className={`${showHints ? 'mr-5' : ''}`} /> : null}
      {showHints ? <div className="ReportTable-item-hints bg-base p-5 mb-5" style={{ width: '25%' }}>
        {result.question.hints.map(hint => <div className="ReportTable-item-hints-item bg-light p-5 mb-5" key={hint}>
          <Markdown content={hint} />
        </div>)}
      </div> : null}
    </div>
  </div>
}

export function ReportTable() {
  const { sortedResults, excludedColumns } = useContext(ReportContext);
  const { settings, theme } = useThemeSettings();
  const { setModalState } = useContext(ModalContext);
  const { setReport, report } = useContext(ReportContext);
  const memoizedReportQuestions = useMemo(() => sortedResults.map(sortedResult => <QuestionDisplay question={sortedResult.question} userAnswers={sortedResult.user_answers} showImage={Boolean(!excludedColumns["image"] && sortedResult.question.image)} showQuestion={!excludedColumns["question"]} />), [sortedResults, excludedColumns]);
  return <div className="ReportTable p-5 bg-base overflowY-auto">
    {sortedResults.map((sortedResult, index) => <ReportTableRow key={sortedResult._id} reportQuestion={memoizedReportQuestions[index]} index={index} results={sortedResults} excludedColumns={excludedColumns} header={<div className="ReportTable-item-icons flex jc-sb c-p ai-c" style={{ width: 40 }}><Hovertips popoverText="View separate"><BsFilm fill={theme.color.opposite_dark} size={15} onClick={() => {
      setModalState([true, <ReportTableModal style={{
        height: "100%",
        overflowY: 'auto'
      }} reportQuestion={memoizedReportQuestions[index]} index={index} results={sortedResults} excludedColumns={excludedColumns} header={null} />])
    }} /></Hovertips>
      <Hovertips popoverText="Delete"><MdDelete size={20} fill={red[500]} onClick={() => {
        settings.sound && sounds.remove.play();
        setReport({
          ...report,
          results: report.results.filter(result => result._id !== sortedResult._id)
        })
      }} /></Hovertips></div>} />)}
  </div>
}