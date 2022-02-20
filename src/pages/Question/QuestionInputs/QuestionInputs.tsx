import { Box, TextField } from "@mui/material";
import React from 'react';
import { useThemeSettings } from '../../../hooks';
import sounds from "../../../sounds";
import { TTypeQuestion } from '../../../types';

interface Props {
  setUserAnswers: React.Dispatch<React.SetStateAction<string[]>>
  userAnswers: string[],
  question: TTypeQuestion,
}

export default function QuestionInputs(props: Props) {
  const { settings } = useThemeSettings();
  const { setUserAnswers, userAnswers, question: { _id, type } } = props;

  return (
    <Box className={`QuestionInputs QuestionInputs-${type} bg-base p-1 pb-0 flex flex-col`}>
      {props.question.answers.map((_, i) =>
        <TextField InputProps={{ disableUnderline: true }} key={`${_id}.${i}`} className={`QuestionInputs-item mb-1 pl-1`} autoFocus={i === 0} fullWidth inputProps={{
          placeholder: `Answer ${i + 1}`,
          style: {
            fontSize: '1.25em',
          },
          className: 'pl-1'
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
    </Box>
  );
}

