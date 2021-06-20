import { Markdown } from "..";
import { TQuestionFull } from "../../types";
import "./style.scss";

interface Props {
  question: TQuestionFull,
  userAnswers: string | string[]
  showImage?: boolean
  showQuestion?: boolean
  classNames?: {
    container?: string
    questionContainer?: string
    imageContainer?: string
    image?: string
  }
}

export function QuestionDisplay(props: Props) {
  const { question, userAnswers, showImage = true, showQuestion = true, classNames = {} } = props;
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
  return <div className={`QuestionDisplay flex jc-c mb-5 ${classNames.container ?? ''}`}>
    {showQuestion ? <div className={`QuestionDisplay-question bg-base ${classNames.questionContainer ?? ''} ${showImage ? 'mr-5' : ''}`} style={{ width: question.image ? `75%` : `100%` }} >
      <Markdown content={questionString} classNames={{
        typography: 'fs-20 ta-c',
        markdown: 'p-10'
      }} />
    </div> : null}
    {showImage ? <div className={`QuestionDisplay-image bg-light ${classNames.imageContainer ?? ''}`} style={{ width: `25%`, minWidth: 350 }}><img className={`${classNames.image ?? ''}`} src={question.image!} alt="Question" /></div> : null}
  </div>
}