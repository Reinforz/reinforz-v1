import { QUIZ_1 } from '../../src/data/quizzes';
import { RESULT_1, RESULT_2 } from '../../src/data/results';
import { generateQuizzesFromResults } from '../../src/utils';

const question1 = QUIZ_1.questions[0],
  question2 = QUIZ_1.questions[1];

it(`Should work`, () => {
  const filteredQuizzes = generateQuizzesFromResults(
    [RESULT_1, RESULT_2],
    new Map([
      ['1', question1],
      ['2', question2]
    ])
  );
  expect(filteredQuizzes).toStrictEqual({
    '1': {
      subject: 'Subject 1',
      topic: 'Topic 1',
      _id: '1',
      questions: [question1, question2]
    }
  });
});
