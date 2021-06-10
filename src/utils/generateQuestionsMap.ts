import { IPlaySettings, IQuizFull, TQuestionFull } from '../types';
import { applyNumberOperator } from './applyNumberOperator';

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
