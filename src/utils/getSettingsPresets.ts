import { ISettingsPreset } from '../types';

export const getSettingsPresets = (): ISettingsPreset => {
  const localStorageValue: string | null = localStorage.getItem(
    'reinforz.play.settings'
  );

  return localStorageValue
    ? JSON.parse(localStorageValue)
    : {
        current: 'default',
        presets: [
          {
            name: 'default',
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
