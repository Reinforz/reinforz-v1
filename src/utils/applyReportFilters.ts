import { IReportFilter, IResult } from '../types';

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
    score
  } = reportFilter;

  const filteredResults = results.filter(
    (result) =>
      !excluded_types.includes(result.question.type) &&
      !excluded_difficulty.includes(result.question.difficulty) &&
      (verdict === 'any' || verdict.toString() === result.verdict.toString()) &&
      (hints_used === 'any' || result.hints_used <= hints_used) &&
      time_taken[0] <= result.time_taken &&
      time_taken[1] >= result.time_taken &&
      score[0] <= result.score.amount &&
      score[1] >= result.score.amount &&
      !excluded_quizzes.includes(result.question.quiz._id)
  );

  return filteredResults;
}
