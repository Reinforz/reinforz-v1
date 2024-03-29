import { IQuiz } from '../../src/types';
import { generateQuestionsMap } from '../../src/utils';

const createQuiz = () => {
  return {
    questions: [
      {
        _id: '1',
        answers: [],
        hints: [],
        image: null,
        question: ['Question 1'],
        time_allocated: 30,
        weight: 1,
        type: 'FIB',
        difficulty: 'Advanced',
        quiz: '1',
        contexts: []
      }
    ],
    _id: '1',
    subject: 'Subject 1',
    topic: 'Title 1',
    contexts: [],
    default: {}
  } as IQuiz;
};

it(`Should filter question if difficulty is included in excluded_difficulty`, () => {
  const allQuestionsMap = generateQuestionsMap([createQuiz()], {
    excluded_difficulty: ['Advanced'],
    excluded_types: [],
    time_allocated: ['<>', [0, 25]]
  });

  expect(allQuestionsMap.size).toStrictEqual(0);
});

it(`Should filter question if types is included in excluded_types`, () => {
  const allQuestionsMap = generateQuestionsMap([createQuiz()], {
    excluded_difficulty: [],
    excluded_types: ['FIB'],
    time_allocated: ['<>', [0, 25]]
  });

  expect(allQuestionsMap.size).toStrictEqual(0);
});

it(`Should filter question if time_allocated is greater than lower bound of time_allocated filter`, () => {
  const allQuestionsMap = generateQuestionsMap([createQuiz()], {
    excluded_difficulty: [],
    excluded_types: [],
    time_allocated: ['<>', [40, 50]]
  });

  expect(allQuestionsMap.size).toStrictEqual(0);
});

it(`Should filter question if time_allocated is less than upper bound of time_allocated filter`, () => {
  const allQuestionsMap = generateQuestionsMap([createQuiz()], {
    excluded_difficulty: [],
    excluded_types: [],
    time_allocated: ['<>', [20, 25]]
  });

  expect(allQuestionsMap.size).toStrictEqual(0);
});

it(`Should not filter any questions`, () => {
  const quiz = createQuiz();
  const allQuestionsMap = generateQuestionsMap([quiz], {
    excluded_difficulty: [],
    excluded_types: [],
    time_allocated: ['<>', [0, 50]]
  });

  expect(Array.from(allQuestionsMap.entries())).toStrictEqual([
    ['1', quiz.questions[0]]
  ]);
});
