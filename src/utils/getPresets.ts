import {
  generateDefaultPlaySettingsPreset,
  generateDefaultReportSettingsPreset,
  generateDefaultSettingsPreset
} from '.';
import {
  IPlaySettingsPreset,
  IReportSettingsPreset,
  ISettingsPreset
} from '../types';

function getPreset<T>(key: string, fn: () => T) {
  const localStorageValue: string | null = localStorage.getItem(key);

  if (!localStorageValue) {
    const presetValue = fn();
    localStorage.setItem(key, JSON.stringify(presetValue));
    return presetValue;
  }

  return JSON.parse(localStorageValue) as T;
}

export const getPlaySettingsPresets = () => {
  return getPreset<IPlaySettingsPreset>(
    'reinforz.play.settings',
    generateDefaultPlaySettingsPreset
  );
};

export const getReportSettingsPresets = () => {
  return getPreset<IReportSettingsPreset>(
    'reinforz.report.settings',
    generateDefaultReportSettingsPreset
  );
};

export const getSettingsPresets = () => {
  return getPreset<ISettingsPreset>(
    'reinforz.settings',
    generateDefaultSettingsPreset
  );
};
