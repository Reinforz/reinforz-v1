import {
  generateDefaultReportSettingsPreset,
  getReportSettingsPresets
} from '../../src/utils';
import { mockLocalStorage } from '../mockLocalStorage';

afterEach(() => {
  jest.restoreAllMocks();
});

const { getItemMock, setItemMock } = mockLocalStorage();

const defaultReportSettingsPreset = generateDefaultReportSettingsPreset();

it(`Should generate default settings if data is not stored in local storage`, () => {
  getItemMock.mockReturnValueOnce(null);
  const reportSettingsPresets = getReportSettingsPresets();
  expect(setItemMock).toHaveBeenCalledWith(
    'reinforz.report.settings',
    JSON.stringify(defaultReportSettingsPreset)
  );
  expect(getItemMock).toHaveBeenCalledWith('reinforz.report.settings');
  expect(reportSettingsPresets).toStrictEqual(defaultReportSettingsPreset);
});

it(`Should generate overridden settings if data is stored in local storage`, () => {
  getItemMock.mockReturnValueOnce(JSON.stringify(defaultReportSettingsPreset));
  const reportSettingsPresets = getReportSettingsPresets();
  expect(getItemMock).toHaveBeenCalledWith('reinforz.report.settings');
  expect(reportSettingsPresets).toStrictEqual(defaultReportSettingsPreset);
});
