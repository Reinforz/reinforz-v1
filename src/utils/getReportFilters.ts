import merge from 'lodash.merge';
import { IReportFilter } from '../types';
import { createDefaultReportFilterState } from './';

export function getReportFilters(): IReportFilter {
  let localStorageValue = localStorage.getItem('REPORT_FILTERS');
  localStorageValue = localStorageValue ? JSON.parse(localStorageValue) : {};
  return merge(createDefaultReportFilterState(), localStorageValue);
}
