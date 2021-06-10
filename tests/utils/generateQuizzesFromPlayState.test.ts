import { generateQuizzesFromPlayState } from '../../src/utils';

it(`Should work`, () => {
  const question_1: any = {
      _id: 'question.1',
      quiz: {
        _id: 'quiz.1'
      }
    },
    question_2: any = {
      _id: 'question.2',
      quiz: {
        _id: 'quiz.1'
      }
    };
  const generatedQuizMap = generateQuizzesFromPlayState(
    {
      questions: [question_1, question_2]
    } as any,
    new Map([
      ['question.1', question_1],
      ['question.2', question_2]
    ] as any)
  );
  expect(Array.from(generatedQuizMap.entries())).toStrictEqual([
    [
      'quiz.1',
      {
        _id: 'quiz.1',
        questions: [question_1, question_2]
      }
    ]
  ]);
});
