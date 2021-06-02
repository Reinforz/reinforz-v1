import { useThemeSettings } from "../../../hooks";
import { StackList } from "../../../shared";
import { IResult, IResultInputQuestion } from "../../../types";
import { sanitizeMarkdown } from "../../../utils";
import { ReportAnswers } from "../ReportAnswers/ReportAnswers";
import { ReportOptions } from "../ReportOptions/ReportOptions";
import "./ReportTable.scss";
interface Props {
  filteredResults: IResult[]
}

export function ReportTable(props: Props) {
  const { theme } = useThemeSettings();
  return <div className="Report-Table" style={{ backgroundColor: theme.color.base, color: theme.palette.text.primary }}>
    {props.filteredResults.map(filteredResult =>
      <div key={filteredResult.question._id} className="Report-Table-item" style={{ backgroundColor: theme.color.dark }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px' }}>
          {<div className="Report-Table-item-question" style={{ gridArea: filteredResult.question.image ? `1/1/2/2` : `1/1/2/3`, backgroundColor: theme.color.light }} dangerouslySetInnerHTML={{ __html: sanitizeMarkdown(Array.isArray(filteredResult.question.question) ? filteredResult.question.question.join(" | ") : filteredResult.question.question) }}></div>}
          {filteredResult.question.image && <div className="Report-Table-item-image" style={{ gridArea: `1/2/2/3`, backgroundColor: theme.color.light }}><img src={filteredResult.question.image} alt="Question" /></div>}
        </div>
        <div className="Report-Table-item-stats">
          <StackList header="Question Stats" items={[['Type', filteredResult.question.type], ['Difficulty', filteredResult.question.difficulty], ['Time Allocated', filteredResult.question.time_allocated], ['Weight', filteredResult.question.weight]]} />
          <StackList header="User Stats" items={[['Time Taken', filteredResult.time_taken], ['Hints Used', filteredResult.hints_used], ['Score', filteredResult.score], ['Verdict', <div style={{
            fontWeight: 'bold', color: filteredResult.verdict === false ? "#ff3223" : "#36e336"
          }}>{filteredResult.verdict === false ? "Incorrect" : "Correct"}</div>]]} />
        </div>
        <div style={{ display: 'flex' }}>
          {(filteredResult.question.type === "MCQ" || filteredResult.question.type === "MS") ? <ReportOptions question={filteredResult.question} userAnswers={filteredResult.user_answers} /> : <ReportAnswers question={filteredResult.question as IResultInputQuestion} userAnswers={filteredResult.user_answers} />}
          <div style={{ width: '25%' }}>
            <StackList header="Quiz Stats" items={[['Topic', filteredResult.question.quiz.topic], ['Subject', filteredResult.question.quiz.subject]]} />
            {filteredResult.question.hints.length !== 0 ? <div className="Report-Table-item-hints" style={{ backgroundColor: theme.color.base }}>
              {filteredResult.question.hints.map(hint => <div className="Report-Table-item-hints-item" key={hint} style={{ backgroundColor: theme.color.light }}>
                {hint}
              </div>)}
            </div> : null}
          </div>
        </div>
      </div>)}
  </div>
}