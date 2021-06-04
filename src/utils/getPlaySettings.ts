import merge from 'lodash.merge';
import { IPlaySettings } from '../types';
import {
  createDefaultPlaySettingsFiltersState,
  createDefaultPlaySettingsOptionsState
} from './';

export function getPlaySettings(): IPlaySettings {
  let localStorageValue = localStorage.getItem('PLAY_SETTINGS');
  localStorageValue = localStorageValue ? JSON.parse(localStorageValue) : {};
  return merge(
    {
      options: createDefaultPlaySettingsOptionsState(),
      filters: createDefaultPlaySettingsFiltersState()
    },
    localStorageValue
  );
}
