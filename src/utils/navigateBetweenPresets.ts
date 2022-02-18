import { KeyboardEvent, SetStateAction } from 'react';
import { IPresetConfig } from '../types';

/**
 * Navigate between preset by pressing appropriate keys
 * @param event Event to extract current pressed key from
 * @param presetConfig Preset config to search for current preset
 * @param setSettings A state mutation function, called only if a new preset was selected
 * @param lsKey Local storage key to update
 */
export function navigateBetweenPresets(
  event: KeyboardEvent<HTMLDivElement>,
  presetConfig: IPresetConfig<any>,
  setSettings: (value: SetStateAction<IPresetConfig<any>>) => void,
  lsKey: string
) {
  let newPresetId: string | null = null;
  // If there are more that one preset in config, only then we can toggle
  if (presetConfig.presets.length !== 1) {
    // Find the current preset index
    const presetIndex = presetConfig.presets.findIndex(
      (preset) => preset.id === presetConfig.current
    );

    // Alt + S to move to the next preset
    if (event.nativeEvent.altKey && event.nativeEvent.code === 'KeyS') {
      // Set the new preset id by moving forward
      newPresetId = presetConfig.presets[presetIndex === presetConfig.presets.length - 1 ? 0 : presetIndex + 1].id;
    } else if (event.nativeEvent.altKey && event.nativeEvent.code === 'KeyA') {
      newPresetId = presetConfig.presets[presetIndex === 0 ? presetConfig.presets.length - 1 : presetIndex - 1].id;
    }
  }

  // If a new preset was set, it would be set if we hit the right shortcuts
  if (newPresetId !== null) {
    if (typeof window !== "undefined") {
      localStorage.setItem(
        lsKey,
        JSON.stringify({
          current: newPresetId,
          presets: presetConfig.presets
        })
      );
    }

    setSettings({
      current: newPresetId,
      presets: presetConfig.presets
    })
  }
}
