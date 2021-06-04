import { generateInputQuestionAnswers } from '../../src/utils';

it(`Should work for string`, () => {
  const [generatedInputQuestionAnswers] = generateInputQuestionAnswers([
    'answer 1'
  ]);
  expect(generatedInputQuestionAnswers).toStrictEqual([
    [
      {
        text: 'answer 1',
        modifiers: [],
        regex: null,
        explanation: null
      }
    ]
  ]);
});

it(`Should work for an array of strings alternatives`, () => {
  const [generatedInputQuestionAnswers] = generateInputQuestionAnswers([
    ['answer 1', 'answer 1.1']
  ]);
  expect(generatedInputQuestionAnswers).toStrictEqual([
    [
      {
        text: 'answer 1',
        modifiers: [],
        regex: null,
        explanation: null
      },
      {
        text: 'answer 1.1',
        modifiers: [],
        regex: null,
        explanation: null
      }
    ]
  ]);
});

it(`Should work for object with all options given`, () => {
  const [generatedInputQuestionAnswers] = generateInputQuestionAnswers([
    {
      text: '123',
      modifiers: ['IC'],
      regex: {
        flags: 'g',
        regex: '123'
      },
      explanation: null
    }
  ]);
  expect(generatedInputQuestionAnswers).toStrictEqual([
    [
      {
        text: '123',
        modifiers: ['IC'],
        regex: {
          flags: 'g',
          regex: '123'
        },
        explanation: null
      }
    ]
  ]);
});

it(`Should work for object with all options given and incorrect modifiers`, () => {
  const [
    generatedInputQuestionAnswers,
    generatedLogs
  ] = generateInputQuestionAnswers([
    {
      text: '123',
      modifiers: ['IC', 'IP' as any],
      regex: {
        flags: 'g',
        regex: '123'
      },
      explanation: null
    }
  ]);
  expect(generatedInputQuestionAnswers).toStrictEqual([
    [
      {
        text: '123',
        modifiers: ['IC'],
        regex: {
          flags: 'g',
          regex: '123'
        },
        explanation: null
      }
    ]
  ]);
  expect(generatedLogs).toStrictEqual({
    warns: [`Unknown modifier IP found at 2. Removing it.`],
    errors: []
  });
});

it(`Should work for object with no options given`, () => {
  const [generatedInputQuestionAnswers] = generateInputQuestionAnswers([
    {
      text: '123'
    }
  ]);
  expect(generatedInputQuestionAnswers).toStrictEqual([
    [
      {
        text: '123',
        modifiers: [],
        regex: null,
        explanation: null
      }
    ]
  ]);
});

it(`Should work for array with all options given`, () => {
  const [generatedInputQuestionAnswers] = generateInputQuestionAnswers([
    [
      {
        text: '123',
        modifiers: ['IC'],
        regex: {
          flags: 'g',
          regex: '123'
        },
        explanation: null
      }
    ]
  ]);
  expect(generatedInputQuestionAnswers).toStrictEqual([
    [
      {
        text: '123',
        modifiers: ['IC'],
        regex: {
          flags: 'g',
          regex: '123'
        },
        explanation: null
      }
    ]
  ]);
});

it(`Should work for array with no options given`, () => {
  const [generatedInputQuestionAnswers] = generateInputQuestionAnswers([
    [
      {
        text: '123'
      }
    ]
  ]);
  expect(generatedInputQuestionAnswers).toStrictEqual([
    [
      {
        text: '123',
        modifiers: [],
        regex: null,
        explanation: null
      }
    ]
  ]);
});
