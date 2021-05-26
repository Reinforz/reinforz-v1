import shortid from 'shortid';
import { TQuestionFull } from '../types';
import { calculateScore } from './calculateScore';
import { checkInputAnswers } from './checkInputAnswers';

export function getAnswerResult(
  currentQuestions: TQuestionFull,
  userAnswers: string[],
  time_taken: number,
  hints_used: number,
  partial_score: boolean
) {
  let totalCorrectAnswers = 0;
  const { hints, weight, time_allocated, answers } = currentQuestions;
  userAnswers = userAnswers.filter((user_answer) => user_answer !== '');
  let verdict = false;

  switch (currentQuestions.type) {
    case 'MCQ':
      verdict =
        currentQuestions.answers.length === userAnswers.length &&
        answers[0].toString() ===
          currentQuestions.options![parseInt(userAnswers[0])].index;
      totalCorrectAnswers = verdict ? 1 : 0;
      break;
    case 'MS':
      verdict =
        userAnswers.length === answers.length &&
        userAnswers.every((user_answer) => {
          const isCorrect = currentQuestions.answers.includes(
            currentQuestions.options![parseInt(user_answer)].index
          );
          if (isCorrect) totalCorrectAnswers++;
          return isCorrect;
        });
      break;
    case 'Snippet':
    case 'FIB':
      const result = checkInputAnswers(userAnswers, currentQuestions.answers);
      verdict = result[0];
      totalCorrectAnswers = result[1];
      break;
  }

  return {
    verdict,
    score: calculateScore({
      weight,
      time_allocated,
      time_taken,
      hints_used,
      partial_score,
      verdict,
      totalAnswers: answers.length,
      totalCorrectAnswers,
      totalHints: hints.length
    }),
    _id: shortid()
  };
}
