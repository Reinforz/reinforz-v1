import {
  createDefaultPlaySettingsFiltersState,
  createDefaultPlaySettingsOptionsState
} from '.';
import { IPlaySettingsPreset } from '../types';

export const getPlaySettingsPresets = (): IPlaySettingsPreset => {
  const localStorageValue: string | null = localStorage.getItem(
    'reinforz.play.settings'
  );

  const presetValue: IPlaySettingsPreset = {
    current: 'default',
    presets: [
      {
        name: 'Default',
        id: 'default',
        data: {
          options: createDefaultPlaySettingsOptionsState(),
          filters: createDefaultPlaySettingsFiltersState()
        }
      }
    ]
  };

  if (!localStorageValue) {
    localStorage.setItem('reinforz.play.settings', JSON.stringify(presetValue));
    return presetValue;
  }

  return JSON.parse(localStorageValue);
};
