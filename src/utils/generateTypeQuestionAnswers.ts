import { VALID_MODIFIERS } from '../constants';
import {
  ILog,
  InputTypeQuestionAnswer,
  InputTypeQuestionAnswerDetailed, TQuestionAnswerModifiers, TypeQuestionAnswerDetailed
} from '../types';
import { isPrimitive } from './isPrimitive';

export function generateTypeQuestionAnswers(
  answers: InputTypeQuestionAnswer
) {
  // Used to check for errors and warnings
  const logs: ILog = { warns: [], errors: [] };

  /**
   * Returns valid modifiers from answer
   * 
   * If an invalid modifier is found it populates logs.warn
   * @param answer Answer to check modifiers for
   * @returns An array of valid modifiers
   */
  function filterModifiers(answer: InputTypeQuestionAnswerDetailed) {
    const modifiers: TQuestionAnswerModifiers[] = []
    answer.modifiers?.forEach((modifier, index, modifiers) => {
      // If its not a valid modifier
      if (!VALID_MODIFIERS.has(modifier)) {
        // Push the warn message
        // Invalid modifiers will be removed
        logs.warns.push(
          `Unknown modifier ${modifier} found at ${index + 1}. Removing it.`
        );
      } else {
        modifiers.push(modifier)
      }
    });
    // Return the valid modifiers
    return modifiers;
  }

  /**
   * Generate a detailed answer object from input answer object
   * @param answer Answer to generate detailed object from
   * @returns Detailed question answer with all the correct properties
   */
  function generateDetailedQuestionAnswerFromInputObject(
    answer: InputTypeQuestionAnswerDetailed
  ): TypeQuestionAnswerDetailed {
    ;
    return {
      text: answer.text.toString().trim(),
      modifiers: filterModifiers(answer),
      // Regex might not be present, if not set it to null
      regex: answer.regex ?? null,
      // Explanation might not be present, if not set it to null
      explanation: answer.explanation?.toString().trim() ?? null
    };
  }

  /**
   * Generate a detailed answer object from input answer string
   * @param answer Answer string
   * @returns Detailed question answer with all the correct properties
   */
  function generateDetailedQuestionAnswerFromInputString(
    answer: string
  ): TypeQuestionAnswerDetailed {
    return {
      text: answer.toString().trim(),
      modifiers: [],
      regex: null,
      explanation: null
    };
  }

  // Array of array is used in order to store alternate answers
  let generatedTypeQuestionAnswers: TypeQuestionAnswerDetailed[][] = [];
  // If the answer is an array
  if (Array.isArray(answers)) {
    generatedTypeQuestionAnswers = answers.map((answer) => {
      // if the answer is a primitive, we only have the answer string
      if (isPrimitive(answer))
        return [
          generateDetailedQuestionAnswerFromInputString(answer as string)
        ] as TypeQuestionAnswerDetailed[];
      // If could also be an array of alternate answers string or object
      else if (Array.isArray(answer)) {
        return answer.map((answer) =>
          typeof answer === 'string'
            ? generateDetailedQuestionAnswerFromInputString(answer)
            : generateDetailedQuestionAnswerFromInputObject(answer)
        );
      } else {
        // Other wise its object 
        return [
          generateDetailedQuestionAnswerFromInputObject(
            answer as InputTypeQuestionAnswerDetailed
          )
        ];
      }
    });
  }
  // If its a primitive 
  else if (isPrimitive(answers)) {
    generatedTypeQuestionAnswers = [
      [generateDetailedQuestionAnswerFromInputString(answers as string)]
    ];
  } 
  // if its an object
  else {
    generatedTypeQuestionAnswers = [
      [
        generateDetailedQuestionAnswerFromInputObject(
          answers as InputTypeQuestionAnswerDetailed
        )
      ]
    ];
  }

  // Return the logs and the generated question answers as a tuple
  return [generatedTypeQuestionAnswers, logs] as const;
}
