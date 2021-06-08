import { IReportFilter, IResult } from '../../src/types';
import { applyReportFilters } from '../../src/utils';

const result: IResult = {
  verdict: true,
  hints_used: 2,
  time_taken: 20,
  score: {
    amount: 0.85,
    answers: 0.7,
    hints: 0.15,
    time: 0.15
  },
  user_answers: [],
  _id: 'result_1',
  question: {
    type: 'FIB',
    difficulty: 'Advanced',
    quiz: {
      subject: 'Subject 1',
      topic: 'Topic 1',
      _id: '1'
    },
    _id: '1',
    answers: [],
    hints: [],
    image: null,
    question: ['Question 1'],
    time_allocated: 30,
    weight: 1,
    options: null
  }
};

const default_filters: IReportFilter = {
  excluded_difficulty: [],
  excluded_quizzes: [],
  excluded_types: [],
  hints_used: [0, 1],
  time_taken: [0, 60],
  verdict: true,
  score: [0, 1],
  excluded_columns: [],
  excluded_topics: [],
  excluded_subjects: []
};

it(`Should filter out if question type is within excluded_types`, () => {
  const filteredResults = applyReportFilters([result], {
    ...default_filters,
    excluded_types: ['FIB']
  });

  expect(filteredResults).toStrictEqual([]);
});

it(`Should filter out if quiz subject is within excluded_subjects`, () => {
  const filteredResults = applyReportFilters([result], {
    ...default_filters,
    excluded_subjects: ['Subject 1']
  });

  expect(filteredResults).toStrictEqual([]);
});

it(`Should filter out if quiz topic is within excluded_topics`, () => {
  const filteredResults = applyReportFilters([result], {
    ...default_filters,
    excluded_topics: ['Topic 1']
  });

  expect(filteredResults).toStrictEqual([]);
});

it(`Should filter out if question difficulty is within excluded_difficulty`, () => {
  const filteredResults = applyReportFilters([result], {
    ...default_filters,
    excluded_difficulty: ['Advanced']
  });

  expect(filteredResults).toStrictEqual([]);
});

it(`Should filter out if question verdict is different from filter verdict`, () => {
  const filteredResults = applyReportFilters([result], {
    ...default_filters,
    verdict: false
  });

  expect(filteredResults).toStrictEqual([]);
});

it(`Should filter out if question time taken is less than lower bound of time_taken`, () => {
  const filteredResults = applyReportFilters([result], {
    ...default_filters,
    time_taken: [30, 60]
  });

  expect(filteredResults).toStrictEqual([]);
});

it(`Should filter out if question time taken is greater than upper bound of time_taken`, () => {
  const filteredResults = applyReportFilters([result], {
    ...default_filters,
    time_taken: [10, 15]
  });

  expect(filteredResults).toStrictEqual([]);
});

it(`Should filter out if question time taken is less than lower bound of score`, () => {
  const filteredResults = applyReportFilters([result], {
    ...default_filters,
    score: [1, 1]
  });

  expect(filteredResults).toStrictEqual([]);
});

it(`Should filter out if question time taken is greater than upper bound of score`, () => {
  const filteredResults = applyReportFilters([result], {
    ...default_filters,
    score: [0, 0.5]
  });

  expect(filteredResults).toStrictEqual([]);
});

it(`Should filter out if question hints used is less than lower bound of hints_used`, () => {
  const filteredResults = applyReportFilters([result], {
    ...default_filters,
    hints_used: [0, 1]
  });

  expect(filteredResults).toStrictEqual([]);
});

it(`Should filter out if question hints used is greater than upper bound of hints_used`, () => {
  const filteredResults = applyReportFilters([result], {
    ...default_filters,
    hints_used: [3, 10]
  });

  expect(filteredResults).toStrictEqual([]);
});

it(`Should filter out if quiz id is within excluded_quizzes`, () => {
  const filteredResults = applyReportFilters([result], {
    ...default_filters,
    excluded_quizzes: ['1']
  });

  expect(filteredResults).toStrictEqual([]);
});

it(`Should return result if no filter catches it`, () => {
  const filteredResults = applyReportFilters([result], default_filters);

  expect(filteredResults).toStrictEqual([result]);
});
