import {
  generateDefaultPlaySettingsPreset,
  getPlaySettingsPresets
} from '../../src/utils';
import { mockLocalStorage } from '../mockLocalStorage';

afterEach(() => {
  jest.restoreAllMocks();
});

const { getItemMock, setItemMock } = mockLocalStorage();

const defaultPlaySettingsPreset = generateDefaultPlaySettingsPreset();

it(`Should generate default play settings if data is not stored in local storage`, () => {
  getItemMock.mockReturnValueOnce(null);
  const playSettingsPresets = getPlaySettingsPresets();
  expect(setItemMock).toHaveBeenCalledWith(
    'reinforz.play.settings',
    JSON.stringify(defaultPlaySettingsPreset)
  );
  expect(getItemMock).toHaveBeenCalledWith('reinforz.play.settings');
  expect(playSettingsPresets).toStrictEqual(defaultPlaySettingsPreset);
});

it(`Should generate overridden play settings if data is stored in local storage`, () => {
  getItemMock.mockReturnValueOnce(JSON.stringify(defaultPlaySettingsPreset));
  const playSettingsPresets = getPlaySettingsPresets();
  expect(getItemMock).toHaveBeenCalledWith('reinforz.play.settings');
  expect(playSettingsPresets).toStrictEqual(defaultPlaySettingsPreset);
});
