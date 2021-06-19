import { Typography } from "@material-ui/core";
import { green, red } from "@material-ui/core/colors";
import { AiFillCheckSquare } from "react-icons/ai";
import { MdCancel } from "react-icons/md";
import { Markdown } from "../../../components";
import { IResultInputQuestion } from "../../../types";
import "./ReportAnswers.scss";

interface Props {
  question: IResultInputQuestion
  userAnswers: string[]
}

export function ReportAnswers(props: Props) {
  const { question, userAnswers } = props;

  return <div className="Report-Answers bg-base p-5 flex-1 mb-5 pb-0">
    {
      question.answers.map((answers, index) => {
        return <div className="Report-Answers-container mb-5 p-5 pb-0 flex fd-c bg-dark" key={index}>
          <Typography className="Report-Answers-container-userAnswer bg-light p-5 bold flex jc-c ai-c ta-c fs-18 mb-5">{userAnswers[index] ?? 'N/A'}</Typography>
          {answers.map((answer, _index) => <div className="Report-Answers-container-item pb-0 mb-5 bg-base p-5" key={_index}>
            <div className="mb-5 flex jc-sb">
              <Typography className="Report-Answers-container-item-text bg-light p-10 flex-1 mr-5 ai-c flex">{answer.text}</Typography>
              <div style={{ width: 50 }} className="Report-Answers-container-item-isCorrect bg-light flex ai-c jc-c p-">
                {answer.isCorrect ? <AiFillCheckSquare fill={green[500]} style={{ padding: 5 }} size={20} /> : <MdCancel fill={red[500]} style={{ padding: 5 }} size={20} />}
              </div>
            </div>
            {answer.regex || answer.modifiers.length !== 0 ? <div className="flex mb-5 jc-sb bold">
              {answer.regex ? <Typography className="Report-Answers-container-item-regex bg-light p-10">/{answer.regex.regex ?? 'N/A'}/{answer.regex.flags ?? 'N/A'}</Typography> : null}
              {answer.modifiers.length !== 0 ? <Typography className="Report-Answers-container-item-modifiers bg-light p-10">{answer.modifiers.join(",")}</Typography> : null}
            </div> : null}
            {answer?.explanation ? <div className="Report-Answers-container-item-explanation bg-light mb-5">
              <Markdown content={answer.explanation} />
            </div> : null}
          </div>)}
        </div>
      })
    }
  </div>
}