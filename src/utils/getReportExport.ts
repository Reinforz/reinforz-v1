import merge from 'lodash.merge';
import { IReportExport } from '../types';
import { createDefaultReportExportState } from './';

export function getReportExport(): IReportExport {
  let localStorageValue = localStorage.getItem('REPORT_EXPORT');
  localStorageValue = localStorageValue ? JSON.parse(localStorageValue) : {};
  return merge(createDefaultReportExportState(), localStorageValue);
}
