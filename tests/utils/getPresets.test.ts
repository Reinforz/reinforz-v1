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
    expect(getItemMock).toHaveBeenCalledWith('reinforz.play.settings');
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
    expect(getItemMock).toHaveBeenCalledWith('reinforz.settings');
    expect(setItemMock).toHaveBeenCalledWith(
      'reinforz.settings',
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
    expect(getItemMock).toHaveBeenCalledWith('reinforz.report.settings');
    expect(reportSettingsPresets).toStrictEqual(defaultPreset);
  });
});
