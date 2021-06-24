import { IQuizFull } from '../../src/types';
import { generateQuizzesFromResults } from '../../src/utils';
import { QUIZ_1 } from '../data/quizzes';
import { RESULT_1, RESULT_2 } from '../data/results';

const question1 = QUIZ_1.questions[0],
  question2 = QUIZ_1.questions[1];

const allQuizzes: Record<string, Omit<IQuizFull, 'questions'>> = {
  quiz1: {
    subject: 'Subject 1',
    topic: 'Topic 1',
    _id: 'quiz1',
    contexts: [],
    default: {}
  }
};

it(`Should work`, () => {
  const filteredQuizzes = generateQuizzesFromResults(
    allQuizzes,
    [RESULT_1, RESULT_2],
    new Map([
      ['quiz1.question1', question1],
      ['quiz1.question2', question2]
    ])
  );

  expect(Array.from(filteredQuizzes.entries())).toStrictEqual([
    [
      'quiz1',
      {
        subject: 'Subject 1',
        topic: 'Topic 1',
        _id: 'quiz1',
        questions: [question1, question2],
        contexts: [],
        default: {}
      }
    ]
  ]);
});
