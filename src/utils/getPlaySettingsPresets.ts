import {} from '.';
import { IPlaySettingsPreset } from '../types';
import { generateDefaultPlaySettingsPreset } from './generateDefaultPlaySettings';

export const getPlaySettingsPresets = (): IPlaySettingsPreset => {
  const localStorageValue: string | null = localStorage.getItem(
    'reinforz.play.settings'
  );

  const presetValue = generateDefaultPlaySettingsPreset();

  if (!localStorageValue) {
    localStorage.setItem('reinforz.play.settings', JSON.stringify(presetValue));
    return presetValue;
  }

  return JSON.parse(localStorageValue);
};
