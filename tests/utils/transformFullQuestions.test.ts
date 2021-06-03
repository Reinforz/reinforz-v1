import { transformFullQuestions } from '../../src/utils';

it(`Should work for selection type questions`, () => {
  expect(
    transformFullQuestions([
      {
        type: 'MCQ',
        options: [
          {
            text: 'Option 3',
            index: '2'
          },
          {
            text: 'Option 2',
            index: '1'
          },
          {
            text: 'Option 5',
            index: '4'
          },
          {
            text: 'Option 4',
            index: '3'
          },
          {
            text: 'Option 1',
            index: '0'
          }
        ],
        quiz: {
          topic: 'Topic 1',
          subject: 'Subject 1',
          _id: 'quiz1'
        }
      } as any
    ])
  ).toStrictEqual([
    {
      type: 'MCQ',
      options: ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5']
    }
  ]);
});

it(`Should work for input type questions`, () => {
  expect(
    transformFullQuestions([
      {
        type: 'FIB',
        quiz: {
          topic: 'Topic 1',
          subject: 'Subject 1',
          _id: 'quiz1'
        }
      } as any
    ])
  ).toStrictEqual([
    {
      type: 'FIB'
    }
  ]);
});
