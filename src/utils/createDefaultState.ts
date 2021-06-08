import { IReportAggregator, IReportExport, IReportFilter } from '../types';

export function createDefaultReportFilterState() {
  return {
    time_taken: [0, 120],
    verdict: 'any',
    hints_used: [0, 10],
    excluded_types: [],
    excluded_difficulty: [],
    excluded_quizzes: [],
    excluded_columns: [],
    excluded_topics: [],
    excluded_subjects: [],
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
