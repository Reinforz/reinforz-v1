import { QUIZ_1 } from '../../src/data/quizzes';
import { RESULT_1, RESULT_2 } from '../../src/data/results';
import { generateQuizzesFromResults } from '../../src/utils';

const question1 = QUIZ_1.questions[0],
  question2 = QUIZ_1.questions[1];

it(`Should work`, () => {
  const filteredQuizzes = generateQuizzesFromResults(
    [RESULT_1, RESULT_2],
    new Map([
      ['quiz1.question1', question1],
      ['quiz1.question2', question2]
    ])
  );

  console.log(JSON.stringify(filteredQuizzes, null, 2));
  expect(filteredQuizzes).toStrictEqual({
    quiz1: {
      subject: 'Subject 1',
      topic: 'Topic 1',
      _id: 'quiz1',
      questions: [question1, question2]
    }
  });
});
