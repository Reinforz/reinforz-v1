import { IQuizFull } from '../types';

export function generateReportQuizzesFromQuizzesMap(
  filteredQuizzesMap: Map<string, IQuizFull>
) {
  const quizzes: Record<string, Omit<IQuizFull, 'questions'>> = {};
  for (const [key, value] of filteredQuizzesMap) {
    const duplicateQuiz = JSON.parse(JSON.stringify(value));
    delete duplicateQuiz.questions;
    quizzes[key] = duplicateQuiz;
  }

  return quizzes;
}
