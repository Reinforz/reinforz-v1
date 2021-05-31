import { IPlaySettingsOptionsState, IQuizFull } from '../types';
import { arrayShuffler } from './arrayShuffler';

export function applyPlaySettingsOptions(
  uploadedQuizzes: IQuizFull[],
  selectedQuizIds: string[],
  playSettingsOptions: IPlaySettingsOptionsState
) {
  const selectedQuizzes = uploadedQuizzes.filter((uploadedQuiz) =>
    selectedQuizIds.includes(uploadedQuiz._id)
  );
  let filteredQuizzes = JSON.parse(
    JSON.stringify(
      uploadedQuizzes.filter((quiz) => selectedQuizIds.includes(quiz._id))
    )
  ) as IQuizFull[];
  if (playSettingsOptions.shuffle_quizzes && !playSettingsOptions.flatten_mix)
    filteredQuizzes = arrayShuffler(filteredQuizzes);
  if (playSettingsOptions.shuffle_questions && !playSettingsOptions.flatten_mix)
    filteredQuizzes.forEach(
      (quiz) => (quiz.questions = arrayShuffler(quiz.questions))
    );
  return [selectedQuizzes, filteredQuizzes] as const;
}
