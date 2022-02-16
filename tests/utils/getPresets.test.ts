import {
  REINFORZ_GLOBAL_SETTINGS_LS_KEY, REINFORZ_PLAY_SETTINGS_LS_KEY,
  REINFORZ_REPORT_SETTINGS_LS_KEY
} from '../../src/constants';
import {
  generateDefaultPlaySettingsPreset,
  generateDefaultReportSettingsPreset,
  generateDefaultSettingsPreset,
  getPlaySettingsPresets,
  getReportSettingsPresets,
  getSettingsPresets
} from '../../src/utils';
import { mockLocalStorage } from '../mockLocalStorage';

afterEach(() => {
  jest.restoreAllMocks();
});

const { getItemMock, setItemMock } = mockLocalStorage();

describe('getPlaySettingsPresets', () => {
  it(`Should work`, () => {
    getItemMock.mockReturnValueOnce(null);
    const playSettingsPresets = getPlaySettingsPresets();
    expect(getItemMock).toHaveBeenCalledWith(REINFORZ_PLAY_SETTINGS_LS_KEY);
    expect(playSettingsPresets).toStrictEqual(
      generateDefaultPlaySettingsPreset()
    );
  });
});

describe('getSettingsPresets', () => {
  it(`Should work`, () => {
    const defaultPreset = generateDefaultSettingsPreset();
    getItemMock.mockReturnValueOnce(null);
    const settingsPresets = getSettingsPresets();
    expect(getItemMock).toHaveBeenCalledWith(REINFORZ_GLOBAL_SETTINGS_LS_KEY);
    expect(setItemMock).toHaveBeenCalledWith(
      REINFORZ_GLOBAL_SETTINGS_LS_KEY,
      JSON.stringify(defaultPreset)
    );
    expect(settingsPresets).toStrictEqual(defaultPreset);
  });
});

describe('getReportSettingsPresets', () => {
  it(`Should work`, () => {
    const defaultPreset = generateDefaultReportSettingsPreset();
    getItemMock.mockReturnValueOnce(JSON.stringify(defaultPreset));
    const reportSettingsPresets = getReportSettingsPresets();
    expect(getItemMock).toHaveBeenCalledWith(REINFORZ_REPORT_SETTINGS_LS_KEY);
    expect(reportSettingsPresets).toStrictEqual(defaultPreset);
  });
});
