import { TResultInputQuestion, TypeQuestionAnswerDetailed } from '../types';

/**
 * Checks user's answer against an answer object and returns whether or not it matches the given answers including its alternates
 * @param userAnswer user's answer to check against
 * @param answer An answer object containing actual modified answer text, regexes and alternates
 * @returns whether user's answer matches any of the answers
 */
export function checkInputAnswer(
  userAnswer: string | undefined,
  answers: TypeQuestionAnswerDetailed[]
) {
  let isCorrect = false;
  const transformedAnswers: TResultInputQuestion['answers'][0] = JSON.parse(
    JSON.stringify(answers)
  );

  if (userAnswer !== undefined) {
    for (let index = 0; index < answers.length; index++) {
      const [modifiedUserAnswer, modifiedAnswerText] = modifyAnswers(
        userAnswer,
        answers[index]
      );

      transformedAnswers[index].isCorrect = false;
      if (modifiedUserAnswer === modifiedAnswerText) {
        isCorrect = true;
        transformedAnswers[index].isCorrect = true;
        break;
      } else {
        const regex = answers[index].regex;
        if (regex) {
          const generatedRegex = new RegExp(regex.regex, regex.flags);
          isCorrect = Boolean(userAnswer.match(generatedRegex));
          transformedAnswers[index].isCorrect = isCorrect;
          if (isCorrect) break;
        }
      }
    }
  }

  return [isCorrect, transformedAnswers] as const;
}

/**
 * Modifies the user's answers and all the text/alternate texts of the answer by applying the modifiers
 * @param userAnswer user's answer to check against
 * @param answer answer info object
 */
export function modifyAnswers(
  userAnswer: string,
  answer: Omit<TypeQuestionAnswerDetailed, 'regex'>
) {
  let answerText = answer.text.trim();
  userAnswer = userAnswer.trim();
  answer.modifiers.forEach((modifier) => {
    switch (modifier) {
      case 'IC': {
        userAnswer = userAnswer.toLowerCase();
        answerText = answerText.toLowerCase();
        break;
      }
      case 'IS': {
        userAnswer = userAnswer.replace(/\s/g, '');
        answerText = answerText.replace(/\s/g, '');
        break;
      }
    }
  });
  return [userAnswer, answerText] as const;
}

/**
 * Checks user's answer against all the answers
 * @param userAnswers user's answer to check against
 * @param answers answer info object
 * @returns Whether or not user's answer is correct
 */
export function checkInputAnswers(
  userAnswers: string[],
  answers: TypeQuestionAnswerDetailed[][]
) {
  const transformedUserAnswers: TResultInputQuestion['answers'] = JSON.parse(
    JSON.stringify(answers)
  );
  let isCorrect = false,
    totalCorrectAnswers = 0;
  for (let index = 0; index < answers.length; index++) {
    const result = checkInputAnswer(userAnswers[index], answers[index]);
    transformedUserAnswers[index] = result[1];
    isCorrect = result[0];
    if (!isCorrect) break;
    else totalCorrectAnswers++;
  }
  return [isCorrect, totalCorrectAnswers, transformedUserAnswers] as const;
}
