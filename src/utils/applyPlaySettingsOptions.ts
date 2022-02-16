import { IPlaySettingsOptions, IQuiz } from '../types';

export function applyPlaySettingsOptions(
  uploadedQuizzes: IQuiz[],
  selectedQuizIds: string[],
  playSettingsOptions: IPlaySettingsOptions,
  shuffleFn: (items: any[]) => any[]
) {
  const selectedQuizzes = uploadedQuizzes.filter((uploadedQuiz) =>
    selectedQuizIds.includes(uploadedQuiz._id)
  );
  let filteredQuizzes: IQuiz[] = JSON.parse(
    JSON.stringify(selectedQuizzes)
  );
  if (playSettingsOptions.shuffle_quizzes && !playSettingsOptions.flatten_mix)
    filteredQuizzes = shuffleFn(filteredQuizzes);
  if (playSettingsOptions.shuffle_questions && !playSettingsOptions.flatten_mix)
    filteredQuizzes.forEach(
      (quiz) => (quiz.questions = shuffleFn(quiz.questions))
    );
  if (playSettingsOptions.shuffle_options) {
    filteredQuizzes.forEach((quiz) =>
      quiz.questions.forEach((question) => {
        if (question.options) question.options = shuffleFn(question.options);
      })
    );
  }
  return [selectedQuizzes, filteredQuizzes] as const;
}
