import { generateCompleteQuestion } from '../../src/utils';

describe('MCQ type questions', () => {
  it(`Should generate default configs`, () => {
    const [completeQuestion, logs] = generateCompleteQuestion({
      answers: ['1'],
      type: 'MCQ',
      options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
      question: 'Question'
    });
    expect(completeQuestion).toStrictEqual({
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
      _id: expect.any(String)
    });
    expect(logs).toStrictEqual({ warns: [], errors: [] });
  });

  describe('Populate error and warns', () => {
    it(`Should catch error when options not provided`, () => {
      const [, logs] = generateCompleteQuestion({
        answers: ['1'],
        type: 'MCQ',
        question: 'Question'
      } as any);
      expect(logs).toStrictEqual({
        warns: [],
        errors: [`Options must be provided for MCQ questions`]
      });
    });

    it(`Should catch error when options provided is more than 6`, () => {
      const [, logs] = generateCompleteQuestion({
        answers: ['1'],
        type: 'MCQ',
        question: 'Question',
        options: [
          'Option 1',
          'Option 2',
          'Option 3',
          'Option 4',
          'Option 5',
          'Option 6',
          'Option 7'
        ]
      });
      expect(logs).toStrictEqual({
        warns: [],
        errors: [`Question must have 2-6 options, but given 7`]
      });
    });

    it(`Should catch error when answer is not present in options`, () => {
      const [, logs] = generateCompleteQuestion({
        answers: ['6'],
        type: 'MCQ',
        question: 'Question',
        options: [
          'Option 1',
          'Option 2',
          'Option 3',
          'Option 4',
          'Option 5',
          'Option 6'
        ]
      });
      expect(logs).toStrictEqual({
        warns: [],
        errors: [`MCQ Answer must be within 0-5, provided 6`]
      });
    });
  });
});

describe('MS type questions', () => {
  it(`Should generate default configs`, () => {
    const [completeQuestion, logs] = generateCompleteQuestion({
      answers: ['1', '2'],
      type: 'MS',
      options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
      question: 'Question'
    });
    expect(completeQuestion).toStrictEqual({
      answers: ['1', '2'],
      type: 'MS',
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
      time_allocated: 30,
      _id: expect.any(String)
    });
    expect(logs).toStrictEqual({ warns: [], errors: [] });
  });

  describe('Populate error and warns', () => {
    it(`Should catch error when options not provided`, () => {
      const [, logs] = generateCompleteQuestion({
        answers: ['1', '2'],
        type: 'MS',
        question: 'Question'
      } as any);
      expect(logs).toStrictEqual({
        warns: [],
        errors: [`Options must be provided for MS questions`]
      });
    });

    it(`Should catch error when options provided is more than 6`, () => {
      const [, logs] = generateCompleteQuestion({
        answers: ['1', '2'],
        type: 'MS',
        question: 'Question',
        options: [
          'Option 1',
          'Option 2',
          'Option 3',
          'Option 4',
          'Option 5',
          'Option 6',
          'Option 7'
        ]
      });
      expect(logs).toStrictEqual({
        warns: [],
        errors: [`Question must have 2-6 options, but given 7`]
      });
    });

    it(`Should catch error when answers are more than options`, () => {
      const [, logs] = generateCompleteQuestion({
        answers: ['0', '1', '2', '3'],
        type: 'MS',
        question: 'Question',
        options: ['Option 1', 'Option 2', 'Option 3']
      });
      expect(logs).toStrictEqual({
        warns: [],
        errors: [
          `Provided more answers than options, given 3 options, but provided 4 answers`,
          'MS Answer must be within 0-2, provided 3'
        ]
      });
    });
  });
});

describe('Snippet type questions', () => {
  it(`Should generate default configs`, () => {
    const [completeQuestion, logs] = generateCompleteQuestion({
      answers: [
        [
          {
            text: '1'
          }
        ]
      ],
      type: 'Snippet',
      question: 'Question'
    });
    expect(completeQuestion).toStrictEqual({
      answers: [
        [
          {
            text: '1'
          }
        ]
      ],
      type: 'Snippet',
      question: 'Question',
      image: null,
      weight: 1,
      difficulty: 'Beginner',
      explanation: 'No explanation available',
      hints: [],
      time_allocated: 45,
      _id: expect.any(String)
    });
    expect(logs).toStrictEqual({ warns: [], errors: [] });
  });
});

