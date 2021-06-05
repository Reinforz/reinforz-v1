import { getReportAggregator } from '../../src/utils';
import { mockLocalStorage } from '../mockLocalStorage';

const { getItemMock } = mockLocalStorage();

it(`Should work if report aggregator exists in ls`, () => {
  getItemMock.mockReturnValueOnce(
    JSON.stringify({
      time_allocated: 'MIN',
      time_taken: 'MIN'
    })
  );
  const reportAggregator = getReportAggregator();
  expect(reportAggregator).toStrictEqual({
    time_allocated: 'MIN',
    time_taken: 'MIN',
    weight: 'AVG',
    score: 'AVG',
    verdict: 'TRUE',
    hints_used: 'AVG'
  });
});

it(`Should work if report aggregator doesn't exist in ls`, () => {
  getItemMock.mockReturnValueOnce(null);
  const reportAggregator = getReportAggregator();
  expect(reportAggregator).toStrictEqual({
    time_allocated: 'AVG',
    time_taken: 'AVG',
    weight: 'AVG',
    score: 'AVG',
    verdict: 'TRUE',
    hints_used: 'AVG'
  });
});
