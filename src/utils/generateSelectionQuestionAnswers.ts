import {
  InputSelectQuestion, InputSelectQuestionAnswerDetailed, SelectQuestion
} from '../types';
import { isPrimitive } from './isPrimitive';

type StringOrNull<T extends string | null | undefined> = T extends string ? string : null

/**
 * Stringifies and trims parameter
 * @param data Data to stringify and trim
 * @returns Stringified and trimmed data or null if its null or undefined
 */
function stringifyAndTrim<T extends string | null | undefined>(data: T): StringOrNull<T> {
  if (data !== null && data !== undefined) {
    return data.toString().trim() as StringOrNull<T>
  }
  return null as StringOrNull<T>;
}

/**
 * Generates an array of answers (with appropriate fields) from input question answers
 * An answer might be detailed, an array, a single primitive, which is inconsistent
 * This function converts them to a standard so that it has a defined shape
 * @param answers Selection type input question answers
 * @returns An array of answers object with all the correct properties
 */
export function generateSelectionQuestionAnswers(
  answers: InputSelectQuestion['answers']
): SelectQuestion['answers'] {
  if (Array.isArray(answers)) {
    return answers.map((answer) => {
      // If its not an object, then there is no explanation, its an array of primitives
      if (typeof answer !== 'object') {
        return {
          text: stringifyAndTrim(answer),
          explanation: null
        };
      } else {
        // Else if its an object, explanation could be there
        return {
          text: stringifyAndTrim(answer.text),
          explanation: stringifyAndTrim(answer.explanation)
        };
      }
    });
  } else if (isPrimitive(answers)) {
    // If its primitive, then there is no explanation
    return [
      {
        text: stringifyAndTrim(answers as string),
        explanation: null
      }
    ];
  } else {
    // Its a single object with detailed information, but explanation might not be present
    return [
      {
        text: stringifyAndTrim((answers as InputSelectQuestionAnswerDetailed).text),
        explanation:
          stringifyAndTrim((answers as InputSelectQuestionAnswerDetailed).explanation)
      }
    ];
  }
}
