import { TQuestionType } from '../types';

export function applyOptionsShortcut(
  e: React.KeyboardEvent<HTMLDivElement>,
  type: TQuestionType,
  totalOptions: number,
  userAnswers: string[],
  setUserAnswers: React.Dispatch<React.SetStateAction<string[]>>
) {
  if (e.nativeEvent.code.match(/Digit\d/) && type.match(/(MCQ|MS)/)) {
    const digit = parseInt(e.nativeEvent.code.replace('Digit', ''));
    if (digit && digit - 1 < totalOptions) {
      if (type === 'MCQ') {
        userAnswers[0] = `${digit - 1}`;
        setUserAnswers([...userAnswers]);
      } else {
        const isChecked = userAnswers.includes(`${digit - 1}`);
        if (isChecked)
          setUserAnswers(
            userAnswers.filter((userAnswer) => userAnswer !== `${digit - 1}`)
          );
        else {
          userAnswers.push(`${digit - 1}`);
          setUserAnswers([...userAnswers]);
        }
      }
    }
  }
}
