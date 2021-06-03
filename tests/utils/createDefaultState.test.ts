import {
  createDefaultPlaySettingsFiltersState,
  createDefaultPlaySettingsOptionsState,
  createDefaultReportFilterState
} from '../../src/utils/createDefaultState';

describe('createDefaultPlaySettingsOptionsState', () => {
  it(`Should return expected value`, () => {
    const defaultPlaySettingsOptionsState = createDefaultPlaySettingsOptionsState();
    expect(defaultPlaySettingsOptionsState).toStrictEqual({
      shuffle_options: true,
      shuffle_quizzes: false,
      shuffle_questions: true,
      instant_feedback: true,
      flatten_mix: false,
      partial_score: true,
      disable_timer: false
    });
  });
});

describe('createDefaultPlaySettingsFiltersState', () => {
  it(`Should return expected value`, () => {
    const defaultPlaySettingsFiltersState = createDefaultPlaySettingsFiltersState();
    expect(defaultPlaySettingsFiltersState).toStrictEqual({
      time_allocated: [5, 120],
      excluded_difficulty: [],
      excluded_types: []
    });
  });
});

describe('createDefaultReportFilterState', () => {
  it(`Should return expected value`, () => {
    const defaultReportFiltersState = createDefaultReportFilterState();
    expect(defaultReportFiltersState).toStrictEqual({
      time_taken: [0, 120],
      verdict: 'mixed',
      hints_used: 'any',
      excluded_types: [],
      excluded_difficulty: [],
      excluded_quizzes: [],
      excluded_columns: []
    });
  });
});
