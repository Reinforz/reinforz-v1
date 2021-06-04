import { getPlaySettings } from '../../src/utils';
import { mockLocalStorage } from '../mockLocalStorage';

const { getItemMock } = mockLocalStorage();

it(`Should work if play settings exists in ls`, () => {
  getItemMock.mockReturnValueOnce(
    JSON.stringify({
      options: {
        shuffle_options: false,
        shuffle_quizzes: true,
        shuffle_questions: false
      },
      filters: undefined
    })
  );
  const playSettings = getPlaySettings();
  expect(playSettings).toStrictEqual({
    options: {
      shuffle_options: false,
      shuffle_quizzes: true,
      shuffle_questions: false,
      instant_feedback: true,
      flatten_mix: false,
      partial_score: true,
      disable_timer: false
    },
    filters: {
      time_allocated: [5, 120],
      excluded_difficulty: [],
      excluded_types: []
    }
  });
});

it(`Should work if play settings doesn't exist in ls`, () => {
  getItemMock.mockReturnValueOnce(null);
  const playSettings = getPlaySettings();
  expect(playSettings).toStrictEqual({
    options: {
      shuffle_options: true,
      shuffle_quizzes: false,
      shuffle_questions: true,
      instant_feedback: true,
      flatten_mix: false,
      partial_score: true,
      disable_timer: false
    },
    filters: {
      time_allocated: [5, 120],
      excluded_difficulty: [],
      excluded_types: []
    }
  });
});
