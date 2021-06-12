import { generateSelectionQuestionAnswers } from '../../src/utils';

it(`Should work for string answer`, () => {
  expect(generateSelectionQuestionAnswers('answer 1')).toStrictEqual([
    {
      text: 'answer 1',
      explanation: null
    }
  ]);
});

it(`Should work for partial object answer`, () => {
  expect(
    generateSelectionQuestionAnswers({
      text: 'answer 1'
    })
  ).toStrictEqual([
    {
      text: 'answer 1',
      explanation: null
    }
  ]);
});

it(`Should work for string array answer`, () => {
  expect(generateSelectionQuestionAnswers(['answer 1'])).toStrictEqual([
    {
      text: 'answer 1',
      explanation: null
    }
  ]);
});

it(`Should work for partial object array answer`, () => {
  expect(
    generateSelectionQuestionAnswers([
      {
        text: 'answer 1'
      }
    ])
  ).toStrictEqual([
    {
      text: 'answer 1',
      explanation: null
    }
  ]);
});

it(`Should work for full object array answer`, () => {
  expect(
    generateSelectionQuestionAnswers([
      {
        text: 'answer 1',
        explanation: 'Some explanation'
      }
    ])
  ).toStrictEqual([
    {
      text: 'answer 1',
      explanation: 'Some explanation'
    }
  ]);
});
