import { generateReportQuizzesFromQuizzesMap } from '../../src/utils';

it(`Should work`, () => {
  expect(
    generateReportQuizzesFromQuizzesMap(
      new Map([['quiz1', { _id: 'quiz1' } as any]])
    )
  ).toStrictEqual({
    quiz1: {
      _id: 'quiz1'
    }
  });
});
