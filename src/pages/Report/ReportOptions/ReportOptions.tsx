import { green } from "@material-ui/core/colors";
import { AiFillCheckSquare } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import { Markdown } from "../../../components";
import { useThemeSettings } from "../../../hooks";
import { IResultSelectionQuestion } from "../../../types";
import "./ReportOptions.scss";

interface Props {
  question: IResultSelectionQuestion
  userAnswers: string[]
}

export function ReportOptions(props: Props) {
  const { question } = props;
  const { theme } = useThemeSettings();

  return <div className="Report-Options bg-base">
    {question.options.map((option, index) => {
      return <div className="Report-Options-container bg-dark" key={option.text}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ backgroundColor: theme.color.light, padding: 10 }} className="Report-Options-container-item Report-Options-container-item-text">
            <Markdown content={option.text} />
          </div>
          {(option.isCorrect || option.userSelected) ? <div style={{ backgroundColor: theme.color.light }} className="Report-Options-container-item">
            {option.isCorrect ? <AiFillCheckSquare fill={green[500]} style={{ padding: 5 }} size={17.5} /> : null}
            {option.userSelected ? <FaUser fill={theme.palette.text.primary} style={{ padding: 5 }} size={17.5} /> : null}
          </div> : null}
        </div>
        {question.answers[index]?.explanation ? <div style={{ backgroundColor: theme.color.light }} className="Report-Options-container-item-explanation">
          <Markdown content={question.answers[index].explanation!} />
        </div> : null}
      </div>
    })}
  </div>

}