import { REINFORZ_GLOBAL_SETTINGS_LS_KEY, REINFORZ_PLAY_SETTINGS_LS_KEY, REINFORZ_REPORT_SETTINGS_LS_KEY } from '../constants';
import {
  IGlobalSettingsPresetConfig, IPlaySettingsPresetConfig,
  IReportSettingsPresetConfig
} from '../types';
import { generateDefaultPlaySettingsPreset } from './generateDefaultPlaySettings';
import { generateDefaultReportSettingsPreset } from './generateDefaultReportSettings';
import { generateDefaultSettingsPreset } from './generateDefaultSettings';

function getPreset<T>(key: string, fn: () => T) {
  // local storage could be undefined inside a server environment
  // In order to avoid throwing error check if window is defined
  // window is only present inside a browser environment
  const localStorageValue: string | null = typeof window !== "undefined" ? localStorage.getItem(key) : null;

  if (!localStorageValue) {
    const presetValue = fn();
    if (typeof window !== "undefined") {
      localStorage.setItem(key, JSON.stringify(presetValue));
    }
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
