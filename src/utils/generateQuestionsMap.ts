import { IPlaySettings, IQuiz, TQuestion } from '../types';
import { applyNumberOperator } from './applyNumberOperator';

/**
 * Applies play settings filter on questions and generates map of it
 * @param quizzes Array of quizzes to generate map for
 * @param playSettingsFilters Play settings filter to filter questions
 * @returns A map where key is the question id and value is the question
 */
export function generateQuestionsMap(
  quizzes: IQuiz[],
  playSettingsFilters: IPlaySettings['filters']
) {
  const allQuestionsMap: Map<string, TQuestion> = new Map();
  const excludedDifficulties = new Set(playSettingsFilters.excluded_difficulty);
  const excludedTypes = new Set(playSettingsFilters.excluded_types);

  quizzes.forEach((quiz) => {
    // Filter the questions of the quiz
    quiz.questions = quiz.questions.filter(
      (question) => {
        const keepQuestion = // If the questions' difficulty is not present in excluded difficulties
        !excludedDifficulties.has(
          question.difficulty
        ) &&
        // If the questions' type is not present in excluded difficulties
        !excludedTypes.has(question.type) &&
        applyNumberOperator(
          playSettingsFilters.time_allocated,
          question.time_allocated
        );
        // If the question should be kept
        if (keepQuestion) {
          // Add it to map
          allQuestionsMap.set(question._id, question);
        }
        return keepQuestion;
      }
    );
  });
  return allQuestionsMap;
}
