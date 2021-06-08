import { generateDefaultReportSettingsPreset } from '.';
import { IReportSettingsPreset } from '../types';

export function getReportSettingsPresets(): IReportSettingsPreset {
  const localStorageValue: string | null = localStorage.getItem(
    'reinforz.report.settings'
  );

  if (!localStorageValue) {
    const defaultPreset = generateDefaultReportSettingsPreset();
    localStorage.setItem(
      'reinforz.report.settings',
      JSON.stringify(defaultPreset)
    );
    return defaultPreset;
  }

  return JSON.parse(localStorageValue);
}
