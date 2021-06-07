import { ISettingsPreset } from '../types';

export const getSettingsPresets = (): ISettingsPreset => {
  const localStorageValue: string | null = localStorage.getItem(
    'reinforz.settings'
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
              animation: true,
              hovertips: true,
              theme: 'dark',
              shortcuts: true
            }
          }
        ]
      };
};
