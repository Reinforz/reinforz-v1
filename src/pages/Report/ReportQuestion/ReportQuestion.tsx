import { useContext } from "react";
import { Markdown } from "../../../components";
import { ReportContext } from "../../../context/ReportContext";
import { TResultQuestion } from "../../../types";
import "./ReportQuestion.scss";

interface Props {
  question: TResultQuestion,
  userAnswers: string | string[]
}

export function ReportQuestion(props: Props) {
  const { question, userAnswers } = props;
  const { reportSettings: { filters } } = useContext(ReportContext);
  let questionString = '';
  if (question.type === "FIB") {
    for (let chunkIndex = 0; chunkIndex < question.question.length; chunkIndex++) {
      const chunk = question.question[chunkIndex];
      questionString += chunk;
      if (chunkIndex !== question.question.length - 1) {
        if (question.format === "text") {
          questionString += `<span class="question-chunk bg-dark m-5 fs-14">${userAnswers[chunkIndex] ?? 'N/A'}</span>`
        } else {
          questionString += `${userAnswers[chunkIndex] ?? ''}`
        }
      }
    }
  } else {
    questionString = question.question;
  }
  const showImage = !filters.excluded_columns.includes('image') && question.image;
  return <div className="flex jc-c mb-5">
    {!filters.excluded_columns.includes('question') ? <div className={`Report-Question bg-base ${showImage ? 'mr-5' : ''}`} style={{ width: question.image ? `75%` : `100%` }} >
      <Markdown content={questionString} classNames={{
        typography: 'fs-20 ta-c',
        markdown: 'p-10'
      }} />
    </div> : null}
    {showImage ? <div className="Report-Question-image bg-light" style={{ width: `25%`, minWidth: 350 }}><img src={question.image!} alt="Question" /></div> : null}
  </div>
}