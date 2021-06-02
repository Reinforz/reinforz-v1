import { TSelectionQuestionFull, TSelectionQuestionPartial } from '../types';

export function generateSelectionQuestionAnswers(
  answers: TSelectionQuestionPartial['answers']
): TSelectionQuestionFull['answers'] {
  return answers.map((answer) => {
    if (typeof answer === 'string') {
      return {
        text: answer.toString(),
        explanation: null
      };
    } else {
      return {
        text: answer.text.toString(),
        explanation: answer.explanation ?? null
      };
    }
  });
}
