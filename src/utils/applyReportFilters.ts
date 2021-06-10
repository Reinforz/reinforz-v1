import { IReportFilter, IResult } from '../types';
import { applyNumberOperator } from './applyNumberOperator';

export function applyReportFilters(
  results: IResult[],
  reportFilter: Omit<IReportFilter, 'excluded_columns'>
) {
  const {
    excluded_types,
    excluded_quizzes,
    excluded_difficulty,
    verdict,
    hints_used,
    time_taken,
    score,
    excluded_subjects,
    excluded_topics
  } = reportFilter;

  const filteredResults = results.filter(
    (result) =>
      !excluded_types.includes(result.question.type) &&
      !excluded_difficulty.includes(result.question.difficulty) &&
      !excluded_topics.includes(result.question.quiz.topic) &&
      !excluded_subjects.includes(result.question.quiz.subject) &&
      (verdict === 'any' || verdict.toString() === result.verdict.toString()) &&
      applyNumberOperator(hints_used, result.hints_used) &&
      applyNumberOperator(time_taken, result.time_taken) &&
      applyNumberOperator(score, result.score.amount) &&
      !excluded_quizzes.includes(result.question.quiz._id)
  );

  return filteredResults;
}
