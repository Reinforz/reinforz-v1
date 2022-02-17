import { applyPlaySettingsOptions } from '../../src/utils';

function createDummyQuizzes() {
  return [
    {
      topic: 'Topic 1',
      questions: [
        {
          options: [
            {
              text: 'Option 1',
              index: '0'
            }
          ]
        },
        {
          options: null
        }
      ],
      _id: 'quiz_1'
    } as any,
    {
      topic: 'Topic 2',
      questions: [
        {
          options: [
            {
              text: 'Option 1',
              index: '0'
            }
          ]
        }
      ],
      _id: 'quiz_2'
    } as any
  ];
}

it(`Should work when all options are false`, () => {
  const dummyQuizzes = createDummyQuizzes();
  const [selectedQuizzes, filteredQuizzes] = applyPlaySettingsOptions(
    dummyQuizzes,
    ['quiz_1'],
    {
      flatten_mix: false,
      instant_feedback: false,
      partial_score: false,
      shuffle_options: false,
      shuffle_questions: false,
      shuffle_quizzes: false,
      disable_timer: false
    },
    () => []
  );

  expect(selectedQuizzes).toStrictEqual([dummyQuizzes[0]]);
  expect(filteredQuizzes).toStrictEqual([dummyQuizzes[0]]);
});

it(`Should shuffle quizzes`, () => {
  const dummyQuizzes = createDummyQuizzes();
  const shuffleFn = jest.fn();
  applyPlaySettingsOptions(
    dummyQuizzes,
    ['quiz_1', 'quiz_2'],
    {
      flatten_mix: false,
      instant_feedback: false,
      partial_score: false,
      shuffle_options: false,
      shuffle_questions: false,
      shuffle_quizzes: true,
      disable_timer: false
    },
    shuffleFn
  );

  expect(shuffleFn).toHaveBeenCalledTimes(1);
});

it(`Should shuffle questions`, () => {
  const dummyQuizzes = createDummyQuizzes();
  const shuffleFn = jest.fn();
  applyPlaySettingsOptions(
    dummyQuizzes,
    ['quiz_1', 'quiz_2'],
    {
      flatten_mix: false,
      instant_feedback: false,
      partial_score: false,
      shuffle_options: false,
      shuffle_questions: true,
      shuffle_quizzes: false,
      disable_timer: false
    },
    shuffleFn
  );

  expect(shuffleFn).toHaveBeenCalledTimes(2);
});

it(`Should not shuffle quizzes when flatten_mix=true`, () => {
  const dummyQuizzes = createDummyQuizzes();
  const shuffleFn = jest.fn();
  applyPlaySettingsOptions(
    dummyQuizzes,
    ['quiz_1', 'quiz_2'],
    {
      flatten_mix: true,
      instant_feedback: false,
      partial_score: false,
      shuffle_options: false,
      shuffle_questions: false,
      shuffle_quizzes: true,
      disable_timer: false
    },
    shuffleFn
  );

  expect(shuffleFn).toHaveBeenCalledTimes(0);
});

it(`Should shuffle questions when flatten_mix=true`, () => {
  const dummyQuizzes = createDummyQuizzes();
  const shuffleFn = jest.fn();
  applyPlaySettingsOptions(
    dummyQuizzes,
    {
      flatten_mix: true,
      instant_feedback: false,
      partial_score: false,
      shuffle_options: false,
      shuffle_questions: true,
      shuffle_quizzes: false,
      disable_timer: false
    },
  );

  expect(shuffleFn).toHaveBeenCalledTimes(0);
});

it(`Should shuffle options`, () => {
  const dummyQuizzes = createDummyQuizzes();
  const shuffleFn = jest.fn();
  applyPlaySettingsOptions(
    dummyQuizzes,
    ['quiz_1', 'quiz_2'],
    {
      flatten_mix: false,
      instant_feedback: false,
      partial_score: false,
      shuffle_options: true,
      shuffle_questions: false,
      shuffle_quizzes: false,
      disable_timer: false
    },
    shuffleFn
  );

  expect(shuffleFn).toHaveBeenCalledTimes(2);
});
