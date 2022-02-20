import { Box } from "@mui/material";
import { Markdown } from "..";
import { TQuestion } from "../../types";
import "./style.scss";

export interface QuestionDisplayProps {
  contexts: string[],
  question: TQuestion,
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
        questionString += `${userAnswers[chunkIndex] ?? ''}`
      }
    }
  } else {
    questionString = question.question;
  }
  return <Box className={`QuestionDisplay p-1 flex justify-center mb-1 bg-base ${classNames.container ?? ''}`}>
    {showContexts && question.contexts.length !== 0 && <Box className="QuestionDisplay-contexts overflow-y-auto bg-dark p-1 pb-0 ">
      {question.contexts.map(context => <Markdown content={contexts[context]} classNames={{
        typography: 'QuestionDisplay-contexts-item bg-light text-xl overflow-y-auto flex-1 p-10 mb-1',
      }} />)}
    </Box>}
    {showQuestion && <Markdown content={questionString} classNames={{
      typography: 'QuestionDisplay-question bg-light text-xl overflow-y-auto flex-1 p-10',
    }} />}
    {showImage && question.image ? <Box className={`QuestionDisplay-image bg-light flex justify-center items-center  ${classNames.imageContainer ?? ''}`} style={{ width: `25%`, minWidth: 350, maxWidth: 500 }}><img className={`${classNames.image ?? ''}`} src={question.image!} alt="Question" /></Box> : null}
  </Box>
}