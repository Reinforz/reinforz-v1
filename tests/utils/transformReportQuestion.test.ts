import { transformReportSelectionQuestion } from '../../src/utils';

describe('transformReportSelectionQuestion', () => {
  it(`Should work`, () => {
    const userAnswers = ['0', '1', '2'];
    expect(
      transformReportSelectionQuestion(
        {
          answers: [
            {
              text: '0',
              explanation: null
            },
            {
              text: '2',
              explanation: null
            }
          ],
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
              text: 'Option 4',
              index: '3'
            },
            {
              text: 'Option 1',
              index: '0'
            }
          ]
        } as any,
        userAnswers
      )
    ).toStrictEqual({
      answers: [
        {
          text: '0',
          explanation: null
        },
        {
          text: '2',
          explanation: null
        }
      ],
      options: [
        {
          text: 'Option 1',
          index: '0',
          isCorrect: true,
          userSelected: false
        },
        {
          text: 'Option 2',
          index: '1',
          isCorrect: false,
          userSelected: true
        },
        {
          text: 'Option 3',
          index: '2',
          isCorrect: true,
          userSelected: true
        },
        {
          text: 'Option 4',
          index: '3',
          isCorrect: false,
          userSelected: true
        }
      ]
    });
    expect(userAnswers).toStrictEqual(['2', '1', '3']);
  });
});
