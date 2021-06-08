import { IReportSettingsPreset } from '../../src/types';
import {
  createDefaultReportAggregatorState,
  createDefaultReportExportState,
  createDefaultReportFilterState,
  getReportSettingsPresets
} from '../../src/utils';
import { mockLocalStorage } from '../mockLocalStorage';

afterEach(() => {
  jest.restoreAllMocks();
});

const { getItemMock } = mockLocalStorage();

const defaultReportSettingsPreset: IReportSettingsPreset = {
  current: 'default',
  presets: [
    {
      name: 'Default',
      id: 'default',
      data: {
        filters: createDefaultReportFilterState(),
        sort: [],
        aggregator: createDefaultReportAggregatorState(),
        export: createDefaultReportExportState()
      }
    }
  ]
};

it(`Should generate default settings if data is not stored in local storage`, () => {
  getItemMock.mockReturnValueOnce(null);
  const reportSettingsPresets = getReportSettingsPresets();
  expect(reportSettingsPresets).toStrictEqual(defaultReportSettingsPreset);
});

it(`Should generate overridden settings if data is stored in local storage`, () => {
  getItemMock.mockReturnValueOnce(JSON.stringify(defaultReportSettingsPreset));
  const reportSettingsPresets = getReportSettingsPresets();
  expect(reportSettingsPresets).toStrictEqual(defaultReportSettingsPreset);
});
