import { TInputQuestionFull, TInputQuestionPartial } from '../types';

export function generateInputQuestionAnswers(
  answers: TInputQuestionPartial['answers']
): TInputQuestionFull['answers'] {
  return answers.map((answer) => {
    if (typeof answer === 'string')
      return [
        {
          text: answer.toString(),
          modifiers: [],
          regex: null
        }
      ] as TInputQuestionFull['answers'][0];
    else if (Array.isArray(answer)) {
      return answer.map((answer) => {
        return {
          text: answer.text.toString(),
          modifiers: answer.modifiers ?? [],
          regex: answer.regex ?? null
        } as TInputQuestionFull['answers'][0][0];
      });
    } else {
      return [
        {
          text: answer.text.toString(),
          modifiers: answer.modifiers ?? [],
          regex: answer.regex ?? null
        }
      ] as TInputQuestionFull['answers'][0];
    }
  });
}
