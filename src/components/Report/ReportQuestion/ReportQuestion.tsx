import { useThemeSettings } from "../../../hooks";
import { TResultQuestion } from "../../../types";
import { sanitizeMarkdown } from "../../../utils";
import "./ReportQuestion.scss";

interface Props {
  question: TResultQuestion,
}

export function ReportQuestion(props: Props) {
  const { question } = props;
  const { theme } = useThemeSettings();

  return <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px' }}>
    {<div className="Report-Question" style={{ gridArea: question.image ? `1/1/2/2` : `1/1/2/3`, backgroundColor: theme.color.light }} dangerouslySetInnerHTML={{ __html: sanitizeMarkdown(Array.isArray(question.question) ? question.question.join(`<span style="width: 5px;height: 3px;display: inline-block;background-color: ${theme.color.dark};padding: 5px;border-radius: 2px;margin: 0px 5px;"></span>`) : question.question) }}></div>}
    {question.image && <div className="Report-Question-image" style={{ gridArea: `1/2/2/3`, backgroundColor: theme.color.light }}><img src={question.image} alt="Question" /></div>}
  </div>
}