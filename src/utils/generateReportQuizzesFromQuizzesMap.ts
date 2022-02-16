import { IQuiz } from '../types';

export function generateReportQuizzesFromQuizzesMap(
  filteredQuizzesMap: Map<string, IQuiz>
) {
  const quizzes: Record<string, Omit<IQuiz, 'questions'>> = {};
  for (const [key, value] of filteredQuizzesMap) {
    const duplicateQuiz = JSON.parse(JSON.stringify(value));
    delete duplicateQuiz.questions;
    quizzes[key] = duplicateQuiz;
  }

  return quizzes;
}
