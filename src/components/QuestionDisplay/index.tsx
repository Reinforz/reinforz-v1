import { Markdown } from "..";
import { TQuestionFull } from "../../types";
import "./style.scss";

export interface QuestionDisplayProps {
  contexts: string[],
  question: TQuestionFull,
  userAnswers: string | string[]
  showImage?: boolean
  showQuestion?: boolean
  showContexts?: boolean
  classNames?: {
    container?: string
    questionContainer?: string
    imageContainer?: string
    image?: string
  }
}

export function QuestionDisplay(props: QuestionDisplayProps) {
  const { contexts, question, userAnswers, showImage = true, showQuestion = true, classNames = {}, showContexts = true } = props;
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
    {showContexts && question.contexts.length !== 0 && <div className="QuestionDisplay-contexts bg-base p-5 pb-0">
      {question.contexts.map(context => <Markdown content={contexts[context]} classNames={{
        typography: 'QuestionDisplay-contexts-item bg-light fs-20 overflowY-auto flex-1 p-10 mb-5',
      }} />)}
    </div>}
    {showQuestion && <Markdown content={questionString} classNames={{
      typography: 'QuestionDisplay-question bg-base fs-20 overflowY-auto flex-1 p-10',
    }} />}
    {showImage ? <div className={`QuestionDisplay-image bg-light flex jc-c ai-c ml-5 ${classNames.imageContainer ?? ''}`} style={{ width: `25%`, minWidth: 350, maxWidth: 500 }}><img className={`${classNames.image ?? ''}`} src={question.image!} alt="Question" /></div> : null}
  </div>
}