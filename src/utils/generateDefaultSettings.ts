import { ISettings, ISettingsPreset } from '../types';

export function generateDefaultSettingsState(): ISettings {
  return {
    animation: true,
    hovertips: true,
    theme: 'dark',
    shortcuts: true,
    sound: false,
    navigation: {
      x: 'center',
      y: 'top',
      direction: 'row'
    }
  };
}

export function generateDefaultSettingsPreset(): ISettingsPreset {
  return {
    current: 'default',
    presets: [
      {
        name: 'Default',
        id: 'default',
        data: generateDefaultSettingsState()
      }
    ]
  };
}
