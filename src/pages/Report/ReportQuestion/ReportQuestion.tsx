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
  const showImage = !filters.excluded_columns.includes('image') && question.image;
  return <div className="flex jc-c mb-5">
    {!filters.excluded_columns.includes('question') ? <div className={`Report-Question bg-light ${showImage ? 'mr-5' : ''}`} style={{ width: question.image ? `75%` : `100%` }} >
      <Markdown content={questionString} classNames={{
        typography: 'fs-20 ta-c',
        markdown: 'p-10'
      }} />
    </div> : null}
    {showImage ? <div className="Report-Question-image bg-light" style={{ width: `25%`, minWidth: 350 }}><img src={question.image!} alt="Question" /></div> : null}
  </div>
}