import { IPlaySettings, IQuizFull, TQuestionFull } from '../types';

export function generateQuestionsMap(
  filteredQuizzes: IQuizFull[],
  playSettingsFilters: IPlaySettings['filters']
) {
  const allQuestions: TQuestionFull[] = [];
  const allQuestionsMap: Map<string, TQuestionFull> = new Map();

  filteredQuizzes.forEach((filteredQuiz) => {
    filteredQuiz.questions = filteredQuiz.questions.filter(
      (question) =>
        !playSettingsFilters.excluded_difficulty.includes(
          question.difficulty
        ) &&
        !playSettingsFilters.excluded_types.includes(question.type) &&
        playSettingsFilters.time_allocated[0] <= question.time_allocated &&
        playSettingsFilters.time_allocated[1] >= question.time_allocated
    );
    allQuestions.push(...filteredQuiz.questions);
    filteredQuiz.questions.forEach((question) =>
      allQuestionsMap.set(question._id, question)
    );
  });
  return [allQuestions, allQuestionsMap] as const;
}
