import {
  createDefaultPlaySettingsFiltersState,
  createDefaultPlaySettingsOptionsState
} from '.';
import { IPlaySettingsPreset } from '../types';

export const getPlaySettingsPresets = (): IPlaySettingsPreset => {
  const localStorageValue: string | null = localStorage.getItem(
    'reinforz.play.settings'
  );

  return localStorageValue
    ? JSON.parse(localStorageValue)
    : {
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
};
