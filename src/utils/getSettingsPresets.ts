import { ISettingsPreset } from '../types';

export const getSettingsPresets = (): ISettingsPreset => {
  const localStorageValue: string | null = localStorage.getItem(
    'reinforz.settings'
  );

  const presetValue: ISettingsPreset = {
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

  if (!localStorageValue) {
    localStorage.setItem('reinforz.settings', JSON.stringify(presetValue));
    return presetValue;
  }

  return JSON.parse(localStorageValue);
};
