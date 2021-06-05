import merge from 'lodash.merge';
import { IReportAggregator } from '../types';
import { createDefaultReportAggregatorState } from './';

export function getReportAggregator(): IReportAggregator {
  let localStorageValue = localStorage.getItem('REPORT_AGGREGATOR');
  localStorageValue = localStorageValue ? JSON.parse(localStorageValue) : {};
  return merge(createDefaultReportAggregatorState(), localStorageValue);
}
