import { KeyboardEvent, SetStateAction } from 'react';
import { IPreset } from '../types';

export function navigateBetweenPresets(
  event: KeyboardEvent<HTMLDivElement>,
  settings: IPreset<any>,
  setSettings: (value: SetStateAction<IPreset<any>>) => void,
  lsKey: string
) {
  let newPresetId: string | null = null;
  if (settings.presets.length !== 1) {
    if (event.nativeEvent.altKey && event.nativeEvent.code === 'KeyS') {
      const presetIndex = settings.presets.findIndex(
        (preset) => preset.id === settings.current
      );
      newPresetId =
        presetIndex === settings.presets.length - 1
          ? 'default'
          : settings.presets[presetIndex + 1].id;
    } else if (event.nativeEvent.altKey && event.nativeEvent.code === 'KeyA') {
      const presetIndex = settings.presets.findIndex(
        (settingsPreset) => settingsPreset.id === settings.current
      );
      newPresetId =
        presetIndex === 0
          ? settings.presets[settings.presets.length - 1].id
          : settings.presets[presetIndex - 1].id;
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
