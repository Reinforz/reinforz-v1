import {
  checkInputAnswer,
  checkInputAnswers,
  modifyAnswers
} from '../../src/utils';

describe('modifyAnswers', () => {
  it(`Should modify all answers`, () => {
    const [modifiedUserAnswer, modifiedAnswerText] = modifyAnswers(
      'Hello world',
      {
        modifiers: ['IC', 'IS'],
        text: 'Hello WORLD',
        explanation: null
      }
    );
    expect(modifiedUserAnswer).toStrictEqual('helloworld');
    expect(modifiedAnswerText).toStrictEqual('helloworld');
  });
});

describe('checkInputAnswer', () => {
  describe('Answer text', () => {
    it(`Should match regular answer text`, () => {
      const [isCorrect] = checkInputAnswer('Hello World', [
        {
          modifiers: [],
          regex: null,
          explanation: null,
          text: 'helloworld'
        },
        {
          modifiers: ['IC', 'IS'],
          regex: null,
          text: 'Hello World',
          explanation: null
        }
      ]);
      expect(isCorrect).toStrictEqual(true);
    });

    it(`Should not match regular answer text`, () => {
      const [isCorrect] = checkInputAnswer('Hello World', [
        {
          modifiers: [],
          regex: null,
          text: 'helloworld',
          explanation: null
        },
        {
          modifiers: [],
          regex: null,
          text: 'hello world',
          explanation: null
        }
      ]);
      expect(isCorrect).toStrictEqual(false);
    });
  });

  describe('Answer regex', () => {
    it(`Should match regular answer regex`, () => {
      const [isCorrect] = checkInputAnswer('Hello World', [
        {
          modifiers: [],
          regex: {
            regex: 'Hello World',
            flags: ''
          },
          text: 'helloworld',
          explanation: null
        }
      ]);
      expect(isCorrect).toStrictEqual(true);
    });

    it(`Should not match regular answer regex`, () => {
      const [isCorrect] = checkInputAnswer('Hello World', [
        {
          modifiers: [],
          regex: {
            regex: 'HelloWorld',
            flags: ''
          },
          text: 'helloworld',
          explanation: null
        }
      ]);
      expect(isCorrect).toStrictEqual(false);
    });
  });
});

describe('checkInputAnswers', () => {
  it(`Should work when answers matches`, () => {
    const [
      isCorrect,
      totalCorrectAnswers,
      transformedAnswers
    ] = checkInputAnswers(
      ['Hello World', 'helloworld'],
      [
        [
          {
            modifiers: [],
            regex: null,
            text: 'Hello World',
            explanation: null
          }
        ],
        [
          {
            modifiers: ['IC', 'IS'],
            regex: null,
            text: 'Hello World',
            explanation: null
          }
        ]
      ]
    );
    expect(isCorrect).toStrictEqual(true);
    expect(totalCorrectAnswers).toStrictEqual(2);
    expect(transformedAnswers).toStrictEqual([
      [
        {
          modifiers: [],
          regex: null,
          text: 'Hello World',
          explanation: null,
          isCorrect: true
        }
      ],
      [
        {
          modifiers: ['IC', 'IS'],
          regex: null,
          text: 'Hello World',
          explanation: null,
          isCorrect: true
        }
      ]
    ]);
  });

  it(`Should work when answer doesn't match`, () => {
    const [
      isCorrect,
      totalCorrectAnswers,
      transformedAnswers
    ] = checkInputAnswers(
      ['Hello World', 'helloworld'],
      [
        [
          {
            modifiers: [],
            regex: null,
            text: 'helloworld',
            explanation: null
          }
        ]
      ]
    );
    expect(isCorrect).toStrictEqual(false);
    expect(totalCorrectAnswers).toStrictEqual(0);
    expect(transformedAnswers).toStrictEqual([
      [
        {
          modifiers: [],
          regex: null,
          text: 'helloworld',
          explanation: null,
          isCorrect: false
        }
      ]
    ]);
  });
});
