import { IReportFilterState, TQuestionResult } from '../types';

export function applyResultFilters(
  results: TQuestionResult[],
  reportFilter: Omit<IReportFilterState, 'excluded_columns'>
) {
  const {
    excluded_types,
    excluded_quizzes,
    excluded_difficulty,
    verdict,
    hints_used,
    time_taken
  } = reportFilter;

  const filteredResults = results.filter(
    (result) =>
      !excluded_types.includes(result.type) &&
      !excluded_difficulty.includes(result.difficulty) &&
      (verdict === 'mixed' ||
        verdict.toString() === result.verdict.toString()) &&
      (hints_used === 'any' || result.hints_used <= hints_used) &&
      time_taken[0] <= result.time_taken &&
      time_taken[1] >= result.time_taken &&
      !excluded_quizzes.includes(result.quiz._id)
  );

  return filteredResults;
}
