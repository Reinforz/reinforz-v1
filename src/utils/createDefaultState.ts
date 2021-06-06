import {
  IPlaySettingsFilters,
  IPlaySettingsOptions,
  IReportAggregator,
  IReportExport,
  IReportFilter
} from '../types';

export function createDefaultPlaySettingsOptionsState() {
  return {
    shuffle_options: true,
    shuffle_quizzes: false,
    shuffle_questions: true,
    instant_feedback: true,
    flatten_mix: false,
    partial_score: true,
    disable_timer: false
  } as IPlaySettingsOptions;
}

export function createDefaultPlaySettingsFiltersState() {
  return {
    time_allocated: [5, 120],
    excluded_difficulty: [],
    excluded_types: []
  } as IPlaySettingsFilters;
}

export function createDefaultReportFilterState() {
  return {
    time_taken: [0, 120],
    verdict: 'mixed',
    hints_used: 'any',
    excluded_types: [],
    excluded_difficulty: [],
    excluded_quizzes: [],
    excluded_columns: [],
    score: [0, 1]
  } as IReportFilter;
}

export function createDefaultReportExportState() {
  return {
    export_type: 'Quizzes',
    export_as: 'YAML'
  } as IReportExport;
}

export function createDefaultReportAggregatorState() {
  return {
    time_allocated: 'AVG',
    time_taken: 'AVG',
    weight: 'AVG',
    score: 'AVG',
    verdict: 'TRUE',
    hints_used: 'AVG'
  } as IReportAggregator;
}
