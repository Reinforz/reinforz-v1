import { AiFillCheckSquare } from "react-icons/ai";
import { MdCancel } from "react-icons/md";
import { useThemeSettings } from "../../../hooks";
import { IResultInputQuestion } from "../../../types";
import { sanitizeMarkdown } from "../../../utils";
import "./ReportAnswers.scss";

interface Props {
  question: IResultInputQuestion
  userAnswers: string[]
}

export function ReportAnswers(props: Props) {
  const { theme } = useThemeSettings();
  const { question, userAnswers } = props;

  return <div className="Report-Answers">
    {
      question.answers.map((answers, index) => {
        return <div className="Report-Answers-container" style={{ backgroundColor: theme.color.dark }} key={index}>
          {answers.map(answer => <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ backgroundColor: theme.color.light, padding: 10 }} className="Report-Answers-container-item Report-Answers-container-item--text" dangerouslySetInnerHTML={{ __html: sanitizeMarkdown(answer.text ?? '') }}></div>
            <div style={{ backgroundColor: theme.color.light, padding: 10 }} className="Report-Answers-container-item Report-Answers-container-item--text" dangerouslySetInnerHTML={{ __html: sanitizeMarkdown(answer.text ?? '') }}></div>
            <div style={{ backgroundColor: theme.color.light }} className="Report-Answers-container-item">
              {answer.isCorrect ? <AiFillCheckSquare fill="#24ce2c" style={{ padding: 5 }} size={15} /> : <MdCancel fill="#ff3d2f" style={{ padding: 5 }} size={15} />}
            </div>
            {answer?.explanation ? <div style={{ backgroundColor: theme.color.light, padding: 10 }} className="Report-Answers-container-item Report-Answers-container-item--explanation" dangerouslySetInnerHTML={{ __html: sanitizeMarkdown(answer.explanation ?? '') }}></div> : null}
          </div>)}
        </div>
      })
    }
  </div>
}