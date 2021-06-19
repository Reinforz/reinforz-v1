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

  return <div className="Report-Options bg-base mb-5 p-5 pb-0 flex-1">
    {question.options.map((option, index) => {
      return <div className="Report-Options-container mb-5 p-5 bg-dark pb-0 flex fd-c" key={option.text}>
        <div className="flex jc-sb mb-5 jc-sb">
          <div className="Report-Options-container-item Report-Options-container-item-text bg-light">
            <Markdown content={option.text} />
          </div>
          {(option.isCorrect || option.userSelected) ? <div className="Report-Options-container-item bg-light flex ai-c jc-c">
            {option.isCorrect ? <AiFillCheckSquare fill={green[500]} style={{ padding: 5 }} size={17.5} /> : null}
            {option.userSelected ? <FaUser fill={theme.palette.text.primary} style={{ padding: 5 }} size={17.5} /> : null}
          </div> : null}
        </div>
        {question.answers[index]?.explanation ? <div className="Report-Options-container-item-explanation bg-light mb-5 p-10 fs-18">
          <Markdown content={question.answers[index].explanation!} />
        </div> : null}
      </div>
    })}
  </div>

}