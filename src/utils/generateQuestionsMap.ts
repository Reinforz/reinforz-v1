import { IPlaySettings, IQuiz, TQuestion } from '../types';
import { applyNumberOperator } from './applyNumberOperator';

export function generateQuestionsMap(
  filteredQuizzes: IQuiz[],
  playSettingsFilters: IPlaySettings['filters']
) {
  const allQuestions: TQuestion[] = [];
  const allQuestionsMap: Map<string, TQuestion> = new Map();

  filteredQuizzes.forEach((filteredQuiz) => {
    filteredQuiz.questions = filteredQuiz.questions.filter(
      (question) =>
        !playSettingsFilters.excluded_difficulty.includes(
          question.difficulty
        ) &&
        !playSettingsFilters.excluded_types.includes(question.type) &&
        applyNumberOperator(
          playSettingsFilters.time_allocated,
          question.time_allocated
        )
    );
    allQuestions.push(...filteredQuiz.questions);
    filteredQuiz.questions.forEach((question) =>
      allQuestionsMap.set(question._id, question)
    );
  });
  return [allQuestions, allQuestionsMap] as const;
}
