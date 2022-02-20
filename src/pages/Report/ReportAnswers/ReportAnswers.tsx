import { Box, Typography } from "@mui/material";
import { green } from "@mui/material/colors";
import { AiFillCheckSquare } from "react-icons/ai";
import { Markdown } from "../../../components";
import { TInputQuestionResult } from "../../../types";
import "./ReportAnswers.scss";

interface Props {
  question: TInputQuestionResult
  userAnswers: string[]
  className?: string
}

export function ReportAnswers(props: Props) {
  const { question, userAnswers } = props;

  return <Box className={`Report-Answers bg-base p-1 flex-1 mb-1 pb-0 ${props.className ?? ''}`}>
    {
      question.answers.map((answers, answerIndex) => {
        return <Box className="Report-Answers-container mb-1 p-1 pb-0 flex flex-col bg-dark" key={answerIndex}>
          <Box className="flex mb-1">
            <Typography className="flex p-10 justify-center items-center bold fs-18 mr-1">{answerIndex + 1}</Typography>
            <Typography className="Report-Answers-container-userAnswer bg-light p-1 bold flex justify-center items-center text-center fs-18 flex-1">{userAnswers[answerIndex] ?? 'N/A'}</Typography>
          </Box>
          {answers.map((answer, alternateIndex) => <Box className="Report-Answers-container-item pb-0 mb-1 bg-base p-1" key={alternateIndex}>
            <Box className="mb-1 flex justify-between">
              <Typography className="flex p-10 justify-center items-center bold text-base mr-1">{alternateIndex + 1}</Typography>
              <Typography className="Report-Answers-container-item-text bg-light p-10 flex-1 items-center flex">{answer.text}</Typography>
              {answer.regex ? <Typography className="Report-Answers-container-item-regex bg-light p-10 ml-1 bold">{answer.regex.regex ? "/" + answer.regex.regex + "/" : 'N/A'}{answer.regex.flags ? answer.regex.flags : ''}</Typography> : null}
              {answer.modifiers.length !== 0 ? <Typography className="Report-Answers-container-item-modifiers bg-light p-10 ml-1 bold">{answer.modifiers.join(",")}</Typography> : null}
              {answer.isCorrect && <Box style={{ width: 50 }} className="Report-Answers-container-item-isCorrect bg-light flex items-center ml-1 justify-center"> <AiFillCheckSquare fill={green[500]} style={{ padding: 5 }} size={20} /></Box>}
            </Box>
            {answer?.explanation ? <Box className="Report-Answers-container-item-explanation bg-light mb-1 p-1">
              <Markdown content={answer.explanation} />
            </Box> : null}
          </Box>)}
        </Box>
      })
    }
  </Box>
}