import { AiFillCheckSquare } from "react-icons/ai";
import { FaUser, FaUserSlash } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { useThemeSettings } from "../../../hooks";
import { TResultQuestion } from "../../../types";
import { sanitizeMarkdown } from "../../../utils";
import "./ReportAnswers.scss";

interface Props {
  question: TResultQuestion
  userAnswers: string[]
}

export function ReportAnswers(props: Props) {
  const { userAnswers, question } = props;
  const { theme } = useThemeSettings();

  const render = () => {
    if (question.type === "MS" || question.type === "MCQ") {
      const answers = question.answers.map(answer => answer.text)
      return question.options.sort((optionA, optionB) => parseInt(optionA.index) > parseInt(optionB.index) ? 1 : -1).map((option, index) => {
        const answerIndex = answers.findIndex(answer => answer === index.toString());
        const isCorrectAnswer = answerIndex !== -1;
        const isUserCorrect = userAnswers.includes(index.toString());
        return <div className="Report-Answers-container" style={{ backgroundColor: theme.color.dark }} key={option.text}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ backgroundColor: theme.color.light, padding: 10 }} className="Report-Answers-container-item Report-Answers-container-item--text" dangerouslySetInnerHTML={{ __html: sanitizeMarkdown(option.text ?? '') }}></div>
            <div style={{ backgroundColor: theme.color.light, width: 50, display: 'flex', alignItems: 'center' }} className="Report-Answers-container-item">
              {isCorrectAnswer ? <AiFillCheckSquare fill="#24ce2c" style={{ padding: 5 }} size={15} /> : <MdCancel fill="#ff3d2f" style={{ padding: 5 }} size={15} />}
              {isUserCorrect ? <FaUser fill="#24ce2c" style={{ padding: 5 }} size={15} /> : <FaUserSlash fill="#ff3d2f" style={{ padding: 5 }} size={15} />}
            </div>
          </div>
          {question.answers[answerIndex]?.explanation ? <div style={{ backgroundColor: theme.color.light, padding: 10 }} className="Report-Answers-container-item Report-Answers-container-item--explanation" dangerouslySetInnerHTML={{ __html: sanitizeMarkdown(question.answers[answerIndex].explanation ?? '') }}></div> : null}
        </div>
      })
    }
    else {
      return null;
    }
  }
  return <div className="Report-Answers" style={{ backgroundColor: theme.color.base }}>
    {
      render()
    }
  </div>

}