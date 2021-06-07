import { getReportFilters } from '../../src/utils';
import { mockLocalStorage } from '../mockLocalStorage';

const { getItemMock } = mockLocalStorage();

it(`Should work if report filters exists in ls`, () => {
  getItemMock.mockReturnValueOnce(
    JSON.stringify({
      time_taken: [0, 120],
      verdict: 'false',
      hints_used: 'any'
    })
  );
  const reportFilters = getReportFilters();
  expect(reportFilters).toStrictEqual({
    time_taken: [0, 120],
    score: [0, 1],
    verdict: 'false',
    hints_used: 'any',
    excluded_types: [],
    excluded_difficulty: [],
    excluded_quizzes: [],
    excluded_columns: [],
    excluded_topics: [],
    excluded_subjects: []
  });
});

it(`Should work if report filters doesn't exist in ls`, () => {
  getItemMock.mockReturnValueOnce(null);
  const reportFilters = getReportFilters();
  expect(reportFilters).toStrictEqual({
    time_taken: [0, 120],
    score: [0, 1],
    verdict: 'any',
    hints_used: 'any',
    excluded_types: [],
    excluded_difficulty: [],
    excluded_quizzes: [],
    excluded_columns: [],
    excluded_topics: [],
    excluded_subjects: []
  });
});
