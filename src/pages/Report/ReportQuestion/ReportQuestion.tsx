import { useContext } from "react";
import { Markdown } from "../../../components";
import { ReportContext } from "../../../context/ReportContext";
import { TResultQuestion } from "../../../types";
import "./ReportQuestion.scss";

interface Props {
  question: TResultQuestion,
}

export function ReportQuestion(props: Props) {
  const { question } = props;
  const { reportSettings: { filters } } = useContext(ReportContext);
  const questionString = Array.isArray(question.question) ? question.question.join(`+`) : question.question;
  return <div style={{ display: 'flex', justifyContent: 'center' }}>
    {!filters.excluded_columns.includes('question') ? <div className="Report-Question bg-light" style={{ width: question.image ? `75%` : `100%` }} >
      <Markdown content={questionString} />
    </div> : null}
    {!filters.excluded_columns.includes('image') ? question.image && <div className="Report-Question-image bg-light" style={{ width: `25%`, minWidth: 350 }}><img src={question.image} alt="Question" /></div> : null}
  </div>
}