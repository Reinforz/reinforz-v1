import { Box, Typography } from "@mui/material";
import { green, red } from "@mui/material/colors";
import { ReactNode, useContext, useMemo, useState } from "react";
import { BsFillCaretLeftFill, BsFillCaretRightFill, BsFilm } from "react-icons/bs";
import { ImCross } from "react-icons/im";
import { MdDelete } from 'react-icons/md';
import { Hovertips, Markdown, StackList } from "../../../components";
import { QuestionDisplay } from "../../../components/QuestionDisplay";
import { ModalContext } from "../../../context/ModalContext";
import { ReportContext } from "../../../context/ReportContext";
import { useThemeSettings } from "../../../hooks";
import useSounds from "../../../hooks/useSounds";
import { IQuestionResult, TInputQuestionResult } from "../../../types";
import { ReportAnswers } from "../ReportAnswers/ReportAnswers";
import { ReportOptions } from "../ReportOptions/ReportOptions";
import "./ReportTable.scss";

interface ReportTableRowProps {
  results: IQuestionResult[],
  header: ReactNode,
  reportQuestions: ReactNode[],
  index: number,
  excludedColumns: Record<string, boolean>
  style?: {
    header?: React.CSSProperties
    content?: React.CSSProperties
    container?: React.CSSProperties
  }
  quiz: string
};

function ReportTableModal(props: ReportTableRowProps) {
  const { setModalState } = useContext(ModalContext);
  const [currentIndex, setCurrentIndex] = useState(props.index)
  return <ReportTableRow {...props} index={currentIndex} header={<Typography className="bold flex justify-between items-center mr-2" style={{ width: 100 }}><Hovertips popoverText="Move left">
    <BsFillCaretLeftFill onClick={() => setCurrentIndex((currentIndex) => (currentIndex === 0 ? props.results.length - 1 : currentIndex - 1))} /></Hovertips>{currentIndex + 1}/{props.results.length}<Hovertips popoverText="Move left">
      <BsFillCaretRightFill onClick={() => setCurrentIndex((currentIndex) => ((currentIndex + 1) % props.results.length))} /></Hovertips><Hovertips popoverText="Go back"><ImCross size={15} fill={red[500]} onClick={() => setModalState([false, null])} /></Hovertips></Typography>} />
}

function ReportTableRow(props: ReportTableRowProps) {
  const { reportQuestions, index, results, header, excludedColumns, style = {}, quiz } = props;
  const result = results[index];
  const showHints = result.question.hints.length !== 0 && !excludedColumns['hints'];
  return <Box key={result.question._id} className="ReportTableRow pb-0 p-1 bg-dark" style={style.container}>
    <Box className="ReportTableRow-header flex items-center justify-center bg-dark mb-1" style={style.header}>
      {!excludedColumns['quiz_info'] ? <Typography className="p-10 bg-light fs-16 bold">{quiz}</Typography> : null}
      <Typography variant="h6" className="ReportTableRow-index bold flex-1 text-center">{index + 1}</Typography>
      {header}
    </Box>
    <Box className="ReportTableRow-content" style={style.content}>
      {reportQuestions[index]}
      <Box className="ReportTableRow-content-stats mb-1 overflow-x-auto">
        {!excludedColumns['question_stats'] ? <StackList header="Question Stats" items={[['Type', result.question.type], ['Difficulty', result.question.difficulty], ['Time Allocated', result.question.time_allocated], ['Weight', result.question.weight]]} classNames={{ container: 'mr-1' }} /> : null}
        {!excludedColumns['user_stats'] ? <StackList classNames={{ container: 'mr-1' }} header="User Stats" items={[['Time Taken', result.time_taken], ['Hints Used', result.hints_used], ['Verdict', <Typography className="bold" style={{
          color: result.verdict === false ? red[500] : green[500]
        }}>{result.verdict === false ? "Incorrect" : "Correct"}</Typography>]]} /> : null}
        {!excludedColumns['score_breakdown'] ? <StackList header="Score Breakdown" items={[['Amount', result.score.amount], ['Answers', result.score.answers], ['Time', result.score.time], ['Hints', result.score.hints], ['Weighted', result.question.weight * result.score.amount]]} /> : null}
      </Box>
      <Box className="flex">
        {(result.question.type === "MCQ" || result.question.type === "MS") ? !excludedColumns['options'] ? <ReportOptions question={result.question} userAnswers={result.user_answers} className={`${showHints ? 'mr-1' : ''}`} /> : null : !excludedColumns['answers'] ? <ReportAnswers question={result.question as TInputQuestionResult} userAnswers={result.user_answers} className={`${showHints ? 'mr-1' : ''}`} /> : null}
        {showHints ? <Box className="ReportTableRow-content-hints bg-base p-1 mb-1" style={{ width: '25%' }}>
          {result.question.hints.map(hint => <Box className="ReportTableRow-content-hints overflow-x-auto bg-light p-1 mb-1" key={hint}>
            <Markdown content={hint} />
          </Box>)}
        </Box> : null}
      </Box>
    </Box>
  </Box>
}

export function ReportTable() {
  const { setReport, sortedResults, excludedColumns, report } = useContext(ReportContext);
  const { theme } = useThemeSettings();
  const { setModalState } = useContext(ModalContext);
  const { remove } = useSounds();

  const memoizedReportQuestions = useMemo(() => sortedResults.map(sortedResult => <QuestionDisplay contexts={report.quizzes[sortedResult.question.quiz].contexts} question={sortedResult.question} userAnswers={sortedResult.user_answers} showContexts={!excludedColumns['contexts']} showImage={Boolean(!excludedColumns["image"])} showQuestion={!excludedColumns["question"]} />), [report, sortedResults, excludedColumns]);
  return <Box className="ReportTable flex-1 p-1 bg-base overflow-y-auto">
    {sortedResults.map((sortedResult, index) => {
      const quiz = report.quizzes[sortedResult.question.quiz];
      return <ReportTableRow quiz={`${quiz.subject} - ${quiz.topic}`} key={sortedResult._id} reportQuestions={memoizedReportQuestions} index={index} results={sortedResults} excludedColumns={excludedColumns} header={<Box className="ReportTable-item-icons flex justify-between cursor-pointer items-center" style={{ width: 40 }}><Hovertips popoverText="View separate"><BsFilm fill={theme.palette.color.opposite_dark} size={15} onClick={() => {
        setModalState([true, <ReportTableModal quiz={`${quiz.subject} - ${quiz.topic}`} style={{
          content: {
            height: "calc(100% - 60px)",
            overflowY: 'auto'
          },
          container: {
            height: '100%'
          }
        }} reportQuestions={memoizedReportQuestions} index={index} results={sortedResults} excludedColumns={excludedColumns} header={null} />])
      }} /></Hovertips>
        <Hovertips popoverText="Delete"><MdDelete size={20} fill={red[500]} onClick={() => {
          remove();
          setReport({
            ...report,
            results: report.results.filter(result => result._id !== sortedResult._id)
          })
        }} /></Hovertips></Box>} />
    })}
  </Box>
}