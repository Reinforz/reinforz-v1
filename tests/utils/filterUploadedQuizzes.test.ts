import { filterUploadedQuizzes } from '../../src/utils';

it(`Should filter out uploaded quizzes`, () => {
  const [logMessages, filteredUploadedQuizzes] = filterUploadedQuizzes([
    {
      subject: 'Subject',
      topic: 'Title',
      questions: [
        {
          answers: ['1'],
          type: 'MCQ',
          options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
          question: 'Question'
        },
        {
          answers: ['0', '1', '2', '2'],
          type: 'MS',
          question: 'Question',
          options: ['Option 1', 'Option 2', 'Option 3'],
          time_allocated: 500
        }
      ]
    },
    {} as any
  ]);

  expect(logMessages).toStrictEqual([
    {
      _id: expect.any(String),
      quiz_id: expect.any(String),
      level: 'WARN',
      quiz: 'Subject - Title',
      target: 'Question 2',
      message:
        'Question time allocated must be within 10-120 but given 500, changing to 60'
    },
    {
      _id: expect.any(String),
      quiz_id: expect.any(String),
      level: 'ERROR',
      quiz: 'Subject - Title',
      target: 'Question 2',
      message:
        'Provided more answers than options, given 3 options, but provided 4 answers'
    },
    {
      _id: expect.any(String),
      quiz_id: expect.any(String),
      level: 'ERROR',
      quiz: `undefined - undefined`,
      target: `Quiz 2`,
      message: 'Quiz topic absent'
    },
    {
      _id: expect.any(String),
      quiz_id: expect.any(String),
      level: 'ERROR',
      quiz: `undefined - undefined`,
      target: `Quiz 2`,
      message: 'Quiz subject absent'
    },
    {
      _id: expect.any(String),
      quiz_id: expect.any(String),
      level: 'ERROR',
      quiz: `undefined - undefined`,
      target: `Quiz 2`,
      message: 'Quiz must have at least 1 question'
    }
  ]);

  expect(filteredUploadedQuizzes).toStrictEqual([
    {
      subject: 'Subject',
      topic: 'Title',
      _id: expect.any(String),
      questions: [
        {
          answers: ['1'],
          type: 'MCQ',
          options: [
            { text: 'Option 1', index: '0' },
            { text: 'Option 2', index: '1' },
            { text: 'Option 3', index: '2' },
            { text: 'Option 4', index: '3' }
          ],
          question: 'Question',
          image: null,
          weight: 1,
          difficulty: 'Beginner',
          explanation: 'No explanation available',
          hints: [],
          time_allocated: 15,
          _id: expect.any(String),
          quiz: {
            subject: 'Subject',
            topic: 'Title',
            _id: expect.any(String)
          }
        }
      ]
    }
  ]);
});
