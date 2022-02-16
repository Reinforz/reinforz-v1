import {
  InputSelectQuestionAnswerDetailed, TInputSelectQuestion, TSelectQuestion
} from '../types';
import { isPrimitive } from './isPrimitive';

export function generateSelectionQuestionAnswers(
  answers: TInputSelectQuestion['answers']
): TSelectQuestion['answers'] {
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
        text: (answers as InputSelectQuestionAnswerDetailed).text
          .toString()
          .trim(),
        explanation:
          (answers as InputSelectQuestionAnswerDetailed).explanation
            ?.toString()
            .trim() ?? null
      }
    ];
  }
}
