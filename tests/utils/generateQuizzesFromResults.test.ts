import { TQuestionFull, TQuestionResult } from '../../src/types';
import { generateQuizzesFromResults } from '../../src/utils';

const question_1: TQuestionFull = {
    type: 'FIB',
    difficulty: 'Advanced',
    quiz: {
      subject: 'Subject 1',
      topic: 'Topic 1',
      _id: '1'
    },
    _id: '1',
    answers: [],
    explanation: null,
    hints: [],
    image: null,
    question: ['Question 1'],
    time_allocated: 30,
    weight: 1,
    options: null
  },
  question_2: TQuestionFull = {
    ...question_1,
    _id: '2',
    question: ['Question 2']
  };

const result_1: TQuestionResult = {
    question: question_1,
    verdict: true,
    hints_used: 0,
    time_taken: 20,
    score: 1,
    user_answers: []
  },
  result_2: TQuestionResult = {
    question: question_2,
    verdict: true,
    hints_used: 0,
    time_taken: 20,
    score: 1,
    user_answers: []
  };

it(`Should work`, () => {
  const filteredQuizzes = generateQuizzesFromResults(
    [result_1, result_2],
    new Map([
      ['1', question_1],
      ['2', question_2]
    ])
  );
  expect(filteredQuizzes).toStrictEqual({
    '1': {
      subject: 'Subject 1',
      topic: 'Topic 1',
      _id: '1',
      questions: [question_1, question_2]
    }
  });
});
