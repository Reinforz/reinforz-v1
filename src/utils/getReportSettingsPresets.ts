import { createDefaultReportFilterState } from '.';
import { IReportSettingsPreset } from '../types';
import {
  createDefaultReportAggregatorState,
  createDefaultReportExportState
} from './createDefaultState';

export function getReportSettingsPresets(): IReportSettingsPreset {
  const localStorageValue: string | null = localStorage.getItem(
    'reinforz.report.settings'
  );

  const defaultPreset: IReportSettingsPreset = {
    current: 'default',
    presets: [
      {
        name: 'Default',
        id: 'default',
        data: {
          filters: createDefaultReportFilterState(),
          sort: [],
          aggregator: createDefaultReportAggregatorState(),
          export: createDefaultReportExportState()
        }
      }
    ]
  };

  if (!localStorageValue) {
    localStorage.setItem(
      'reinforz.report.settings',
      JSON.stringify(defaultPreset)
    );
    return defaultPreset;
  }

  return JSON.parse(localStorageValue);
}
