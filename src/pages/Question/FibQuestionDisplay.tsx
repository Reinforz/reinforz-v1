import { useTheme } from "@material-ui/styles";
import { Markdown } from "../../shared";
import { ExtendedTheme } from "../../types";

interface Props {
  question: string[]
  userAnswers: string[]
  image?: string | null
}

export default function FibQuestionDisplay(props: Props) {
  const theme = useTheme() as ExtendedTheme;
  const { image, question, userAnswers } = props;
  const questionString = question.map((questionChunk, index) => questionChunk + (index !== question.length - 1 ? `${userAnswers[index] ?? ''}` : '')).join("");

  return <div className="Question-question Question-question--FIB" style={{ backgroundColor: theme.color.light, color: theme.palette.text.primary, gridArea: image ? `1/1/2/2` : `1/1/2/3` }}>
    <Markdown content={questionString} />
  </div>
}