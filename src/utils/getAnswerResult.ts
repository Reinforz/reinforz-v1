import shortid from 'shortid';
import { TQuestionFull, TSelectionQuestionFull } from '../types';
import { calculateScore } from './calculateScore';
import { checkInputAnswers } from './checkInputAnswers';
import { transformReportSelectionQuestion } from './transformReportQuestion';

export function getAnswerResult(
  currentQuestion: TQuestionFull,
  userAnswers: string[],
  time_taken: number,
  hints_used: number,
  partial_score: boolean
) {
  let totalCorrectAnswers = 0;
  const { hints, weight, time_allocated } = currentQuestion;
  userAnswers = userAnswers.filter((user_answer) => user_answer !== '');
  let verdict = false;
  const transformedQuestion = JSON.parse(
    JSON.stringify(currentQuestion)
  ) as TQuestionFull;

  switch (currentQuestion.type) {
    case 'MCQ':
      verdict =
        currentQuestion.answers.length === userAnswers.length &&
        currentQuestion.answers[0].text.toString() ===
          currentQuestion.options![parseInt(userAnswers[0])].index;
      totalCorrectAnswers = verdict ? 1 : 0;
      transformReportSelectionQuestion(
        transformedQuestion as TSelectionQuestionFull,
        userAnswers
      );
      break;
    case 'MS':
      verdict =
        userAnswers.length === currentQuestion.answers.length &&
        userAnswers.every((user_answer) => {
          const isCorrect = currentQuestion.answers
            .map((answer) => answer.text)
            .includes(currentQuestion.options![parseInt(user_answer)].index);
          if (isCorrect) totalCorrectAnswers++;
          return isCorrect;
        });
      transformReportSelectionQuestion(
        transformedQuestion as TSelectionQuestionFull,
        userAnswers
      );
      break;
    case 'Snippet':
    case 'FIB':
      const result = checkInputAnswers(userAnswers, currentQuestion.answers);
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
      totalAnswers: currentQuestion.answers.length,
      totalCorrectAnswers,
      totalHints: hints.length
    }),
    _id: shortid()
  };
}
