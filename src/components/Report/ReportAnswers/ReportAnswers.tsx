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

  return <div className="Report-Answers" style={{ backgroundColor: theme.color.base }}>
    {
      question.answers.map((answers, index) => {
        return <div className="Report-Answers-container" key={index} style={{ backgroundColor: theme.color.dark }}>
          <div className="Report-Answers-container-userAnswer" style={{ backgroundColor: theme.color.light }}>{userAnswers[index] ?? 'N/A'}</div>
          {answers.map((answer, _index) => <div className="Report-Answers-container-item" key={_index} style={{ backgroundColor: theme.color.base }}>
            <div style={{ display: 'flex', marginBottom: 5, justifyContent: 'space-between' }}>
              <div style={{ backgroundColor: theme.color.light, padding: 10 }} className="Report-Answers-container-item-text" dangerouslySetInnerHTML={{ __html: sanitizeMarkdown(answer.text ?? '') }}></div>
              <div style={{ backgroundColor: theme.color.light, width: 50 }} className="Report-Answers-container-item-isCorrect">
                {answer.isCorrect ? <AiFillCheckSquare fill="#24ce2c" style={{ padding: 5 }} size={20} /> : <MdCancel fill="#ff3d2f" style={{ padding: 5 }} size={20} />}
              </div>
            </div>
            <div style={{ display: 'flex', marginBottom: 5, justifyContent: 'space-between', fontWeight: 'bold' }}>
              {answer.regex ? <span style={{ padding: 10, background: theme.color.light }} className="Report-Answers-container-item-regex">/{answer.regex.regex ?? 'N/A'}/{answer.regex.flags ?? 'N/A'}</span> : null}
              {answer.modifiers.length !== 0 ? <span style={{ padding: 10, background: theme.color.light }} className="Report-Answers-container-item-modifiers">{answer.modifiers.join(",")}</span> : null}
            </div>
            {answer?.explanation ? <div style={{ backgroundColor: theme.color.light, padding: 10 }} className="Report-Answers-container-item-explanation" dangerouslySetInnerHTML={{ __html: sanitizeMarkdown(answer.explanation ?? '') }}></div> : null}
          </div>)}
        </div>
      })
    }
  </div>
}