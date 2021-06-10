import { KeyboardEvent, SetStateAction } from 'react';
import { IPreset } from '../types';

export function navigateBetweenPresets(
  event: KeyboardEvent<HTMLDivElement>,
  settings: IPreset<any>,
  setSettings: (value: SetStateAction<IPreset<any>>) => void,
  lsKey: string
) {
  let newPresetId: string | null = null;
  if (event.nativeEvent.altKey && event.nativeEvent.code === 'KeyS') {
    if (settings.presets.length !== 1) {
      const presetIndex = settings.presets.findIndex(
        (preset) => preset.id === settings.current
      );
      if (presetIndex === settings.presets.length - 1) {
        newPresetId = 'default';
      } else {
        newPresetId = settings.presets[presetIndex + 1].id;
      }
    }
  } else if (event.nativeEvent.altKey && event.nativeEvent.code === 'KeyA') {
    if (settings.presets.length !== 1) {
      const presetIndex = settings.presets.findIndex(
        (settingsPreset) => settingsPreset.id === settings.current
      );
      if (presetIndex === 0) {
        newPresetId = settings.presets[settings.presets.length - 1].id;
      } else {
        newPresetId = settings.presets[presetIndex - 1].id;
      }
    }
  }

  if (newPresetId !== null) {
    setSettings({
      current: newPresetId,
      presets: settings.presets
    });

    localStorage.setItem(
      lsKey,
      JSON.stringify({
        current: newPresetId,
        presets: settings.presets
      })
    );
  }
}