describe('FIB type questions', () => {
  it(`Should generate default configs`, () => {
    const [completeQuestion, logs] = generateCompleteQuestion({
      answers: [
        [
          {
            text: '1'
          }
        ]
      ],
      type: 'FIB',
      question: ['Question', 'Question 2']
    });
    expect(completeQuestion).toStrictEqual({
      answers: [
        [
          {
            text: '1'
          }
        ]
      ],
      type: 'FIB',
      question: ['Question', 'Question 2'],
      image: null,
      weight: 1,
      difficulty: 'Beginner',
      explanation: 'No explanation available',
      hints: [],
      time_allocated: 60,
      _id: expect.any(String)
    });
    expect(logs).toStrictEqual({ warns: [], errors: [] });
  });

  describe('Populate error and warns', () => {
    it(`Should catch error when blanks provided doesn't match blanks required`, () => {
      const [, logs] = generateCompleteQuestion({
        answers: [
          [
            {
              text: '1'
            }
          ],
          [
            {
              text: '2'
            }
          ]
        ],
        type: 'FIB',
        question: ['Question', 'Question 2']
      });
      expect(logs).toStrictEqual({
        warns: [],
        errors: [`Unmatched blanks in question, given 2, required 1`]
      });
    });
  });
});

it(`Should populate errors if question and answers field are not given`, () => {
  const [, logs] = generateCompleteQuestion({} as any);
  expect(logs).toStrictEqual({
    errors: [`Question question is required`, `Question answers is required`],
    warns: []
  });
});

it(`Should populate warns if wrong difficulty, weight and time_allocated are given`, () => {
  const [completeQuestion, logs] = generateCompleteQuestion({
    weight: 1.5,
    difficulty: 'Medium' as any,
    time_allocated: 450,
    answers: ['1'],
    type: 'MCQ',
    question: 'Question',
    options: ['Option 1', 'Option 2', 'Option 3']
  });

  expect(completeQuestion).toStrictEqual({
    answers: ['1'],
    type: 'MCQ',
    options: [
      { text: 'Option 1', index: '0' },
      { text: 'Option 2', index: '1' },
      { text: 'Option 3', index: '2' }
    ],
    question: 'Question',
    image: null,
    weight: 0,
    difficulty: 'Beginner',
    explanation: 'No explanation available',
    hints: [],
    time_allocated: 60,
    _id: expect.any(String)
  });
  expect(logs).toStrictEqual({
    warns: [
      'Question time allocated must be within 10-120 but given 450, changing to 60',
      'Question weights must be within 0-1 but given 1.5, changing to 0',
      'Question difficulty must be one of Beginner, Intermediate or Advanced, but given Medium, changing to Beginner'
    ],
    errors: []
  });
});

it(`Should auto detect MCQ type`, () => {
  const [completeQuestion] = generateCompleteQuestion({
    answers: ['1'],
    question: 'Question',
    options: ['Option 1', 'Option 2', 'Option 3']
  });
  expect(completeQuestion.type).toStrictEqual('MCQ');
});

it(`Should auto detect Snippet type`, () => {
  const [completeQuestion] = generateCompleteQuestion({
    answers: [
      [
        {
          text: '1'
        }
      ]
    ],
    question: 'Question'
  });
  expect(completeQuestion.type).toStrictEqual('Snippet');
});

it(`Should auto detect MS type`, () => {
  const [completeQuestion] = generateCompleteQuestion({
    answers: ['1', '2'],
    question: 'Question',
    options: ['Option 1', 'Option 2', 'Option 3']
  });
  expect(completeQuestion.type).toStrictEqual('MS');
});

it(`Should auto detect FIB type`, () => {
  const [completeQuestion] = generateCompleteQuestion({
    answers: [
      [
        {
          text: '1'
        }
      ],
      [
        {
          text: '1'
        }
      ]
    ],
    question: ['Question']
  });
  expect(completeQuestion.type).toStrictEqual('FIB');
});
