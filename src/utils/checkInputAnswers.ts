import { IInputQuestionAnswerFull, IResultInputQuestion } from '../types';

/**
 * Checks user's answer against an answer object and returns whether or not it matches the given answers including its alternates
 * @param userAnswer user's answer to check against
 * @param answer An answer object containing actual modified answer text, regexes and alternates
 * @returns whether user's answer matches any of the answers
 */
export function checkInputAnswer(
  userAnswer: string,
  answers: IInputQuestionAnswerFull[]
) {
  let isCorrect = false;
  const transformedAnswers: IResultInputQuestion['answers'][0] = JSON.parse(
    JSON.stringify(answers)
  );

  for (let index = 0; index < answers.length; index++) {
    const [modifiedUserAnswer, modifiedAnswerText] = modifyAnswers(
      userAnswer,
      answers[index]
    );
    if (modifiedUserAnswer === modifiedAnswerText) {
      isCorrect = true;
      transformedAnswers[index].isCorrect = true;
      transformedAnswers[index].userInput = userAnswer;
      break;
    } else {
      const regex = answers[index].regex;
      if (regex) {
        const generatedRegex = new RegExp(regex.regex, regex.flags);
        isCorrect = Boolean(userAnswer.match(generatedRegex));
        transformedAnswers[index].isCorrect = isCorrect;
        transformedAnswers[index].userInput = userAnswer;
        if (isCorrect) break;
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
  answer: Omit<IInputQuestionAnswerFull, 'regex'>
) {
  let answerText = answer.text;
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
  answers: IInputQuestionAnswerFull[][]
) {
  const transformedUserAnswers: IResultInputQuestion['answers'] = JSON.parse(
    JSON.stringify(userAnswers)
  );
  let isCorrect = false,
    totalCorrectAnswers = 0;
  for (let index = 0; index < userAnswers.length; index++) {
    const result = checkInputAnswer(userAnswers[index], answers[index]);
    transformedUserAnswers[index] = result[1];
    isCorrect = result[0];
    if (!isCorrect) break;
    else totalCorrectAnswers++;
  }
  return [isCorrect, totalCorrectAnswers, transformedUserAnswers] as const;
}
