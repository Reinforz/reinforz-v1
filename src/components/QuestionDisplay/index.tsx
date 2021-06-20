import { Markdown } from "..";
import { TQuestionFull } from "../../types";
import "./style.scss";

interface Props {
  question: TQuestionFull,
  userAnswers: string | string[]
  showImage?: boolean
  showQuestion?: boolean
}

export function QuestionDisplay(props: Props) {
  const { question, userAnswers, showImage = true, showQuestion = true } = props;
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
  return <div className="flex jc-c mb-5">
    {showQuestion ? <div className={`QuestionDisplay bg-base ${showImage ? 'mr-5' : ''}`} style={{ width: question.image ? `75%` : `100%` }} >
      <Markdown content={questionString} classNames={{
        typography: 'fs-20 ta-c',
        markdown: 'p-10'
      }} />
    </div> : null}
    {showImage ? <div className="QuestionDisplay-image bg-light" style={{ width: `25%`, minWidth: 350 }}><img src={question.image!} alt="Question" /></div> : null}
  </div>
}