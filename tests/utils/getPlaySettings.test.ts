import { IPlaySettingsPreset } from '../../src/types';
import {
  createDefaultPlaySettingsFiltersState,
  createDefaultPlaySettingsOptionsState,
  getPlaySettingsPresets
} from '../../src/utils';
import { mockLocalStorage } from '../mockLocalStorage';

const { getItemMock } = mockLocalStorage();

const defaultPlaySettingsPreset: IPlaySettingsPreset = {
  current: 'default',
  presets: [
    {
      name: 'Default',
      id: 'default',
      data: {
        options: createDefaultPlaySettingsOptionsState(),
        filters: createDefaultPlaySettingsFiltersState()
      }
    }
  ]
};

it(`Should work if play settings exists in ls`, () => {
  getItemMock.mockReturnValueOnce(JSON.stringify(defaultPlaySettingsPreset));
  const playSettingsPresets = getPlaySettingsPresets();

  expect(playSettingsPresets).toStrictEqual(defaultPlaySettingsPreset);
});

it(`Should work if play settings doesn't exist in ls`, () => {
  getItemMock.mockReturnValueOnce(null);
  const playSettingsPresets = getPlaySettingsPresets();
  expect(playSettingsPresets).toStrictEqual(defaultPlaySettingsPreset);
});
