import { IQuizFull, TQuestionFull, TQuestionResult } from '../types';

export function generateQuizzesFromResults(
  filteredResults: TQuestionResult[],
  allQuestionsMap: Map<string, TQuestionFull>
) {
  const filteredQuizzes: Record<string, IQuizFull> = {};
  filteredResults.forEach((filteredResult) => {
    const targetQuestion = allQuestionsMap.get(filteredResult.question._id)!;
    const clonedTargetQuestion = JSON.parse(
      JSON.stringify(targetQuestion)
    ) as TQuestionFull;
    if (!filteredQuizzes[targetQuestion.quiz._id])
      filteredQuizzes[targetQuestion.quiz._id] = {
        ...targetQuestion.quiz,
        questions: [clonedTargetQuestion]
      };
    else
      filteredQuizzes[targetQuestion.quiz._id].questions.push(
        clonedTargetQuestion
      );
  });

  return filteredQuizzes;
}
