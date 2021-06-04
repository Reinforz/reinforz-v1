import {
  createDefaultPlaySettingsFiltersState,
  createDefaultPlaySettingsOptionsState
} from '.';
import { IPlaySettings } from '../types';

export function getPlaySettings(): IPlaySettings {
  return JSON.parse(
    localStorage.getItem('PLAY_SETTINGS') ??
      JSON.stringify({
        options: createDefaultPlaySettingsOptionsState(),
        filters: createDefaultPlaySettingsFiltersState()
      })
  );
}
