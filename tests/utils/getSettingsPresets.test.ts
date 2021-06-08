import {
  generateDefaultSettingsPreset,
  getSettingsPresets
} from '../../src/utils';
import { mockLocalStorage } from '../mockLocalStorage';

afterEach(() => {
  jest.restoreAllMocks();
});

const { getItemMock, setItemMock } = mockLocalStorage();

const defaultSettingsPreset = generateDefaultSettingsPreset();

it(`Should generate default settings if data is not stored in local storage`, () => {
  getItemMock.mockReturnValueOnce(null);
  const playSettingsPresets = getSettingsPresets();
  expect(setItemMock).toHaveBeenCalledWith(
    'reinforz.settings',
    JSON.stringify(defaultSettingsPreset)
  );
  expect(getItemMock).toHaveBeenCalledWith('reinforz.settings');
  expect(playSettingsPresets).toStrictEqual(defaultSettingsPreset);
});

it(`Should generate overridden settings if data is stored in local storage`, () => {
  getItemMock.mockReturnValueOnce(JSON.stringify(defaultSettingsPreset));
  const playSettingsPresets = getSettingsPresets();
  expect(getItemMock).toHaveBeenCalledWith('reinforz.settings');
  expect(playSettingsPresets).toStrictEqual(defaultSettingsPreset);
});
