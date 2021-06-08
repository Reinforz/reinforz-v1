import { ISettings, ISettingsPreset } from '../types';

export function generateDefaultSettingsState(): ISettings {
  return {
    animation: true,
    hovertips: true,
    theme: 'dark',
    shortcuts: true
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
