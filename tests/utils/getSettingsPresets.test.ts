import { ISettingsPreset } from '../../src/types';
import { getSettingsPresets } from '../../src/utils';
import { mockLocalStorage } from '../mockLocalStorage';

afterEach(() => {
  jest.restoreAllMocks();
});

const { getItemMock } = mockLocalStorage();

const defaultSettingsPreset: ISettingsPreset = {
  current: 'default',
  presets: [
    {
      name: 'Default',
      id: 'default',
      data: {
        animation: true,
        hovertips: true,
        theme: 'dark',
        shortcuts: true
      }
    }
  ]
};

it(`Should generate default settings if data is not stored in local storage`, () => {
  getItemMock.mockReturnValueOnce(null);
  const settingsPresets = getSettingsPresets();
  expect(settingsPresets).toStrictEqual(defaultSettingsPreset);
});

it(`Should generate overridden settings if data is stored in local storage`, () => {
  getItemMock.mockReturnValueOnce(JSON.stringify(defaultSettingsPreset));
  const settingsPresets = getSettingsPresets();
  expect(settingsPresets).toStrictEqual(defaultSettingsPreset);
});
