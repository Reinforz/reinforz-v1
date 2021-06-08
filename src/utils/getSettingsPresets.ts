import { ISettingsPreset } from '../types';
import { generateDefaultSettingsPreset } from './generateDefaultSettings';

export const getSettingsPresets = (): ISettingsPreset => {
  const localStorageValue: string | null = localStorage.getItem(
    'reinforz.settings'
  );

  const defaultPreset = generateDefaultSettingsPreset();

  if (!localStorageValue) {
    localStorage.setItem('reinforz.settings', JSON.stringify(defaultPreset));
    return defaultPreset;
  }

  return JSON.parse(localStorageValue);
};
