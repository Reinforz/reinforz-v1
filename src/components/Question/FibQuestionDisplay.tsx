import DOMPurify from "dompurify";
import marked from "marked";
import React from "react";

interface Props {
  question: string[]
  userAnswers: string[]
  image?: string | null
}

export default function FibQuestionDisplay(props: Props) {
  const { image, question, userAnswers } = props;
  return <div className="Question-question Question-question--FIB" style={{ gridArea: image ? `1/1/2/2` : `1/1/2/3` }}>
    {question.map((questionChunk, i) => questionChunk !== "" ? <span className="Question-question-chunk" key={questionChunk + i}>
      <span className="Question-question-chunk-text" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(marked(questionChunk)) }}></span>
      {i !== question.length - 1 ? <span className="Question-question-chunk-answer">{userAnswers[i]}</span> : null}
    </span> : null)}
  </div>
}