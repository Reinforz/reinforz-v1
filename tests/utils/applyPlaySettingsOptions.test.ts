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

afterEach(() => {
  jest.resetAllMocks();
  jest.restoreAllMocks();
  jest.resetModules();
})

it(`Should work when all options are false`, async () => {
  const { applyPlaySettingsOptions } = await import("../../src/utils/applyPlaySettingsOptions");
  const dummyQuizzes = createDummyQuizzes();
  const settingsAppliedQuizzes = applyPlaySettingsOptions(
    dummyQuizzes,
    {
      flatten_mix: false,
      instant_feedback: false,
      partial_score: false,
      shuffle_options: false,
      shuffle_questions: false,
      shuffle_quizzes: false,
      disable_timer: false
    },
  );

  expect(settingsAppliedQuizzes).toStrictEqual(dummyQuizzes);
});

it(`Should shuffle quizzes`, async () => {
  const shuffleFn = jest.fn();
  jest.mock("../../src/utils/arrayShuffler", () => ({
    arrayShuffler: shuffleFn
  }))
  const { applyPlaySettingsOptions } = await import("../../src/utils/applyPlaySettingsOptions");

  const dummyQuizzes = createDummyQuizzes();
  applyPlaySettingsOptions(
    dummyQuizzes,
    {
      flatten_mix: false,
      instant_feedback: false,
      partial_score: false,
      shuffle_options: false,
      shuffle_questions: false,
      shuffle_quizzes: true,
      disable_timer: false
    },
  );

  expect(shuffleFn).toHaveBeenCalledTimes(1);
});

it(`Should shuffle questions`, async () => {
  const shuffleFn = jest.fn();
  jest.mock("../../src/utils/arrayShuffler", () => ({
    arrayShuffler: shuffleFn
  }))
  const { applyPlaySettingsOptions } = await import("../../src/utils/applyPlaySettingsOptions");

  const dummyQuizzes = createDummyQuizzes();
  applyPlaySettingsOptions(
    dummyQuizzes,
    {
      flatten_mix: false,
      instant_feedback: false,
      partial_score: false,
      shuffle_options: false,
      shuffle_questions: true,
      shuffle_quizzes: false,
      disable_timer: false
    },
  );

  expect(shuffleFn).toHaveBeenCalledTimes(2);
});

it(`Should not shuffle quizzes when flatten_mix=true`, async () => {
  const shuffleFn = jest.fn();
  jest.mock("../../src/utils/arrayShuffler", () => ({
    arrayShuffler: shuffleFn
  }))
  const { applyPlaySettingsOptions } = await import("../../src/utils/applyPlaySettingsOptions");

  const dummyQuizzes = createDummyQuizzes();
  applyPlaySettingsOptions(
    dummyQuizzes,
    {
      flatten_mix: true,
      instant_feedback: false,
      partial_score: false,
      shuffle_options: false,
      shuffle_questions: false,
      shuffle_quizzes: true,
      disable_timer: false
    },
  );

  expect(shuffleFn).toHaveBeenCalledTimes(0);
});

it(`Should shuffle questions when flatten_mix=true`, async () => {
  const shuffleFn = jest.fn();
  jest.mock("../../src/utils/arrayShuffler", () => ({
    arrayShuffler: shuffleFn
  }))
  const { applyPlaySettingsOptions } = await import("../../src/utils/applyPlaySettingsOptions");

  const dummyQuizzes = createDummyQuizzes();
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

it(`Should shuffle options`, async () => {
  const shuffleFn = jest.fn();
  jest.mock("../../src/utils/arrayShuffler", () => ({
    arrayShuffler: shuffleFn
  }))
  const { applyPlaySettingsOptions } = await import("../../src/utils/applyPlaySettingsOptions");

  const dummyQuizzes = createDummyQuizzes();
  applyPlaySettingsOptions(
    dummyQuizzes,
    {
      flatten_mix: false,
      instant_feedback: false,
      partial_score: false,
      shuffle_options: true,
      shuffle_questions: false,
      shuffle_quizzes: false,
      disable_timer: false
    },
  );

  expect(shuffleFn).toHaveBeenCalledTimes(2);
});
