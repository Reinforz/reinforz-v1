import {
  IReportAggregator,
  IReportExport,
  IReportFilter,
  IReportSettings,
  IReportSettingsPreset
} from '../types';

export function generateDefaultReportSettingsFilterState() {
  return {
    time_taken: ['<>', [0, 120]],
    hints_used: ['<>', [0, 10]],
    score: ['<>', [0, 1]],
    verdict: 'any',
    excluded_types: [],
    excluded_difficulty: [],
    excluded_quizzes: [],
    excluded_columns: [],
    excluded_topics: [],
    excluded_subjects: []
  } as IReportFilter;
}

export function generateDefaultReportSettingsExportState() {
  return {
    export_type: 'Quizzes',
    export_as: 'YAML'
  } as IReportExport;
}

export function generateDefaultReportSettignsAggregatorState() {
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
    filters: generateDefaultReportSettingsFilterState(),
    sort: [],
    aggregator: generateDefaultReportSettignsAggregatorState(),
    export: generateDefaultReportSettingsExportState()
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
