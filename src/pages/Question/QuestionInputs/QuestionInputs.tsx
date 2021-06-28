import { TextField } from "@material-ui/core";
import React from 'react';
import { useThemeSettings } from '../../../hooks';
import sounds from "../../../sounds";
import { TInputQuestionFull } from '../../../types';

interface Props {
  setUserAnswers: React.Dispatch<React.SetStateAction<string[]>>
  userAnswers: string[],
  question: TInputQuestionFull,
}

export default function QuestionInputs(props: Props) {
  const { settings } = useThemeSettings();
  const { setUserAnswers, userAnswers, question: { _id, type } } = props;

  return (
    <div className={`QuestionInputs QuestionInputs-${type} bg-base p-5 pb-0 flex fd-c`}>
      {props.question.answers.map((_, i) =>
        <TextField InputProps={{ disableUnderline: true }} key={`${_id}.${i}`} className={`QuestionInputs-item mb-5 w-calc_100p_m_10px pl-5`} autoFocus={i === 0} fullWidth inputProps={{
          placeholder: `Answer ${i + 1}`,
          style: {
            fontSize: '1.25em',
          },
          className: 'pl-5'
        }} value={userAnswers[i] ?? ''} onChange={e => {
          if (settings.sound) {
            const min = Math.ceil(1);
            const max = Math.floor(3);
            const generatedRandomInt = Math.floor(Math.random() * (max - min + 1)) + min;
            sounds[`keyboard_${generatedRandomInt}` as 'keyboard_1'].play()
          }
          userAnswers[i] = e.target.value;
          setUserAnswers([...userAnswers])
        }} />
      )}
    </div>
  );
}

