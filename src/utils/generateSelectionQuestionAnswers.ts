import {
  ISelectionQuestionAnswerPartial,
  TSelectionQuestionFull,
  TSelectionQuestionPartial
} from '../types';
import { isPrimitive } from './isPrimitive';

export function generateSelectionQuestionAnswers(
  answers: TSelectionQuestionPartial['answers']
): TSelectionQuestionFull['answers'] {
  if (Array.isArray(answers)) {
    return answers.map((answer) => {
      if (typeof answer !== 'object') {
        return {
          text: answer.toString().trim(),
          explanation: null
        };
      } else {
        return {
          text: answer.text.toString().trim(),
          explanation: answer.explanation?.toString().trim() ?? null
        };
      }
    });
  } else if (isPrimitive(answers)) {
    return [
      {
        text: answers.toString().trim(),
        explanation: null
      }
    ];
  } else {
    return [
      {
        text: (answers as ISelectionQuestionAnswerPartial).text
          .toString()
          .trim(),
        explanation:
          (answers as ISelectionQuestionAnswerPartial).explanation
            ?.toString()
            .trim() ?? null
      }
    ];
  }
}
