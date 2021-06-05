import { getReportExport } from '../../src/utils';
import { mockLocalStorage } from '../mockLocalStorage';

const { getItemMock } = mockLocalStorage();

it(`Should work if report export exists in ls`, () => {
  getItemMock.mockReturnValueOnce(
    JSON.stringify({
      export_as: 'JSON'
    })
  );
  const reportExport = getReportExport();
  expect(reportExport).toStrictEqual({
    export_as: 'JSON',
    export_type: 'Original'
  });
});

it(`Should work if report export doesn't exist in ls`, () => {
  getItemMock.mockReturnValueOnce(null);
  const reportExport = getReportExport();
  expect(reportExport).toStrictEqual({
    export_as: 'YAML',
    export_type: 'Original'
  });
});
