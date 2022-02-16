import shortid from 'shortid';
import {
  TQuestion,
  TQuestionResult,
  TSelectQuestion
} from '../types';
import { calculateScore } from './calculateScore';
import { checkInputAnswers } from './checkInputAnswers';
import { transformReportSelectionQuestion } from './transformReportQuestion';

export function getAnswerResult(
  currentQuestion: TQuestion,
  userAnswers: string[],
  time_taken: number,
  hints_used: number,
  partial_score: boolean,
  timerDisabled: boolean
) {
  let totalCorrectAnswers = 0;
  const { hints, time_allocated } = currentQuestion;
  userAnswers = userAnswers.filter((user_answer) => user_answer !== '');
  let verdict = false;
  let transformedQuestion: TQuestionResult = null as any;
  const copiedCurrentQuestion = JSON.parse(
    JSON.stringify(currentQuestion)
  ) as TQuestion;

  switch (currentQuestion.type) {
    case 'MCQ':
      verdict =
        currentQuestion.answers.length === userAnswers.length &&
        currentQuestion.answers[0].text.toString() ===
          currentQuestion.options![parseInt(userAnswers[0])].index;
      totalCorrectAnswers = verdict ? 1 : 0;
      transformedQuestion = transformReportSelectionQuestion(
        copiedCurrentQuestion as TSelectQuestion,
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
      transformedQuestion = transformReportSelectionQuestion(
        copiedCurrentQuestion as TSelectQuestion,
        userAnswers
      );
      break;
    case 'Snippet':
    case 'FIB':
      const result = checkInputAnswers(userAnswers, currentQuestion.answers);
      verdict = result[0];
      totalCorrectAnswers = result[1];
      transformedQuestion = {
        ...copiedCurrentQuestion,
        answers: result[2]
      } as any;
      break;
  }
  return [
    transformedQuestion,
    {
      verdict,
      score: calculateScore({
        time_allocated,
        time_taken,
        hints_used,
        partial_score,
        verdict,
        totalAnswers: currentQuestion.answers.length,
        totalCorrectAnswers,
        totalHints: hints.length,
        timerDisabled
      }),
      _id: shortid()
    }
  ] as const;
}
