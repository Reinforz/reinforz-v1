import { generateQuestionsMapFromReportResults } from '../../src/utils';

it(`Should generate questionsMap`, () => {
  const generatedQuestionsMap = generateQuestionsMapFromReportResults([
    {
      _id: 'result_1',
      question: {
        type: 'MCQ',
        options: [
          {
            isCorrect: false
          },
          {
            isCorrect: true
          }
        ],
        _id: 'question_1'
      }
    } as any
  ]);
  expect(Array.from(generatedQuestionsMap.entries())).toStrictEqual([
    [
      'question_1',
      {
        _id: 'question_1',
        type: 'MCQ',
        options: [{}, {}]
      }
    ]
  ]);
});
