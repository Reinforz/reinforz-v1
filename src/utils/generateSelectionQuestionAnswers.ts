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
  } else if (isPrimitive(answers)) {
    return [
      {
        text: answers.toString(),
        explanation: null
      }
    ];
  } else {
    return [
      {
        text: (answers as ISelectionQuestionAnswerPartial).text.toString(),
        explanation:
          (answers as ISelectionQuestionAnswerPartial).explanation ?? null
      }
    ];
  }
}
