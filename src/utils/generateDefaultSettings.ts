import { IGlobalSettings, IGlobalSettingsPresetConfig } from '../types';

export function generateDefaultSettingsState(): IGlobalSettings {
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
    },
    font: 'sans-serif',
    color: {
      primary: '#3f51b5'
    }
  };
}

export function generateDefaultSettingsPreset(): IGlobalSettingsPresetConfig {
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
