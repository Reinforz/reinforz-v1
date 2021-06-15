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

  return <div className="Report-Answers bg-base">
    {
      question.answers.map((answers, index) => {
        return <div className="Report-Answers-container bg-dark" key={index}>
          <div className="Report-Answers-container-userAnswer bg-light">{userAnswers[index] ?? 'N/A'}</div>
          {answers.map((answer, _index) => <div className="Report-Answers-container-item bg-base" key={_index}>
            <div style={{ marginBottom: 5, display: 'flex', justifyContent: 'space-between' }}>
              <div className="Report-Answers-container-item-text bg-light">{answer.text}</div>
              <div style={{ width: 50 }} className="Report-Answers-container-item-isCorrect bg-light">
                {answer.isCorrect ? <AiFillCheckSquare fill={green[500]} style={{ padding: 5 }} size={20} /> : <MdCancel fill={red[500]} style={{ padding: 5 }} size={20} />}
              </div>
            </div>
            {answer.regex || answer.modifiers.length !== 0 ? <div style={{ display: 'flex', marginBottom: 5, justifyContent: 'space-between', fontWeight: 'bold' }}>
              {answer.regex ? <span style={{ padding: 10 }} className="Report-Answers-container-item-regex bg-light">/{answer.regex.regex ?? 'N/A'}/{answer.regex.flags ?? 'N/A'}</span> : null}
              {answer.modifiers.length !== 0 ? <span style={{ padding: 10 }} className="Report-Answers-container-item-modifiers bg-light">{answer.modifiers.join(",")}</span> : null}
            </div> : null}
            {answer?.explanation ? <div className="Report-Answers-container-item-explanation bg-light">
              <Markdown content={answer.explanation} />
            </div> : null}
          </div>)}
        </div>
      })
    }
  </div>
}