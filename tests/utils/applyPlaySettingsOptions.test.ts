import { applyPlaySettingsOptions } from '../../src/utils';

it(`Should work`, () => {
  const [selectedQuizzes, filteredQuizzes] = applyPlaySettingsOptions(
    [],
    ['quiz_1'],
    {
      flatten_mix: false,
      instant_feedback: false,
      partial_score: false,
      shuffle_options: tu
    }
  );
});
