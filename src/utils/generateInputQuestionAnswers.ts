import { isPrimitive } from '.';
import {
  IInputQuestionAnswerPartial,
  ILog,
  TInputQuestionFull,
  TInputQuestionPartial
} from '../types';

export function generateInputQuestionAnswers(
  answers: TInputQuestionPartial['answers']
) {
  const logs: ILog = { warns: [], errors: [] };

  function checkModifiers(answer: IInputQuestionAnswerPartial) {
    answer.modifiers?.forEach((modifier, index, modifiers) => {
      if (modifier !== 'IC' && modifier !== 'IS') {
        logs.warns.push(
          `Unknown modifier ${modifier} found at ${index + 1}. Removing it.`
        );
        modifiers[index] = null as any;
      }
    });
  }

  function generateInputQuestionAnswerFromPartial(
    answer: IInputQuestionAnswerPartial
  ): TInputQuestionFull['answers'][0][0] {
    checkModifiers(answer);
    return {
      text: answer.text.toString(),
      modifiers:
        answer.modifiers?.filter((modifier) => modifier !== null) ?? [],
      regex: answer.regex ?? null,
      explanation: answer.explanation ?? null
    };
  }

  function generatedInputQuestionAnswerFromString(
    answer: string
  ): TInputQuestionFull['answers'][0][0] {
    return {
      text: answer.toString(),
      modifiers: [],
      regex: null,
      explanation: null
    };
  }

  let generatedInputQuestionAnswers: TInputQuestionFull['answers'] = [];
  if (Array.isArray(answers)) {
    generatedInputQuestionAnswers = answers.map((answer) => {
      if (isPrimitive(answer))
        return [
          generatedInputQuestionAnswerFromString(answer.toString())
        ] as TInputQuestionFull['answers'][0];
      else if (Array.isArray(answer)) {
        return answer.map((answer) =>
          typeof answer === 'string'
            ? generatedInputQuestionAnswerFromString(answer)
            : generateInputQuestionAnswerFromPartial(answer)
        );
      } else {
        return [
          generateInputQuestionAnswerFromPartial(
            answer as IInputQuestionAnswerPartial
          )
        ];
      }
    });
  } else if (isPrimitive(answers)) {
    generatedInputQuestionAnswers = [
      [generatedInputQuestionAnswerFromString(answers.toString())]
    ];
  } else {
    generatedInputQuestionAnswers = [
      [
        generateInputQuestionAnswerFromPartial(
          answers as IInputQuestionAnswerPartial
        )
      ]
    ];
  }

  return [generatedInputQuestionAnswers, logs] as const;
}
