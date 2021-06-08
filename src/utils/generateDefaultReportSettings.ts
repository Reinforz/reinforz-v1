import {
  IReportAggregator,
  IReportExport,
  IReportFilter,
  IReportSettings,
  IReportSettingsPreset
} from '../types';

export function generateDefaultReportFilterState() {
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

export function generateDefaultReportExportState() {
  return {
    export_type: 'Quizzes',
    export_as: 'YAML'
  } as IReportExport;
}

export function generateDefaultReportAggregatorState() {
  return {
    time_allocated: 'AVG',
    time_taken: 'AVG',
    weight: 'AVG',
    score: 'AVG',
    verdict: 'TRUE',
    hints_used: 'AVG'
  } as IReportAggregator;
}

export function generateDefaultReportSettingsState(): IReportSettings {
  return {
    filters: generateDefaultReportFilterState(),
    sort: [],
    aggregator: generateDefaultReportAggregatorState(),
    export: generateDefaultReportExportState()
  };
}

export function generateDefaultReportSettingsPreset(): IReportSettingsPreset {
  return {
    current: 'default',
    presets: [
      {
        name: 'Default',
        id: 'default',
        data: generateDefaultReportSettingsState()
      }
    ]
  };
}
