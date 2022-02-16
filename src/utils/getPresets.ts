import {
  generateDefaultPlaySettingsPreset,
  generateDefaultReportSettingsPreset,
  generateDefaultSettingsPreset
} from '.';
import {
  REINFORZ_GLOBAL_SETTINGS_LS_KEY, REINFORZ_PLAY_SETTINGS_LS_KEY,
  REINFORZ_REPORT_SETTINGS_LS_KEY
} from '../constants';
import {
  IGlobalSettingsPresetConfig, IPlaySettingsPresetConfig,
  IReportSettingsPresetConfig
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
  return getPreset<IPlaySettingsPresetConfig>(
    REINFORZ_PLAY_SETTINGS_LS_KEY,
    generateDefaultPlaySettingsPreset
  );
};

export const getReportSettingsPresets = () => {
  return getPreset<IReportSettingsPresetConfig>(
    REINFORZ_REPORT_SETTINGS_LS_KEY,
    generateDefaultReportSettingsPreset
  );
};

export const getSettingsPresets = () => {
  return getPreset<IGlobalSettingsPresetConfig>(
    REINFORZ_GLOBAL_SETTINGS_LS_KEY,
    generateDefaultSettingsPreset
  );
};
