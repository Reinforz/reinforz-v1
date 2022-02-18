import { IPlaySettingsOptions, IQuiz, TSelectQuestion } from '../types';
import { arrayShuffler } from "./arrayShuffler";

/**
 * Applies play settings on quizzes
 * @param quizzes Quizzes to apply play settings on
 * @param playSettingsOptions Play settings to be applied
 * @returns An array of quizzes with play settings applied
 */
export function applyPlaySettingsOptions(
  quizzes: IQuiz[],
  playSettingsOptions: IPlaySettingsOptions,
) {
  // Make a deep copy of selected quizzes, as we dont want to mutate the origin quizzes
  let settingsAppliedQuizzes: IQuiz[] = JSON.parse(
    JSON.stringify(quizzes)
  );
  // If we are shuffling quizzes
  if (playSettingsOptions.shuffle_quizzes && !playSettingsOptions.flatten_mix)
    settingsAppliedQuizzes = arrayShuffler(settingsAppliedQuizzes);
  // If we are shuffling questions for each quiz
  if (playSettingsOptions.shuffle_questions && !playSettingsOptions.flatten_mix) {
    settingsAppliedQuizzes.forEach(
      (quiz) =>  {
        quiz.questions = arrayShuffler(quiz.questions);
      }
    );
  }

  // If we are shuffling options for each question
  if (playSettingsOptions.shuffle_options) {
    settingsAppliedQuizzes.forEach(
      (quiz) =>  {
        // If we are shuffling options for each question
        if (playSettingsOptions.shuffle_options) {
          // Manually casting so that options property is available in question
          (quiz.questions as TSelectQuestion[]).forEach((question) => {
            // Not all questions will have options
            if ("options" in question) {
              question.options = arrayShuffler(question.options);
            }
          })
        }
      }
    );
  }

  return settingsAppliedQuizzes;
}
