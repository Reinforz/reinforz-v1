import { transformResultQuestionToRegularQuestion } from '../../src/utils';

it(`Should work for MS or MCQ type questions`, () => {
  expect(
    transformResultQuestionToRegularQuestion({
      options: [
        {
          isCorrect: false,
          userSelected: false
        }
      ],
      type: 'MCQ'
    } as any)
  ).toStrictEqual({
    options: [{}],
    type: 'MCQ'
  });
});

it(`Should work for Snippet or FIB type questions`, () => {
  expect(
    transformResultQuestionToRegularQuestion({
      answers: [
        [
          {
            isCorrect: false
          }
        ]
      ],
      type: 'FIB'
    } as any)
  ).toStrictEqual({
    answers: [[{}]],
    type: 'FIB'
  });
});
