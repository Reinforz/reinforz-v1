import {
  applyReportSorts,
  getBooleanComparison,
  getNumberComparison,
  getStringComparison,
  returnSort
} from '../../src/utils';

const result_1: any = {
    score: {
      amount: 1
    },
    question: {
      weight: 1,
      time_allocated: 45,
      type: 'Snippet',
      difficulty: 'Beginner'
    },
    time_taken: 45,
    hints_used: 2,
    verdict: true
  },
  result_2: any = {
    score: {
      amount: 0.5
    },
    question: {
      weight: 0.5,
      time_allocated: 30,
      type: 'MCQ',
      difficulty: 'Advanced'
    },
    time_taken: 30,
    hints_used: 0,
    verdict: false
  },
  result_3: any = {
    score: {
      amount: 0.5
    },
    question: {
      weight: 0.6
    }
  };

describe('returnSort', () => {
  it(`Should work for comparison=greater,order=DESC`, () => {
    const returnedSort = returnSort('greater', 'DESC');
    expect(returnedSort).toStrictEqual(-1);
  });

  it(`Should work for comparison=greater,order=ASC`, () => {
    const returnedSort = returnSort('greater', 'ASC');
    expect(returnedSort).toStrictEqual(1);
  });

  it(`Should work for comparison=lesser,order=ASC`, () => {
    const returnedSort = returnSort('lesser', 'ASC');
    expect(returnedSort).toStrictEqual(-1);
  });

  it(`Should work for comparison=lesser,order=DESC`, () => {
    const returnedSort = returnSort('lesser', 'DESC');
    expect(returnedSort).toStrictEqual(1);
  });

  it(`Should work for comparison=equal,order=DESC`, () => {
    const returnedSort = returnSort('equal', 'DESC');
    expect(returnedSort).toStrictEqual(0);
  });
});

describe('getNumberComparison', () => {
  it(`Should work when num1>num2`, () => {
    const obtainedNumberComparison = getNumberComparison(2, 1);
    expect(obtainedNumberComparison).toStrictEqual('greater');
  });

  it(`Should work when num1<num2`, () => {
    const obtainedNumberComparison = getNumberComparison(1, 2);
    expect(obtainedNumberComparison).toStrictEqual('lesser');
  });

  it(`Should work when num1==num2`, () => {
    const obtainedNumberComparison = getNumberComparison(2, 2);
    expect(obtainedNumberComparison).toStrictEqual('equal');
  });
});

describe('getBooleanComparison', () => {
  it(`Should work when true,false`, () => {
    const obtainedBooleanComparison = getBooleanComparison(true, false);
    expect(obtainedBooleanComparison).toStrictEqual('greater');
  });

  it(`Should work when false,true`, () => {
    const obtainedBooleanComparison = getBooleanComparison(false, true);
    expect(obtainedBooleanComparison).toStrictEqual('lesser');
  });

  it(`Should work when false,false`, () => {
    const obtainedBooleanComparison = getBooleanComparison(false, false);
    expect(obtainedBooleanComparison).toStrictEqual('equal');
  });
});

describe('getStringComparison', () => {
  it(`Should work when true,false`, () => {
    const obtainedStringComparison = getStringComparison('2', '1');
    expect(obtainedStringComparison).toStrictEqual('greater');
  });

  it(`Should work when false,true`, () => {
    const obtainedStringComparison = getStringComparison('1', '2');
    expect(obtainedStringComparison).toStrictEqual('lesser');
  });

  it(`Should work when false,false`, () => {
    const obtainedStringComparison = getStringComparison('1', '1');
    expect(obtainedStringComparison).toStrictEqual('equal');
  });
});

describe('applyReportSorts', () => {
  it(`Should should work for score`, () => {
    const sortedReportResults = applyReportSorts(
      [result_1, result_2],
      [['Score', 'ASC']]
    );
    expect(sortedReportResults).toStrictEqual([result_2, result_1]);
  });

  it(`Should should work for Time Taken`, () => {
    const sortedReportResults = applyReportSorts(
      [result_1, result_2],
      [['Time Taken', 'ASC']]
    );
    expect(sortedReportResults).toStrictEqual([result_2, result_1]);
  });

  it(`Should should work for Hints Used`, () => {
    const sortedReportResults = applyReportSorts(
      [result_1, result_2],
      [['Hints Used', 'ASC']]
    );
    expect(sortedReportResults).toStrictEqual([result_2, result_1]);
  });

  it(`Should should work for Weight`, () => {
    const sortedReportResults = applyReportSorts(
      [result_1, result_2],
      [['Weight', 'ASC']]
    );
    expect(sortedReportResults).toStrictEqual([result_2, result_1]);
  });

  it(`Should should work for Time Allocated`, () => {
    const sortedReportResults = applyReportSorts(
      [result_1, result_2],
      [['Time Allocated', 'ASC']]
    );
    expect(sortedReportResults).toStrictEqual([result_2, result_1]);
  });

  it(`Should should work for Verdict`, () => {
    const sortedReportResults = applyReportSorts(
      [result_1, result_2],
      [['Verdict', 'ASC']]
    );
    expect(sortedReportResults).toStrictEqual([result_2, result_1]);
  });

  it(`Should should work for Type`, () => {
    const sortedReportResults = applyReportSorts(
      [result_1, result_2],
      [['Type', 'ASC']]
    );
    expect(sortedReportResults).toStrictEqual([result_2, result_1]);
  });

  it(`Should should work for Difficulty`, () => {
    const sortedReportResults = applyReportSorts(
      [result_1, result_2],
      [['Difficulty', 'ASC']]
    );
    expect(sortedReportResults).toStrictEqual([result_2, result_1]);
  });

  it(`Should should work for score.amount and question.weight`, () => {
    const sortedReportResults = applyReportSorts(
      [result_2, result_3],
      [
        ['Score', 'ASC'],
        ['Weight', 'ASC']
      ]
    );
    expect(sortedReportResults).toStrictEqual([result_2, result_3]);
  });
});
