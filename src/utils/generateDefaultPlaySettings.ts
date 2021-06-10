import {
  IPlaySettings,
  IPlaySettingsFilters,
  IPlaySettingsOptions,
  IPlaySettingsPreset
} from '../types';

export function generateDefaultPlaySettingsOptionsState() {
  return {
    shuffle_options: true,
    shuffle_quizzes: false,
    shuffle_questions: true,
    instant_feedback: true,
    flatten_mix: false,
    partial_score: true,
    disable_timer: false
  } as IPlaySettingsOptions;
}

export function generateDefaultPlaySettingsFiltersState() {
  return {
    time_allocated: ['<>', [5, 120]],
    excluded_difficulty: [],
    excluded_types: []
  } as IPlaySettingsFilters;
}

export function generateDefaultPlaySettingsState(): IPlaySettings {
  return {
    options: generateDefaultPlaySettingsOptionsState(),
    filters: generateDefaultPlaySettingsFiltersState()
  };
}

export function generateDefaultPlaySettingsPreset(): IPlaySettingsPreset {
  return {
    current: 'default',
    presets: [
      {
        name: 'Default',
        id: 'default',
        data: generateDefaultPlaySettingsState()
      }
    ]
  };
}
