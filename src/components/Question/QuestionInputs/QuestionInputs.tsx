import { TextField } from "@material-ui/core";
import React from 'react';
import { useThemeSettings } from '../../../hooks';
import { TInputQuestionFull } from '../../../types';
import "./QuestionInputs.scss";

interface Props {
  setUserAnswers: React.Dispatch<React.SetStateAction<string[]>>
  userAnswers: string[],
  question: TInputQuestionFull,
}

export default function QuestionInputs(props: Props) {
  const { theme } = useThemeSettings();
  const { setUserAnswers, userAnswers, question: { _id, type } } = props;

  return (
    <div className={`QuestionInputs QuestionInputs--${type}`} style={{ backgroundColor: theme.color.dark }}>
      {props.question.answers.map((_, i) =>
        <div key={`${_id}.${i}`} className={`QuestionInputs-item`} style={{ backgroundColor: theme.color.base, color: theme.palette.text.primary }}>
          <TextField fullWidth value={userAnswers[i] ?? ''} onChange={e => {
            userAnswers[i] = e.target.value;
            setUserAnswers([...userAnswers])
          }} /></div>
      )}
    </div>
  );
}

