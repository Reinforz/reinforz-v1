import { Typography } from "@mui/material";
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

  return <div className={`Report-Answers bg-base p-5 flex-1 mb-5 pb-0 ${props.className ?? ''}`}>
    {
      question.answers.map((answers, answerIndex) => {
        return <div className="Report-Answers-container mb-5 p-5 pb-0 flex fd-c bg-dark" key={answerIndex}>
          <div className="flex mb-5">
            <Typography className="flex p-10 jc-c ai-c bold fs-18 mr-5">{answerIndex + 1}</Typography>
            <Typography className="Report-Answers-container-userAnswer bg-light p-5 bold flex jc-c ai-c ta-c fs-18 flex-1">{userAnswers[answerIndex] ?? 'N/A'}</Typography>
          </div>
          {answers.map((answer, alternateIndex) => <div className="Report-Answers-container-item pb-0 mb-5 bg-base p-5" key={alternateIndex}>
            <div className="mb-5 flex jc-sb">
              <Typography className="flex p-10 jc-c ai-c bold fs-16 mr-5">{alternateIndex + 1}</Typography>
              <Typography className="Report-Answers-container-item-text bg-light p-10 flex-1 ai-c flex">{answer.text}</Typography>
              {answer.regex ? <Typography className="Report-Answers-container-item-regex bg-light p-10 ml-5 bold">{answer.regex.regex ? "/" + answer.regex.regex + "/" : 'N/A'}{answer.regex.flags ? answer.regex.flags : ''}</Typography> : null}
              {answer.modifiers.length !== 0 ? <Typography className="Report-Answers-container-item-modifiers bg-light p-10 ml-5 bold">{answer.modifiers.join(",")}</Typography> : null}
              {answer.isCorrect && <div style={{ width: 50 }} className="Report-Answers-container-item-isCorrect bg-light flex ai-c ml-5 jc-c"> <AiFillCheckSquare fill={green[500]} style={{ padding: 5 }} size={20} /></div>}
            </div>
            {answer?.explanation ? <div className="Report-Answers-container-item-explanation bg-light mb-5 p-5">
              <Markdown content={answer.explanation} />
            </div> : null}
          </div>)}
        </div>
      })
    }
  </div>
}