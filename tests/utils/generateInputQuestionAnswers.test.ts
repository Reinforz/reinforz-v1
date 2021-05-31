import { generateInputQuestionAnswers } from '../../src/utils';

it(`Should work for string`, () => {
  expect(generateInputQuestionAnswers(['answer 1'])).toStrictEqual([
    [
      {
        text: 'answer 1',
        modifiers: [],
        regex: null
      }
    ]
  ]);
});

it(`Should work for object with all options given`, () => {
  expect(
    generateInputQuestionAnswers([
      {
        text: '123',
        modifiers: ['IC'],
        regex: {
          flags: 'g',
          regex: '123'
        }
      }
    ])
  ).toStrictEqual([
    [
      {
        text: '123',
        modifiers: ['IC'],
        regex: {
          flags: 'g',
          regex: '123'
        }
      }
    ]
  ]);
});

it(`Should work for object with no options given`, () => {
  expect(
    generateInputQuestionAnswers([
      {
        text: '123'
      }
    ])
  ).toStrictEqual([
    [
      {
        text: '123',
        modifiers: [],
        regex: null
      }
    ]
  ]);
});

it(`Should work for array with all options given`, () => {
  expect(
    generateInputQuestionAnswers([
      [
        {
          text: '123',
          modifiers: ['IC'],
          regex: {
            flags: 'g',
            regex: '123'
          }
        }
      ]
    ])
  ).toStrictEqual([
    [
      {
        text: '123',
        modifiers: ['IC'],
        regex: {
          flags: 'g',
          regex: '123'
        }
      }
    ]
  ]);
});

it(`Should work for array with no options given`, () => {
  expect(
    generateInputQuestionAnswers([
      [
        {
          text: '123'
        }
      ]
    ])
  ).toStrictEqual([
    [
      {
        text: '123',
        modifiers: [],
        regex: null
      }
    ]
  ]);
});
