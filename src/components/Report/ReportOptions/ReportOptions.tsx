import { AiFillCheckSquare } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { useThemeSettings } from "../../../hooks";
import { Markdown } from "../../../shared/Markdown";
import { IResultSelectionQuestion } from "../../../types";
import "./ReportOptions.scss";

interface Props {
  question: IResultSelectionQuestion
  userAnswers: string[]
}

export function ReportOptions(props: Props) {
  const { question } = props;
  const { theme } = useThemeSettings();

  return <div className="Report-Options" style={{ backgroundColor: theme.color.base }}>
    {question.options.map((option, index) => {
      return <div className="Report-Options-container" style={{ backgroundColor: theme.color.dark }} key={option.text}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ backgroundColor: theme.color.light, padding: 10 }} className="Report-Options-container-item Report-Options-container-item--text">
            <Markdown content={option.text} />
          </div>
          <div style={{ backgroundColor: theme.color.light }} className="Report-Options-container-item">
            {option.isCorrect ? <AiFillCheckSquare fill="#24ce2c" style={{ padding: 5 }} size={15} /> : <MdCancel fill="#ff3d2f" style={{ padding: 5 }} size={15} />}
            {option.userSelected ? <FaUser fill={theme.palette.text.primary} style={{ padding: 5 }} size={15} /> : null}
          </div>
        </div>
        {question.answers[index]?.explanation ? <div style={{ backgroundColor: theme.color.light, padding: 5, margin: 2.5 }} className="Report-Options-container-item-explanation">
          <Markdown content={question.answers[index].explanation!} />
        </div> : null}
      </div>
    })}
  </div>

}